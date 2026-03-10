"use client"

import React from "react"

import { useState, useEffect, useMemo } from "react"

import { Loader2, Users } from "lucide-react"

import { Great_Vibes, Playfair_Display, Inter } from "next/font/google"
import { siteConfig } from "@/content/site"



const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" })

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] })
const color = {
  containerBackground: "#F6C1CF",
  roleCategoryText: "#FFF6F8",
  roleTitleText: "#D95C8A",
  nameText: "#D95C8A",
  dividerText: "#FFF6F8",
  dividerBackground: "#D95C8A",
  dividerBackgroundText: "#FFF6F8",
}



interface EntourageMember {

  Name: string

  RoleCategory: string

  RoleTitle: string

  Email: string

}



const ROLE_CATEGORY_ORDER = [

  "The Debutante",

  "Parents",

  "Her Court",

  "Honored Pair",

  "Special Sponsors",

  "Circle of Eighteen",

  "Family",

  "Event Coordinators",

  "Dancers",

  "Young Attendants",

  "Special Roles",

]



const DEFAULT_CATEGORY_MAP: Record<string, string> = {

  "The Couple": "The Debutante",

  "Parents of the Bride": "Parents",

  "Parents of the Groom": "Parents",

  "Best Man": "Her Court",

  "Maid/Matron of Honor": "Her Court",

  "Bridesmaids": "Circle of Eighteen",

  "Groomsmen": "Circle of Eighteen",

  "Candle Sponsors": "Special Sponsors",

  "Veil Sponsors": "Special Sponsors",

  "Cord Sponsors": "Special Sponsors",

  "Flower Girls": "Young Attendants",

  "Ring/Coin Bearers": "Young Attendants",

  "Bible Bearer": "Special Roles",

  "Presider": "Special Roles",

  "Reader": "Special Roles",

  "Dancers": "Dancers",

  "Coordinators": "Event Coordinators",

}



export function Entourage() {

  const [entourage, setEntourage] = useState<EntourageMember[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)



  const fetchEntourage = async () => {

    setIsLoading(true)

    try {

      const response = await fetch("/api/entourage", { cache: "no-store" })

      if (!response.ok) {

        throw new Error("Failed to fetch entourage")

      }

      const data: EntourageMember[] = await response.json()

      setEntourage(data)

    } catch (error: any) {

      console.error("Failed to load entourage:", error)

      setError(error?.message || "Failed to load entourage")

    } finally {

      setIsLoading(false)

    }

  }



  useEffect(() => {

    fetchEntourage()



    const handleEntourageUpdate = () => {

      setTimeout(() => {

        fetchEntourage()

      }, 1000)

    }



    window.addEventListener("entourageUpdated", handleEntourageUpdate)



    return () => {

      window.removeEventListener("entourageUpdated", handleEntourageUpdate)

    }

  }, [])



  const remapCategory = (original: string) => {

    if (!original) return "Special Roles"

    return DEFAULT_CATEGORY_MAP[original] || original

  }



  const grouped = useMemo(() => {

    const grouped: Record<string, EntourageMember[]> = {}



    entourage.forEach((member) => {

      const category = remapCategory(member.RoleCategory)

      if (!grouped[category]) {

        grouped[category] = []

      }

      grouped[category].push(member)

    })



    return grouped

  }, [entourage])



  const SectionTitle = ({

    children,

    align = "center",

    className = "",

  }: {

    children: React.ReactNode

    align?: "left" | "center" | "right"

    className?: string

  }) => {

    const textAlign =

      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"

    return (

      <h3

                  className={`${playfair.className} text-xs sm:text-sm md:text-base tracking-[0.45em] uppercase text-${color.roleCategoryText} font-semibold mb-1.5 sm:mb-2 md:mb-2.5 ${textAlign} ${className}`}

      >

        {children}

      </h3>

    )

  }



  const NameItem = ({

    member,

    align = "center",

    showRole = true,

  }: {

    member: EntourageMember

    align?: "left" | "center" | "right"

    showRole?: boolean

  }) => {

    const containerAlign =

      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"

    const textAlign =

      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"

    return (

      <div className={`flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2 leading-relaxed`}

      >

        <p className={`${playfair.className} text-[13px] sm:text-sm md:text-base font-medium text-[#D95C8A] ${textAlign}`}>

          {member.Name}

        </p>

        {showRole && member.RoleTitle && (

          <p className={`${inter.className} text-[10px] sm:text-[11px] md:text-xs font-normal text-[#D95C8A]/80 mt-0.5 leading-snug ${textAlign}`}>

            {member.RoleTitle}

          </p>

        )}

      </div>

    )

  }



  const TwoColumnLayout = ({

    children,

    leftTitle,

    rightTitle,

    singleTitle,

    centerContent = false,

  }: {

    children: React.ReactNode

    leftTitle?: string

    rightTitle?: string

    singleTitle?: string

    centerContent?: boolean

  }) => {

    if (singleTitle) {

      return (

        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-7">

          <SectionTitle>{singleTitle}</SectionTitle>

          <div

            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5 ${centerContent ? "max-w-2xl mx-auto" : ""}`}

          >

            {children}

          </div>

        </div>

      )

    }



    return (

      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">

        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2 sm:mb-2.5">

          {leftTitle && (

            <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">

              {leftTitle}

            </SectionTitle>

          )}

          {rightTitle && (

            <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">

              {rightTitle}

            </SectionTitle>

          )}

        </div>

        <div

          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-4 ${centerContent ? "max-w-2xl mx-auto" : ""}`}

        >

          {children}

        </div>

      </div>

    )

  }



  const renderDivider = (categoryIndex: number) =>

    categoryIndex > 0 && (

      <div className="flex justify-center py-2 sm:py-2.5 mb-3 sm:mb-4 md:mb-5">

        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      </div>

    )



  return (

    <section

      id="entourage"

      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20 bg-transparent"

    >



      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-4">

        <h2

          className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_18px_48px_rgba(0,49,83,0.68)] mt-4`}

        >

          {`${siteConfig.couple.debutNickname}`}'s Entourage

        </h2>

        <p

          className={`${inter.className} text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed`}

        >

          The cherished circle of family, friends, and honored guests who stand beside Ena Gerangaya on this momentous eighteenth celebration—each name woven into the tapestry of her special day.

        </p>

      </div>



      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        <div className="relative bg-white/90 backdrop-blur-md border-2 border-white/30 rounded-xl sm:rounded-2xl shadow-[0_25px_80px_rgba(0,49,83,0.35)] overflow-hidden">

          <div className="absolute inset-[10px] sm:inset-[14px] md:inset-[18px] border-2 border-white/25 rounded-lg sm:rounded-xl pointer-events-none" />

          <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">

            {isLoading ? (

              <div className="flex items-center justify-center py-24">

                <div className="flex flex-col items-center gap-4">

                  <Loader2 className="h-12 w-12 animate-spin text-[#D95C8A]" />

                  <span className={`${inter.className} text-[#D95C8A]/80 text-lg`}>

                    Loading the entourage…

                  </span>

                </div>

              </div>

            ) : error ? (

              <div className="flex items-center justify-center py-24">

                <div className="text-center">

                  <p className={`${inter.className} text-red-600 text-lg mb-2`}>{error}</p>

                  <button

                    onClick={fetchEntourage}

                    className={`${playfair.className} text-[#D95C8A] hover:text-[#D95C8A]/70 transition-colors underline`}

                  >

                    Try again

                  </button>

                </div>

              </div>

            ) : entourage.length === 0 ? (

              <div className="text-center py-24">

                <Users className="h-16 w-16 text-[#D95C8A]/30 mx-auto mb-4" />

                <p className={`${inter.className} text-[#D95C8A]/70 text-lg`}>

                  The entourage list will be available soon.

                </p>

              </div>

            ) : (

              <div className="relative z-10 w-full">

                {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {

                  const members = grouped[category] || []

                  if (members.length === 0) return null



                  if (category === "The Debutante") {

                    const debutante = members[0]

                    return (

                      <div key={category}>

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout singleTitle="The Debutante" centerContent>

                          <div className="col-span-full">

                            <div className="max-w-sm mx-auto ">

                              {debutante && <NameItem member={debutante} align="center" showRole={false} />}

                            </div>

                          </div>

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  if (category === "Parents") {

                    const parents = members

                    const left = parents.filter((member) =>

                      member.RoleTitle?.toLowerCase().includes("father")

                    )

                    const right = parents.filter((member) =>

                      member.RoleTitle?.toLowerCase().includes("mother")

                    )

                    const maxLen = Math.max(left.length, right.length)

                    return (

                      <div key={category}>

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout leftTitle="Fathers" rightTitle="Mothers">

                          {Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`parents-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {left[idx] ? <NameItem member={left[idx]} align="right" showRole={false} /> : <div className="py-2" />}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {right[idx] ? <NameItem member={right[idx]} align="left" showRole={false} /> : <div className="py-2" />}

                              </div>

                            </React.Fragment>

                          ))}

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  if (category === "Her Court" || category === "Honored Pair") {

                    const leftMembers = grouped["Honored Pair"] || []

                    const rightMembers = grouped["Her Court"] || []

                    if (category !== "Honored Pair") return null

                    const maxLen = Math.max(leftMembers.length, rightMembers.length)

                    return (

                      <div key="court">

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout leftTitle="Honored Pair" rightTitle="Her Court">

                          {Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`court-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {leftMembers[idx] ? (

                                  <NameItem member={leftMembers[idx]} align="right" showRole={false} />

                                ) : (

                                  <div className="py-2" />

                                )}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {rightMembers[idx] ? (

                                  <NameItem member={rightMembers[idx]} align="left" showRole={false} />

                                ) : (

                                  <div className="py-2" />

                                )}

                              </div>

                            </React.Fragment>

                          ))}

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  if (category === "Circle of Eighteen") {

                    const debutantes = grouped["Circle of Eighteen"] || []

                    const half = Math.ceil(debutantes.length / 2)

                    const left = debutantes.slice(0, half)

                    const right = debutantes.slice(half)

                    const maxLen = Math.max(left.length, right.length)

                    return (

                      <div key="circle">

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout leftTitle="Circle A" rightTitle="Circle B">

                          {Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`circle-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {left[idx] ? <NameItem member={left[idx]} align="right" showRole={false} /> : <div className="py-2" />}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {right[idx] ? <NameItem member={right[idx]} align="left" showRole={false} /> : <div className="py-2" />}

                              </div>

                            </React.Fragment>

                          ))}

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  if (category === "Special Sponsors") {

                    const sponsors = members

                    const half = Math.ceil(sponsors.length / 2)

                    const left = sponsors.slice(0, half)

                    const right = sponsors.slice(half)

                    const maxLen = Math.max(left.length, right.length)

                    return (

                      <div key="sponsors">

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout leftTitle="Special Sponsors A" rightTitle="Special Sponsors B">

                          {Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`sponsors-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {left[idx] ? <NameItem member={left[idx]} align="right" showRole={false} /> : <div className="py-2" />}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {right[idx] ? <NameItem member={right[idx]} align="left" showRole={false} /> : <div className="py-2" />}

                              </div>

                            </React.Fragment>

                          ))}

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  if (category === "Family") {

                    const familyMembers = members

                    const half = Math.ceil(familyMembers.length / 2)

                    const left = familyMembers.slice(0, half)

                    const right = familyMembers.slice(half)

                    const maxLen = Math.max(left.length, right.length)

                    return (

                      <div key="family">

                        {renderDivider(categoryIndex)}

                        <TwoColumnLayout singleTitle="Family" centerContent>

                          {Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`family-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {left[idx] ? <NameItem member={left[idx]} align="right" showRole={category === "Family"} /> : <div className="py-2" />}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {right[idx] ? <NameItem member={right[idx]} align="left" showRole={category === "Family"} /> : <div className="py-2" />}

                              </div>

                            </React.Fragment>

                          ))}

                        </TwoColumnLayout>

                      </div>

                    )

                  }



                  const singleColumn = new Set([

                    "Honored Pair",

                    "Event Coordinators",

                    "Dancers",

                    "Young Attendants",

                    "Special Roles",

                  ])



                  return (

                    <div key={category}>

                      {renderDivider(categoryIndex)}

                      <TwoColumnLayout singleTitle={category} centerContent>

                        {(() => {

                          if (singleColumn.has(category) || members.length <= 2) {

                            return (

                              <div className="col-span-full">

                                <div className="max-w-sm mx-auto flex flex-col items-center gap-2.5">

                                  {members.map((member, idx) => (

                                    <NameItem

                                      key={`${category}-${idx}-${member.Name}`}

                                      member={member}

                                      align="center"

                                      showRole={false}

                                    />

                                  ))}

                                </div>

                              </div>

                            )

                          }



                          const half = Math.ceil(members.length / 2)

                          const left = members.slice(0, half)

                          const right = members.slice(half)

                          const maxLen = Math.max(left.length, right.length)

                          return Array.from({ length: maxLen }).map((_, idx) => (

                            <React.Fragment key={`${category}-row-${idx}`}>

                              <div className="px-3 sm:px-4 md:px-6">

                                {left[idx] ? <NameItem member={left[idx]} align="right" showRole={false} /> : <div className="py-2" />}

                              </div>

                              <div className="px-3 sm:px-4 md:px-6">

                                {right[idx] ? <NameItem member={right[idx]} align="left" showRole={false} /> : <div className="py-2" />}

                              </div>

                            </React.Fragment>

                          ))

                        })()}

                      </TwoColumnLayout>

                    </div>

                  )

                })}



                {Object.keys(grouped)

                  .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))

                  .map((category) => {

                    const members = grouped[category]

                    if (!members || members.length === 0) return null

                    return (

                      <div key={category}>

                        <div className="flex justify-center py-2 sm:py-2.5 mb-3 sm:mb-4 md:mb-5">

                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        </div>

                        <TwoColumnLayout singleTitle={category} centerContent>

                          {(() => {

                            if (members.length <= 2) {

                              return (

                                <div className="col-span-full">

                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-2.5">

                                    {members.map((member, idx) => (

                                      <NameItem

                                        key={`${category}-${idx}-${member.Name}`}

                                        member={member}

                                        align="center"

                                        showRole={category === "Family"}

                                      />

                                    ))}

                                  </div>

                                </div>

                              )

                            }

                            const half = Math.ceil(members.length / 2)

                            const left = members.slice(0, half)

                            const right = members.slice(half)

                            const maxLen = Math.max(left.length, right.length)

                            return Array.from({ length: maxLen }).map((_, idx) => (

                              <React.Fragment key={`${category}-row-${idx}`}>

                                <div className="px-3 sm:px-4 md:px-6">

                                  {left[idx] ? <NameItem member={left[idx]} align="right" showRole={category === "Family"} /> : <div className="py-2" />}

                                </div>

                                <div className="px-3 sm:px-4 md:px-6">

                                  {right[idx] ? <NameItem member={right[idx]} align="left" showRole={category === "Family"} /> : <div className="py-2" />}

                                </div>

                              </React.Fragment>

                            ))

                          })()}

                        </TwoColumnLayout>

                      </div>

                    )

                  })}

              </div>

            )}

          </div>

        </div>

      </div>

    </section>

  )

}
