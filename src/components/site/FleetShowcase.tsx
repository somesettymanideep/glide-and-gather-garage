import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, Fuel, Settings, Snowflake, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARS, carBookingUrl, type Category } from "./data";
import { WhatsappIcon } from "./BrandIcons";

const BLURB: Record<Category, string> = {
  Hatchback: "Compact, fuel-efficient and easy to drive — ideal for city trips, solo travellers and small families.",
  Sedan: "A smooth, comfortable ride for business travel, airport transfers and family outings.",
  SUV: "Spacious, powerful and built for family journeys, outstation trips and group travel with luggage.",
  Luxury: "A premium chauffeur-class experience for weddings, VIP transfers and special occasions.",
};

export function FleetShowcase() {
  const [active, setActive] = useState(0);
  const car = CARS[active] ?? CARS[0];

  if (!car) return null;

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card">
      {/* Tabs */}
      <div role="tablist" aria-label="Choose a vehicle" className="flex overflow-x-auto bg-background">
        {CARS.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.code}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`group flex min-w-[9.5rem] flex-1 flex-col items-center gap-2 border-b-4 px-3 pb-4 pt-4 text-center transition-colors ${
                on ? "border-accent bg-brand-deep text-primary-foreground" : "border-transparent text-foreground hover:bg-brand-soft"
              }`}
            >
              <span className="h-12 w-20 overflow-hidden rounded-md bg-car-photo">
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="text-xs font-bold leading-tight md:text-sm">{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div key={car.code} className="hero-in grid items-center gap-6 p-5 md:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-xl bg-car-photo">
          <img src={car.img} alt={car.name} className="aspect-[4/3] w-full object-cover md:aspect-[16/10]" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-grad-green px-3 py-1 text-xs font-bold text-primary-foreground shadow-card">
            <BadgeCheck className="h-3.5 w-3.5" />Available
          </span>
          {car.isRealFleet && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-card">
              Actual Vehicle
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-primary">{car.type} ({car.seats} Seater)</p>
          <h3 className="mt-1 font-display text-2xl font-black italic text-foreground md:text-3xl">{car.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{BLURB[car.category]}</p>

          <div className="my-5 flex flex-wrap gap-x-6 gap-y-3 border-y py-4 text-sm font-medium">
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{car.seats} Seats</span>
            <span className="flex items-center gap-2">{car.fuel.includes("Electric") ? <Zap className="h-4 w-4 text-accent" /> : <Fuel className="h-4 w-4 text-primary" />}{car.fuel}</span>
            <span className="flex items-center gap-2"><Settings className="h-4 w-4 text-primary" />{car.transmission}</span>
            <span className="flex items-center gap-2"><Snowflake className="h-4 w-4 text-primary" />AC</span>
          </div>

          <p className="text-sm text-muted-foreground">Daily rental rate</p>
          <p className="mt-1 font-display text-4xl font-black text-accent md:text-5xl">
            ₹{car.price.toLocaleString("en-IN")} <span className="text-base font-semibold text-foreground">/ day</span>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 gap-2 bg-grad-green px-6 font-bold shadow-card">
              <a href={carBookingUrl(car)} target="_blank" rel="noopener noreferrer"><WhatsappIcon />Book This Vehicle<ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Link to="/cars/$carId" params={{ carId: car.code }} className="inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 text-sm font-bold text-primary transition-colors hover:text-accent">
              View Details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
