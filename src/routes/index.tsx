import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, ChevronDown, ChevronLeft, ChevronRight, Clock, Fuel, Headphones, Handshake, IndianRupee, KeyRound, MapPin, Phone, PhoneCall, Plane, Send, ShieldCheck, Armchair, Star, User, Users, Gauge } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero.png.asset.json";
import s1 from "@/assets/svc-selfdrive.jpg";
import s2 from "@/assets/svc-keys.jpg";
import s3 from "@/assets/svc-airport.jpg";
import s4 from "@/assets/svc-clock.jpg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/site/Reveal";
import { CARS, PHONE_LINK } from "@/components/site/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madhumitha Car Travels | Car Rentals in Vijayawada" },
      { name: "description", content: "Comfortable, reliable and affordable car rentals, airport transfers and hourly packages in Vijayawada." },
      { property: "og:title", content: "Madhumitha Car Travels | Your Journey, Our Responsibility" },
      { property: "og:description", content: "Book sedans, SUVs and hatchbacks for 6, 12 or 24 hours in Vijayawada." },
    ],
  }),
  component: Home,
});

function SectionTitle({ a, b, sub }: { a: string; b: string; sub: string }) {
  return (
    <Reveal className="mb-8 text-center">
      <div className="flex items-center justify-center gap-4">
        <span className="hidden h-0.5 w-20 bg-accent sm:block" />
        <h2 className="font-display text-2xl font-black italic md:text-3xl"><span className="text-primary">{a} </span><span className="text-accent">{b}</span></h2>
        <span className="hidden h-0.5 w-20 bg-accent sm:block" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
    </Reveal>
  );
}

const SERVICES = [
  { img: s1, Icon: Gauge, t: "Self-Drive Cars", d: "Enjoy the freedom of driving at your own pace with our options." },
  { img: s2, Icon: KeyRound, t: "Car Rental Services", d: "Convenient rental vehicles for personal, family and business travel." },
  { img: s3, Icon: Plane, t: "Airport Pickup & Drop", d: "Reliable airport transfers with comfortable transportation." },
  { img: s4, Icon: Clock, t: "Hourly Car Rentals", d: "Flexible vehicle rentals with 6-hour, 12-hour and 24-hour packages." },
];

const REVIEWS = [
  { q: "Excellent service! The car was in great condition and the booking process was very easy.", n: "Priya Sharma" },
  { q: "Very punctual driver and a spotless Innova for our family trip to Tirupati.", n: "Ravi Kumar" },
  { q: "Affordable hourly packages and friendly support. Highly recommended!", n: "Lakshmi Devi" },
];

function Home() {
  const [rev, setRev] = useState(0);
  return (
    <div className="overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[640px] pt-24 md:min-h-[700px]">
        <img src={hero.url} alt="Car on a riverside road near a temple and bridge" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/50" />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-12">
          <h1 className="hero-in font-display text-5xl font-black italic leading-[1.05] md:text-7xl">
            <span className="block text-primary">Your Journey,</span>
            <span className="block text-accent">Our Responsibility.</span>
          </h1>
          <span className="hero-in mt-3 block h-1 w-60 rounded-full bg-primary" style={{ animationDelay: ".15s" }} />
          <p className="hero-in mt-5 max-w-md text-base font-semibold md:text-lg" style={{ animationDelay: ".25s" }}>
            Experience comfortable, reliable and affordable car travel with Madhumitha Car Travels. Wherever life takes you, travel with confidence.
          </p>
          <div className="hero-in mt-7 flex flex-wrap gap-4" style={{ animationDelay: ".4s" }}>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-grad-red px-6 py-3 font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5">Book Your Car <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/cars" className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background/80 px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Explore Our Cars <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4">
        <Reveal variant="zoom">
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-3 rounded-2xl bg-card p-4 shadow-card md:grid-cols-[1fr_1fr_0.8fr_1fr_auto]">
            <Field icon={<User className="h-5 w-5" />}><input placeholder="Full Name" className="w-full bg-transparent outline-none" /></Field>
            <Field icon={<Phone className="h-5 w-5" />}><span className="font-semibold">+91</span><input placeholder="Phone Number" className="w-full bg-transparent outline-none" /></Field>
            <Field icon={<Car className="h-5 w-5" />}><select className="w-full appearance-none bg-transparent font-semibold outline-none"><option>6 Hours</option><option>12 Hours</option><option>24 Hours</option></select><ChevronDown className="h-4 w-4" /></Field>
            <Field icon={<MapPin className="h-5 w-5" />}><input placeholder="Drop Location" className="w-full bg-transparent outline-none" /></Field>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-grad-red px-6 py-3 font-semibold text-accent-foreground"><Send className="h-4 w-4" /> Request a Booking</button>
          </form>
        </Reveal>
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.1fr_1.2fr_0.7fr]">
        <Reveal variant="left" className="relative">
          <img src={hero.url} alt="Our sedan on the road" className="h-72 w-full rounded-2xl object-cover shadow-card" loading="lazy" />
          <div className="absolute -bottom-6 right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-star bg-gradient-to-b from-brand-deep to-foreground text-center font-display text-primary-foreground shadow-card">
            <span className="text-4xl font-black text-star">5+</span><span className="text-lg font-bold text-star">Years</span>
            <span className="rounded bg-accent px-2 text-[10px] font-bold italic">Experience</span>
          </div>
        </Reveal>
        <Reveal>
          <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-accent">— ABOUT US <span className="h-px w-32 bg-accent" /></p>
          <h2 className="mt-2 font-display text-3xl font-black italic md:text-4xl"><span className="text-accent">Travel </span><span className="text-primary">Beyond</span> <span className="text-accent">Expectations</span></h2>
          <p className="mt-4 text-sm leading-relaxed">Madhumitha Car Travels is your trusted travel partner for safe, comfortable and affordable journeys. We are committed to delivering reliable transportation services with customer satisfaction at the heart.</p>
          <Link to="/cars" className="mt-6 inline-flex items-center gap-2 rounded-full bg-grad-red px-6 py-3 text-sm font-semibold text-accent-foreground shadow-card">Discover Our Story <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal variant="right" className="grid grid-cols-2 border-border lg:border-l lg:pl-6">
          {[[ShieldCheck, "Customer Satisfaction"], [Armchair, "Comfortable Journeys"], [Handshake, "Reliable Service"], [Headphones, "Professional Support"]].map(([I, t], i) => {
            const Icon = I as typeof ShieldCheck;
            return (
              <div key={t as string} className={`flex flex-col items-center gap-2 p-4 text-center text-sm font-semibold ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "border-r" : ""}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-primary"><Icon className="h-6 w-6" /></span>{t as string}
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <SectionTitle a="Travel Solutions" b="Designed Around You" sub="Flexible car travel services for every destination and occasion." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <article className="group h-full overflow-hidden rounded-xl bg-card shadow-card transition-transform hover:-translate-y-2">
                <div className="relative h-40 overflow-hidden"><img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                <div className="relative px-4 pb-5 pt-9 text-center">
                  <span className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-card bg-grad-green text-primary-foreground"><s.Icon className="h-6 w-6" /></span>
                  <h3 className="font-semibold text-primary">{s.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
                  <Link to="/cars" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent">Explore Service <ArrowRight className="h-3 w-3" /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <SectionTitle a="Find the Perfect" b="Car for Your Journey" sub="Choose from our range of comfortable and well-maintained vehicles." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARS.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 100}>
              <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card transition-transform hover:-translate-y-1">
                <img src={c.img} alt={c.name} loading="lazy" className="h-16 w-28 object-contain" />
                <div className="flex-1">
                  <p className="font-semibold text-primary">{c.type}</p>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="mt-1 flex gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.seats}</span><span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{c.fuel}</span></p>
                </div>
                <div className="text-xs">
                  {["6 Hours", "12 Hours", "24 Hours"].map((h) => <p key={h} className="flex justify-between gap-4 font-medium"><span>{h}</span><span>₹---</span></p>)}
                  <Link to="/contact" className="mt-2 block rounded bg-grad-red py-1 text-center font-semibold text-accent-foreground">Book Now</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY + TESTIMONIALS */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-8 lg:grid-cols-2 lg:divide-x lg:divide-accent">
        <Reveal variant="left">
          <h2 className="mb-6 text-center font-display text-2xl font-black italic text-primary md:text-3xl">Why Travel With Madhumitha?</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[[Car, "Comfortable & Clean Cars"], [ShieldCheck, "Reliable Travel Experience"], [IndianRupee, "Flexible Rental Packages"], [Users, "Customer-Focused Service"]].map(([I, t]) => {
              const Icon = I as typeof Car;
              return <div key={t as string} className="flex flex-col items-center gap-2 text-center text-xs font-semibold text-primary"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft"><Icon className="h-7 w-7" /></span>{t as string}</div>;
            })}
          </div>
        </Reveal>
        <Reveal variant="right" className="lg:pl-10">
          <h2 className="mb-6 text-center font-display text-2xl font-black italic text-primary md:text-3xl">What Our Customers Say</h2>
          <div className="flex items-center gap-3">
            <button aria-label="Previous" onClick={() => setRev((rev + REVIEWS.length - 1) % REVIEWS.length)} className="rounded-full p-2 shadow-card"><ChevronLeft /></button>
            <div key={rev} className="hero-in flex flex-1 items-center gap-4 rounded-xl bg-card p-4 shadow-card">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-grad-green font-display text-2xl font-black text-primary-foreground">{REVIEWS[rev].n[0]}</span>
              <div>
                <div className="flex text-star">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-1 text-sm">"{REVIEWS[rev].q}"</p>
                <p className="mt-1 text-xs font-semibold">- {REVIEWS[rev].n}</p>
              </div>
            </div>
            <button aria-label="Next" onClick={() => setRev((rev + 1) % REVIEWS.length)} className="rounded-full p-2 shadow-card"><ChevronRight /></button>
          </div>
          <div className="mt-3 flex justify-center gap-2">{REVIEWS.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === rev ? "bg-accent" : "bg-border"}`} />)}</div>
        </Reveal>
      </section>

      <CtaBand title="Your Next Journey Starts Here!" actions={<>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground bg-grad-red px-6 py-3 font-semibold text-accent-foreground">Book Your Car <ArrowRight className="h-4 w-4" /></Link>
        <a href={PHONE_LINK} className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground bg-grad-green px-6 py-3 font-semibold text-primary-foreground"><PhoneCall className="h-4 w-4" /> Call Us Now</a>
      </>}>Book your comfortable ride with Madhumitha Car Travels today.</CtaBand>
      <SiteFooter />
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <label className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground">{icon}<span className="flex flex-1 items-center gap-2 text-foreground">{children}</span></label>;
}
