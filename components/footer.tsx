import { siteConfig } from "@/content/site"

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary mb-2">
            {siteConfig.couple.debutNickname}
            </h3>
            <p className="text-sm text-muted">{siteConfig.wedding.date}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ceremony</h4>
            <p className="text-sm text-muted">{siteConfig.ceremony.location}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Reception</h4>
            <p className="text-sm text-muted">{siteConfig.reception.location}</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted">
          <p>With love and gratitude • {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
