import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Car,
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./BrandIcons";
import { PHONE } from "./data";
import { Reveal } from "./Reveal";

export interface HyderabadVehicleOption {
  vehicle: string;
  category: string;
  seats: number;
  price: number;
  badge?: string;
  features: string;
}

export interface OutstationRoute {
  id: string;
  from: string;
  destination: string;
  fullDestination?: string;
  price: number;
  distance: string;
  duration: string;
  region: "Godavari" | "Nearby" | "North Coast";
  vehicleInfo: string;
  highlight?: string;
}

export const HYDERABAD_VEHICLES: HyderabadVehicleOption[] = [
  {
    vehicle: "Sedan Cars",
    category: "Swift Dzire / Etios",
    seats: 4,
    price: 5500,
    badge: "Best Value",
    features: "AC • 4 Seater • Ample Boot Space",
  },
  {
    vehicle: "Maruti Ertiga",
    category: "Family MPV",
    seats: 6,
    price: 6500,
    badge: "Popular Family Choice",
    features: "AC • 6 Seater • Spacious Seating",
  },
  {
    vehicle: "Toyota Innova",
    category: "Comfort SUV",
    seats: 7,
    price: 8500,
    badge: "Maximum Comfort",
    features: "AC • 7 Seater • Long-Distance Touring",
  },
  {
    vehicle: "Toyota Innova Crysta",
    category: "Premium Executive",
    seats: 7,
    price: 9500,
    badge: "Luxury Chauffeur",
    features: "AC • 7 Seater • Plush Captain Seats",
  },
];

export const OTHER_ROUTES: OutstationRoute[] = [
  {
    id: "eluru",
    from: "Vijayawada",
    destination: "Eluru",
    price: 1800,
    distance: "60 km",
    duration: "1.5 hrs",
    region: "Nearby",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Daily Express Route",
  },
  {
    id: "machilipatnam",
    from: "Vijayawada",
    destination: "Machilipatnam",
    price: 2000,
    distance: "70 km",
    duration: "1.5 hrs",
    region: "Nearby",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Coastal Highway Corridor",
  },
  {
    id: "bhimavaram",
    from: "Vijayawada",
    destination: "Bhimavaram",
    price: 3500,
    distance: "115 km",
    duration: "2.5 hrs",
    region: "Godavari",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Aqua Hub of West Godavari",
  },
  {
    id: "rajahmundry",
    from: "Vijayawada",
    destination: "Rajahmundry",
    fullDestination: "Rajahmundry (Rajamahendravaram)",
    price: 3500,
    distance: "160 km",
    duration: "3.5 hrs",
    region: "Godavari",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Scenic Godavari Bridge Route",
  },
  {
    id: "palakollu",
    from: "Vijayawada",
    destination: "Palakollu",
    price: 4000,
    distance: "135 km",
    duration: "3 hrs",
    region: "Godavari",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Ksheera Ramalingeswara Swamy Temple",
  },
  {
    id: "narsapuram",
    from: "Vijayawada",
    destination: "Narsapuram",
    price: 4500,
    distance: "145 km",
    duration: "3.5 hrs",
    region: "Godavari",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "River Godavari Confluence & Port",
  },
  {
    id: "kakinada",
    from: "Vijayawada",
    destination: "Kakinada",
    price: 5500,
    distance: "215 km",
    duration: "4.5 hrs",
    region: "Godavari",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "Port City & Coringa Sanctuary",
  },
  {
    id: "vizag",
    from: "Vijayawada",
    destination: "Vizag",
    fullDestination: "Visakhapatnam (Vizag)",
    price: 7500,
    distance: "350 km",
    duration: "6.5 hrs",
    region: "North Coast",
    vehicleInfo: "Sedans, Ertiga & Innova available",
    highlight: "City of Destiny • Coastal Highway",
  },
];

export function outstationBookingUrl(destination: string, price: number, vehicle?: string) {
  const number = PHONE.replace(/\D/g, "");
  const vehicleText = vehicle ? ` for ${vehicle}` : "";
  const message = `Hello Madhumitha Car Travels, I would like to book an outstation cab from Vijayawada to ${destination}${vehicleText} (Starting from ₹${price.toLocaleString("en-IN")}). Please confirm car availability and the final quotation. My travel date: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function OutstationFares() {
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState<"All" | "Nearby" | "Godavari" | "North Coast">("All");

  const filteredRoutes = useMemo(() => {
    return OTHER_ROUTES.filter((route) => {
      const matchSearch =
        route.destination.toLowerCase().includes(search.toLowerCase()) ||
        (route.fullDestination && route.fullDestination.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = filterRegion === "All" || route.region === filterRegion;
      return matchSearch && matchRegion;
    });
  }, [search, filterRegion]);

  return (
    <section id="outstation" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 md:px-8">
      {/* 1. SECTION HEADING */}
      <Reveal className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
          <h2 className="font-display text-2xl font-black italic md:text-4xl">
            <span className="text-primary">Vijayawada </span>
            <span className="text-accent">Outstation Taxi Fares</span>
          </h2>
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
        </div>
        <p className="mt-2 text-base font-bold text-foreground md:text-lg">
          Affordable Outstation Car Rentals from Vijayawada to Major Cities.
        </p>
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Travel comfortably from Vijayawada to your favourite destinations with reliable outstation taxi services.
          Choose from a range of comfortable vehicles at competitive starting prices.
        </p>
      </Reveal>

      {/* 2. FEATURED ROUTE: VIJAYAWADA TO HYDERABAD */}
      <Reveal className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card via-brand-soft/40 to-card p-6 shadow-card transition-all md:p-8">
          {/* Subtle top decoration badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Featured Outstation Corridor
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" /> NH 65 Expressway
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-black italic text-primary md:text-3xl">
                Vijayawada <span className="text-accent">→</span> Hyderabad
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Distance: Approx 275 km • Travel Time: 5 to 6 hrs • Direct Airport / City Drop available
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-background/80 px-4 py-3 text-right shadow-sm">
              <span className="text-xs font-medium text-muted-foreground">Express Fares From</span>
              <p className="font-display text-2xl font-black text-primary md:text-3xl">
                ₹5,500 <span className="text-xs font-normal text-muted-foreground">onwards</span>
              </p>
            </div>
          </div>

          {/* Hyderabad Vehicle Options Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HYDERABAD_VEHICLES.map((opt) => (
              <div
                key={opt.vehicle}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                      <Car className="h-3.5 w-3.5" /> {opt.category}
                    </span>
                    {opt.badge && (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                        {opt.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {opt.vehicle}
                  </h4>

                  <p className="mt-1 text-xs text-muted-foreground">{opt.features}</p>
                </div>

                <div className="mt-5 border-t border-border/80 pt-4">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Starting fare</span>
                    <span className="font-display text-2xl font-black text-primary">
                      ₹{opt.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="h-10 w-full gap-1.5 bg-grad-green font-bold text-primary-foreground shadow-card transition-all active:scale-95"
                  >
                    <a
                      href={outstationBookingUrl("Hyderabad", opt.price, opt.vehicle)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="h-4 w-4" /> Book Now
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3. OTHER POPULAR ROUTES */}
      <Reveal className="mb-6">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
              Other Popular Routes from Vijayawada
            </h3>
            <p className="text-xs text-muted-foreground md:text-sm">
              Instant one-way and round-trip transfers across Andhra Pradesh with verified drivers.
            </p>
          </div>

          {/* Region Tabs & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 rounded-lg border border-input bg-card pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex rounded-lg border border-border bg-card p-0.5 text-xs font-semibold">
              {(["All", "Nearby", "Godavari", "North Coast"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFilterRegion(r)}
                  className={`rounded-md px-3 py-1.5 transition-all ${
                    filterRegion === r
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Landscape Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {filteredRoutes.map((route, i) => (
          <Reveal key={route.id} delay={(i % 4) * 80}>
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:p-6">
              {/* Header row: From -> To */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                    <span>From {route.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-accent" />
                    <span className="font-bold text-foreground">
                      {route.fullDestination || route.destination}
                    </span>
                  </div>

                  {route.highlight && (
                    <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {route.highlight}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <div>
                    <h4 className="font-display text-xl font-black text-primary transition-colors group-hover:text-accent">
                      {route.destination}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">{route.vehicleInfo}</p>
                  </div>
                </div>

                {/* Route specs chips */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {route.distance}
                  </span>
                  <span className="text-border">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    Approx {route.duration}
                  </span>
                </div>
              </div>

              {/* Bottom row: Price & Book Now */}
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/80 pt-4">
                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Starting Fare
                  </span>
                  <p className="font-display text-2xl font-black text-primary">
                    ₹{route.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <Button
                  asChild
                  className="h-10 gap-1.5 bg-grad-green px-5 font-bold text-primary-foreground shadow-card transition-all hover:opacity-95 active:scale-95"
                >
                  <a
                    href={outstationBookingUrl(route.destination, route.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon className="h-4 w-4" /> Book Now
                  </a>
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="my-8 rounded-2xl bg-card p-8 text-center shadow-card">
          <p className="text-base font-bold text-primary">No routes found matching "{search}".</p>
          <p className="mt-1 text-xs text-muted-foreground">
            We provide custom outstation cabs anywhere in India. Contact us directly for instant rates.
          </p>
          <Button
            type="button"
            onClick={() => {
              setSearch("");
              setFilterRegion("All");
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* 4. SECTION FOOTER */}
      <Reveal className="mt-12 space-y-6">
        {/* Informational Note & Fare Inclusions */}
        <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-brand-soft/50 p-4 text-xs text-muted-foreground sm:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="space-y-1 leading-relaxed">
            <p className="font-semibold text-foreground">
              Transparent Pricing & Inclusions:
            </p>
            <p>
              Starting fares include vehicle rental, fuel charges, and chauffeur allowance. Toll plaza fees, parking tickets, and interstate border entry permits are charged at actuals. Zero hidden fees or surprise booking charges. Fares may vary during festival peaks or specialized route requests.
            </p>
          </div>
        </div>

        {/* CTA Banner: Need a Custom Travel Quote? */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-brand-deep to-foreground p-6 text-center text-primary-foreground shadow-card md:flex-row md:p-8 md:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-star">
              Custom Itineraries & Multi-City Tours
            </span>
            <h4 className="mt-1 font-display text-2xl font-black italic md:text-3xl">
              Need a Custom Travel Quote?
            </h4>
            <p className="mt-2 text-xs text-primary-foreground/90 sm:text-sm">
              Get in touch with our team to book your outstation journey. We provide customized round-trip, one-way drop,
              and multi-day outstation packages tailored to your schedule.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-grad-red px-7 font-bold text-accent-foreground shadow-card hover:opacity-95"
            >
              <Link to="/contact">
                Get a Quick Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
