import { createFileRoute, Link } from "@tanstack/react-router";
import { Armchair, ArrowRight, Car, Handshake, Headphones, IndianRupee, MapPin, ShieldCheck, User } from "lucide-react";
import aboutBanner from "@/assets/about-banner.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Madhumitha Car Travels Vijayawada" },
      { name: "description", content: "Madhumitha Car Travels is Vijayawada's trusted car rental service offering chauffeur-driven cabs, airport transfers, and outstation trips with 5+ years experience." },
      { property: "og:title", content: "About Us | Madhumitha Car Travels Vijayawada" },
      { property: "og:description", content: "Learn about Madhumitha Car Travels: fleet quality, professional drivers, and 24/7 travel service in Vijayawada." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://madhumithacartravels.in/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://madhumithacartravels.in/about" },
    ],
  }),
  component: AboutPage,
});

const HISTORY = [
  { y: "2020", t: "The Beginning", d: "Madhumitha Car Travels was founded with a simple promise — safe, comfortable and affordable travel for every customer." },
  { y: "2021", t: "First Three Cars", d: "We hit the road with our first three cars, serving families, businesses and airport travellers across Vijayawada." },
  { y: "2025", t: "Almost 20 Cars", d: "Thanks to our customers' trust, the fleet grew to almost 20 well-maintained cars with 24/7 support." },
  { y: "Today", t: "Almost 50 Cars", d: "Today we run almost 50 cars — sedans, SUVs and luxury vehicles — ready for your next journey." },
];

const WHY = [
  { Icon: ShieldCheck, red: true, t: "Safe & Secure Travel", d: "Your safety is our top priority" },
  { Icon: Car, red: false, t: "Well-Maintained Vehicles", d: "Ride in comfort and style" },
  { Icon: User, red: true, t: "Professional Drivers", d: "Experienced & courteous drivers" },
  { Icon: Headphones, red: false, t: "24/7 Support", d: "Always here to assist you" },
  { Icon: IndianRupee, red: true, t: "Affordable Pricing", d: "Best rates for every trip" },
  { Icon: MapPin, red: false, t: "Flexible Travel Options", d: "Local, Outstation & More" },
];

function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <SiteHeader />
      <PageHero title="About Us" />

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2">
        <Reveal variant="left" className="relative">
          <img src={aboutBanner} alt="Our fleet on a scenic highway — Your Journey, Our Priority" className="w-full rounded-2xl shadow-card" loading="lazy" />
          <div className="absolute -bottom-6 right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-star bg-gradient-to-b from-brand-deep to-foreground text-center font-display text-primary-foreground shadow-card">
            <span className="text-4xl font-black text-star">5+</span><span className="text-lg font-bold text-star">Years</span>
            <span className="rounded bg-accent px-2 text-[10px] font-bold italic">Experience</span>
          </div>
        </Reveal>
        <Reveal>
          <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-accent">— ABOUT US <span className="h-px w-32 bg-accent" /></p>
          <h2 className="mt-2 font-display text-3xl font-black italic md:text-4xl"><span className="text-accent">Travel </span><span className="text-primary">Beyond</span> <span className="text-accent">Expectations</span></h2>
          <p className="mt-4 text-sm leading-relaxed">Madhumitha Car Travels is your trusted travel partner for safe, comfortable and affordable journeys. We are committed to delivering reliable transportation services with customer satisfaction at the heart.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[[ShieldCheck, "Customer Satisfaction"], [Armchair, "Comfortable Journeys"], [Handshake, "Reliable Service"], [Headphones, "Professional Support"]].map(([I, t]) => {
              const Icon = I as typeof ShieldCheck;
              return (
                <div key={t as string} className="flex flex-col items-center gap-2 rounded-xl bg-card p-3 text-center text-xs font-semibold shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-primary"><Icon className="h-5 w-5" /></span>{t as string}
                </div>
              );
            })}
          </div>
          <Link to="/cars" className="mt-6 inline-flex items-center gap-2 rounded-full bg-grad-red px-6 py-3 text-sm font-semibold text-accent-foreground shadow-card">Explore Our Cars <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <Reveal className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-0.5 w-24 bg-primary sm:block" />
            <h2 className="font-display text-3xl font-black italic md:text-4xl"><span className="text-primary">Why </span><span className="text-accent">Choose Us</span></h2>
            <span className="hidden h-0.5 w-24 bg-primary sm:block" />
          </div>
          <p className="mt-2 text-sm font-medium md:text-base">Your Trusted Travel Partner for a Comfortable and Safe Journey</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 100}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-2">
                <span className={`flex h-16 w-16 items-center justify-center rounded-full ${w.red ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                  <w.Icon className="h-8 w-8" />
                </span>
                <h3 className="text-sm font-bold text-primary">{w.t}</h3>
                <p className="text-xs text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR HISTORY */}
      <section className="bg-brand-soft py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="hidden h-0.5 w-20 bg-accent sm:block" />
              <h2 className="font-display text-2xl font-black italic md:text-3xl"><span className="text-primary">Our </span><span className="text-accent">History</span></h2>
              <span className="hidden h-0.5 w-20 bg-accent sm:block" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">The journey of Madhumitha Car Travels, mile by mile.</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HISTORY.map((h, i) => (
              <Reveal key={h.y} delay={i * 120}>
                <div className="relative h-full rounded-2xl bg-card p-6 pt-8 shadow-card transition-transform hover:-translate-y-2">
                  <span className="absolute -top-4 left-6 rounded-full bg-grad-red px-4 py-1.5 font-display text-sm font-black italic text-accent-foreground shadow-card">{h.y}</span>
                  <h3 className="font-semibold text-primary">{h.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-grad-red px-6 py-3 font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5">Book Your Car <Car className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
