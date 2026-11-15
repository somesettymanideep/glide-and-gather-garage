import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { PHONE, PHONE_LINK } from "./data";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/", label: "About Us", hash: "about" },
  { to: "/cars", label: "Our Cars" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/95 shadow-card backdrop-blur" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Madhumitha Car Travels logo" className={cn("rounded-full transition-all", scrolled ? "h-12 w-12" : "h-16 w-16 md:h-20 md:w-20")} />
          <span className="font-display text-xl font-black italic leading-none md:text-2xl">
            <span className="block text-primary">Madhumitha</span>
            <span className="block text-accent">Car Travels</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} hash={"hash" in n ? n.hash : undefined}
              activeOptions={{ exact: true, includeHash: false }}
              className="relative py-2 text-sm font-semibold text-foreground transition-colors hover:text-accent data-[status=active]:text-accent"
              activeProps={"hash" in n ? { "data-status": undefined } as never : undefined}>
              {n.label}
              {!("hash" in n) && <span className="nav-underline" />}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href={PHONE_LINK} className="flex items-center gap-2 text-sm font-bold"><PhoneCall className="h-5 w-5 text-accent" />{PHONE}</a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-grad-red px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5">
            Book Your Car <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="border-t bg-background px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} hash={"hash" in n ? n.hash : undefined} onClick={() => setOpen(false)} className="block py-3 font-semibold">{n.label}</Link>
          ))}
          <a href={PHONE_LINK} className="block py-3 font-bold text-accent">{PHONE}</a>
        </div>
      )}
    </header>
  );
}
