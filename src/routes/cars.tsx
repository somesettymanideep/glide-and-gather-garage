import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, ChevronDown, Gem, Headphones, IndianRupee, LayoutGrid, ShieldCheck, UserCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CARS, type Category } from "@/components/site/data";
import { cn } from "@/lib/utils";
import { CarCard } from "@/components/site/CarCard";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Our Cars | Madhumitha Car Travels" },
      { name: "description", content: "Sedans, SUVs, hatchbacks and luxury cars for 6, 12 or 24 hour rentals in Vijayawada." },
      { property: "og:title", content: "Our Cars | Madhumitha Car Travels" },
      { property: "og:description", content: "Comfortable, reliable, well-maintained vehicles for every journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarsPage,
});

const TABS: { k: Category | "All"; l: string; I: typeof Car }[] = [
  { k: "Sedan", l: "Sedan", I: Car }, { k: "SUV", l: "SUV", I: Car }, { k: "Hatchback", l: "Hatchback", I: Car },
  { k: "Luxury", l: "Luxury", I: Gem }, { k: "All", l: "All Cars", I: LayoutGrid },
];

function CarsPage() {
  const [tab, setTab] = useState<Category | "All">("All");
  const [sort, setSort] = useState("Price");
  const list = useMemo(() => {
    const l = tab === "All" ? CARS : CARS.filter((c) => c.category === tab);
    return sort === "Seats" ? [...l].sort((a, b) => b.seats - a.seats) : sort === "Name" ? [...l].sort((a, b) => a.name.localeCompare(b.name)) : [...l].sort((a, b) => a.price - b.price);
  }, [tab, sort]);

  return (
    <div className="overflow-x-hidden">
      <SiteHeader />
      <PageHero title="Our Cars" />

      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 md:px-8">
        <Reveal variant="zoom" className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
          {TABS.map(({ k, l, I }) => (
            <button key={k} onClick={() => setTab(k)} className={cn("inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition-all",
              tab === k ? "bg-grad-red text-accent-foreground shadow-card" : "bg-background shadow-card hover:text-accent")}>
              <I className="h-5 w-5" />{l}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-1 rounded-lg bg-background px-4 py-2.5 font-semibold shadow-card">
            <span className="text-accent">Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent outline-none"><option>Price</option><option>Seats</option><option>Name</option></select>
            <ChevronDown className="h-4 w-4" />
          </label>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.code} delay={(i % 3) * 120}>
              <CarCard car={c} />
            </Reveal>
          ))}
        </div>

        <Reveal className="my-10 grid grid-cols-2 gap-6 rounded-2xl bg-brand-soft p-5 md:grid-cols-4 md:divide-x md:divide-border">
          {[[ShieldCheck, "Well-Maintained", "Vehicles"], [Headphones, "24/7", "Support"], [UserCheck, "Professional", "Drivers"], [IndianRupee, "Affordable", "Pricing"]].map(([I, a, b]) => {
            const Icon = I as typeof Car;
            return <div key={a as string} className="flex items-center justify-center gap-3"><Icon className="h-9 w-9 text-primary" /><p className="font-semibold leading-tight">{a as string}<br /><span className="font-normal">{b as string}</span></p></div>;
          })}
        </Reveal>
      </section>

      <CtaBand title="Ready to Ride?" actions={
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground bg-grad-red px-8 py-3 text-lg font-semibold text-accent-foreground">Book Your Car <ArrowRight className="h-4 w-4" /></Link>
      }>Book your favourite car today and travel with confidence!</CtaBand>
      <SiteFooter />
    </div>
  );
}
