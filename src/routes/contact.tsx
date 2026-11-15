import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, CalendarDays, Car, ChevronDown, Clock, Mail, MapPin, MessageSquare, Phone, Send, ShieldCheck, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, Socials } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ADDRESS, CARS, EMAIL, PHONE, PHONE_LINK } from "@/components/site/data";
import hero from "@/assets/hero.png.asset.json";
import car from "@/assets/car-white.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking | Madhumitha Car Travels" },
      { name: "description", content: "Call, email or send a booking enquiry to Madhumitha Car Travels, Vijayawada." },
      { property: "og:title", content: "Let's Plan Your Next Journey | Madhumitha Car Travels" },
      { property: "og:description", content: "Send a booking enquiry and we'll get back to you soon." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="overflow-x-hidden">
      <SiteHeader />
      <Toaster />
      <PageHero>
        <span className="hero-in inline-flex items-center gap-2 rounded-full bg-grad-green px-4 py-1 text-sm font-bold text-primary-foreground">GET IN TOUCH <Send className="h-3 w-3" /></span>
        <h1 className="hero-in mt-3 font-display text-5xl font-black italic leading-[1.05] md:text-7xl" style={{ animationDelay: ".1s" }}>
          <span className="block text-primary">Let's Plan Your</span><span className="block text-accent">Next Journey</span>
        </h1>
        <span className="hero-in mt-2 block h-1 w-72 rounded-full bg-accent" style={{ animationDelay: ".2s" }} />
        <p className="hero-in mt-5 max-w-md text-lg font-semibold" style={{ animationDelay: ".3s" }}>Have a travel requirement? Get in touch with our team and let us help you find the right ride.</p>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal variant="left" className="space-y-4">
          <h2 className="flex items-center gap-3 font-display text-3xl font-black text-primary"><span className="h-0.5 w-10 bg-accent" />Contact Information</h2>
          <p className="text-lg">We are always here to help you!</p>
          <InfoCard icon={<MapPin className="h-12 w-12 text-accent" />} title="Our Address">{ADDRESS.map((a) => <span key={a} className="block">{a}</span>)}</InfoCard>
          <InfoCard icon={<Circle><Phone /></Circle>} title="Call Us"><a href={PHONE_LINK} className="text-xl font-semibold">{PHONE}</a></InfoCard>
          <InfoCard icon={<Circle><Mail /></Circle>} title="Email Us"><a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a></InfoCard>
          <div className="flex items-center gap-4"><Socials size="h-10 w-10" /><span className="text-lg font-medium">Follow Us</span></div>
          <div className="relative overflow-hidden rounded-xl border shadow-card">
            <iframe title="Map" src="https://www.google.com/maps?q=Ayodhya+Nagar+Vijayawada&output=embed" className="h-56 w-full" loading="lazy" />
            <a href="https://maps.google.com/?q=Ayodhya+Nagar+Vijayawada" target="_blank" rel="noreferrer" className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-grad-green px-4 py-2 text-xs font-semibold text-primary-foreground"><MapPin className="h-4 w-4" />View on Google Maps <ArrowRight className="h-3 w-3" /></a>
          </div>
        </Reveal>

        <Reveal variant="right" className="overflow-hidden rounded-2xl bg-card shadow-card">
          <div className="grid md:grid-cols-[1fr_1.3fr]">
            <div className="flex items-center gap-3 bg-grad-green px-6 py-4 font-display text-2xl font-bold text-primary-foreground"><CalendarDays />Booking Enquiry</div>
            <div className="flex items-center bg-grad-red px-6 py-4 text-sm font-medium text-accent-foreground md:justify-end">Fill the form and we'll get back to you soon!</div>
          </div>
          <form className="grid gap-5 p-6 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Booking request received! We'll call you shortly."); (e.target as HTMLFormElement).reset(); }}>
            <F label="Full Name" req icon={<User className="h-4 w-4" />}><input required placeholder="Enter your name" className="inp" /></F>
            <F label="Phone Number" req icon={<Phone className="h-4 w-4" />}><span className="border-r pr-2 font-medium">+91</span><input required type="tel" placeholder="Enter mobile number" className="inp" /></F>
            <F label="Email Address" icon={<Mail className="h-4 w-4" />}><input type="email" placeholder="Enter your email address" className="inp" /></F>
            <F label="Pickup Location" icon={<MapPin className="h-4 w-4" />}><input placeholder="Enter pickup location" className="inp" /></F>
            <F label="Drop Location" icon={<MapPin className="h-4 w-4" />}><input placeholder="Enter drop location" className="inp" /></F>
            <F label="Pickup Date" icon={<Calendar className="h-4 w-4" />}><input type="date" className="inp" /></F>
            <F label="Pickup Time" icon={<Clock className="h-4 w-4" />}><input type="time" className="inp" /></F>
            <F label="Rental Duration" icon={<Car className="h-4 w-4" />}><select className="inp appearance-none"><option>6 Hours</option><option>12 Hours</option><option>24 Hours</option></select><ChevronDown className="h-4 w-4" /></F>
            <div className="md:col-span-2"><F label="Select Vehicle" icon={<Car className="h-4 w-4" />}><select className="inp appearance-none"><option>Choose a vehicle</option>{CARS.map((c) => <option key={c.name}>{c.name}</option>)}</select><ChevronDown className="h-4 w-4" /></F></div>
            <label className="md:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold"><MessageSquare className="h-4 w-4" />Additional Requirements</span>
              <textarea rows={3} placeholder="Any special requests?" className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
            <div className="md:col-span-2">
              <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-grad-red py-3 text-lg font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5"><Send className="h-5 w-5" />{sent ? "Request Sent — Send Another" : "Submit Booking Request"}<ArrowRight className="h-5 w-5" /></button>
              <p className="mt-2 flex items-center justify-center gap-2 text-xs"><ShieldCheck className="h-4 w-4 text-primary" />Your information is secure with us.</p>
            </div>
          </form>
        </Reveal>
      </section>

      <section className="relative overflow-hidden">
        <img src={hero.url} alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" loading="lazy" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 md:grid-cols-[1fr_1.6fr_auto] md:px-8">
          <Reveal variant="left"><img src={car} alt="" className="mx-auto w-60 rounded-xl" loading="lazy" /></Reveal>
          <Reveal className="rounded-xl bg-background/85 p-4 text-center font-display font-black italic">
            <p className="text-3xl text-primary md:text-4xl">Travel with Confidence</p>
            <p className="text-2xl md:text-3xl"><span className="text-base text-primary">with </span><span className="text-accent">Madhumitha Car Travels</span></p>
          </Reveal>
          <Reveal variant="right"><a href={PHONE_LINK} className="flex items-center gap-3 rounded-full border-4 border-primary-foreground bg-grad-green px-6 py-3 text-primary-foreground shadow-card"><Phone className="h-9 w-9" /><span className="font-semibold leading-tight">Call Us Now<br />{PHONE}</span></a></Reveal>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Circle({ children }: { children: ReactNode }) {
  return <span className="flex h-14 w-14 items-center justify-center rounded-full bg-grad-green text-primary-foreground">{children}</span>;
}
function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return <div className="flex items-center gap-5 rounded-xl border bg-card p-4 shadow-card"><div className="flex w-16 justify-center">{icon}</div><div><p className="text-lg font-semibold text-accent">{title}</p><div>{children}</div></div></div>;
}
function F({ label, req, icon, children }: { label: string; req?: boolean; icon: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}{req && <span className="text-accent"> *</span>}</span>
      <span className="flex items-center gap-3 rounded-lg border bg-background px-4 py-2.5 text-muted-foreground focus-within:border-primary">{icon}{children}</span>
    </label>
  );
}
