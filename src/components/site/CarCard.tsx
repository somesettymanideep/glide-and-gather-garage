import { Link } from "@tanstack/react-router";
import { BadgeCheck, Eye, Fuel, Settings, Snowflake, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { carBookingUrl, type Car } from "./data";
import { WhatsappIcon } from "./BrandIcons";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card text-center shadow-card transition-transform hover:-translate-y-2">
      <div className="relative h-48 w-full overflow-hidden bg-car-photo">
        <img src={car.img} alt={car.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-grad-green px-3 py-1 text-xs font-bold text-primary-foreground shadow-card"><BadgeCheck className="h-3.5 w-3.5" />Available</span>
        {car.isRealFleet && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-card">
            Actual Vehicle
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
      <h3 className="mt-1 flex min-h-14 items-center justify-center text-xl font-bold">{car.name}</h3>
      <div className="mx-auto mt-3 grid w-full max-w-xs grid-cols-2 gap-x-4 gap-y-2 text-left text-sm font-medium">
        <p className="flex items-center gap-2"><User className="h-4 w-4 shrink-0" />{car.seats} Seater</p>
        <p className="flex items-center gap-2">{car.fuel.includes("Electric") ? <Zap className="h-4 w-4 shrink-0 text-accent" /> : <Fuel className="h-4 w-4 shrink-0" />}{car.fuel}</p>
        <p className="flex items-center gap-2"><Settings className="h-4 w-4 shrink-0" />{car.transmission}</p>
        <p className="flex items-center gap-2"><Snowflake className="h-4 w-4 shrink-0" />AC</p>
      </div>
      <p className="mt-4 rounded-xl bg-brand-soft py-2.5 font-display text-2xl font-black text-primary">₹{car.price.toLocaleString("en-IN")} <span className="text-sm font-semibold text-foreground">/ day</span></p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Button asChild variant="outline" className="h-11 gap-1.5 border-2 border-primary px-2 font-bold text-primary hover:bg-brand-soft hover:text-primary"><Link to="/cars/$carId" params={{ carId: car.code }}><Eye />View Details</Link></Button>
        <Button asChild className="h-11 gap-1.5 bg-grad-green px-2 font-bold shadow-card"><a href={carBookingUrl(car)} target="_blank" rel="noopener noreferrer"><WhatsappIcon />Book Now</a></Button>
      </div>
      </div>
    </article>
  );
}