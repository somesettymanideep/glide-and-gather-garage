import { Link } from "@tanstack/react-router";
import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "./BrandIcons";
import { ADDRESS, EMAIL, PHONE, PHONE_LINK } from "./data";

export function Socials({ size = "h-9 w-9" }: { size?: string }) {
  const items = [
    { I: FacebookIcon, l: "Facebook" },
    { I: InstagramIcon, l: "Instagram" },
    { I: YoutubeIcon, l: "YouTube" },
    { I: WhatsappIcon, l: "WhatsApp" },
  ];
  return (
    <div className="flex gap-3">
      {items.map(({ I, l }) => (
        <a key={l} href="#" aria-label={l} className={`${size} flex items-center justify-center rounded-full bg-card shadow-card transition-transform hover:-translate-y-1`}><I className="h-[55%] w-[55%]" /></a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-grad-footer text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr_1.5fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Madhumitha Car Travels" className="h-24 w-24 rounded-full" loading="lazy" />
            <span className="font-display text-2xl font-black italic leading-none"><span className="block">Madhumitha</span><span className="block text-accent [text-shadow:0_1px_0_white]">Car Travels</span></span>
          </div>
          <p className="font-display text-sm italic">Travel with Comfort... Reach with Happiness...</p>
          <Socials />
        </div>
        <FooterList title="Quick Links" items={[["Home", "/"], ["About Us", "/"], ["Our Services", "/"], ["Our Cars", "/cars"], ["Contact Us", "/contact"]]} />
        <FooterList title="Our Services" items={[["Self-Drive Cars", "/cars"], ["Car Rental Services", "/cars"], ["Airport Pickup & Drop", "/contact"], ["Hourly Rentals", "/cars"]]} />
        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact Information</h4>
          <div className="space-y-3 text-sm">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0" /><span>{ADDRESS.map((a) => <span key={a} className="block">{a}</span>)}</span></p>
            <a href={`mailto:${EMAIL}`} className="flex gap-3 break-all"><Mail className="h-5 w-5 shrink-0" />{EMAIL}</a>
            <a href={PHONE_LINK} className="flex gap-3"><Phone className="h-5 w-5 shrink-0" />{PHONE}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-4 text-xs md:px-8">
          <span>© 2026 Madhumitha Car Travels. All Rights Reserved.</span>
          <span>Privacy Policy &nbsp;|&nbsp; Terms &amp; Conditions</span>
        </div>
      </div>
      <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-foreground bg-grad-red text-accent-foreground shadow-card transition-transform hover:-translate-y-1">
        <ArrowUp />
      </button>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: [string, "/" | "/cars" | "/contact"][] }) {
  return (
    <div>
      <h4 className="mb-4 text-lg font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {items.map(([l, to]) => (
          <li key={l}><Link to={to} className="flex items-center gap-1 transition-colors hover:text-accent"><ChevronRight className="h-4 w-4 text-accent" />{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
