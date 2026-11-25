import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./Logo";

const heading = "text-xs font-semibold tracking-[0.2em] uppercase text-gold-light";
const link = "text-[15px] text-mist transition-colors hover:text-ivory";

export function SiteFooter() {
  return (
    <footer className="bg-navy pt-26 pb-10 text-ivory">
      <div className="container-ep">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo dark />
            <p className="max-w-[320px] text-[15px] leading-[1.75] text-mist">{site.tagline}</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Explore</span>
            {navLinks.map((l) => <Link key={l.href} href={l.href} className={link}>{l.label}</Link>)}
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Contact</span>
            <a href={site.emailHref} className={link}>{site.email}</a>
            <a href={site.phoneHref} className={link}>{site.phone}</a>
            <span className="text-[15px] text-mist">{site.serviceArea}</span>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className={heading}>Follow</span>
            {site.social.map((s) => (
              <a key={s.label} href={s.href} className={link} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-wrap justify-between gap-3 border-t border-ivory/12 pt-7 text-[13px] text-[#8e96a8]">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Weddings · Corporate · Celebrations</span>
        </div>
      </div>
    </footer>
  );
}
