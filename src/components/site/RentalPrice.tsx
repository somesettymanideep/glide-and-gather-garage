import { ChevronDown } from "lucide-react";
import { getRentalRate, RENTAL_HOURS, type Car, type RentalHours } from "./data";

export function RentalPrice({ car, hours, onChange }: { car: Car; hours: RentalHours; onChange: (hours: RentalHours) => void }) {
  const rate = getRentalRate(car, hours);
  return (
    <div className="my-4 space-y-3">
      <label className="flex items-center justify-between gap-3 text-sm font-semibold">
        Rental duration
        <span className="relative min-w-32">
          <select aria-label={`${car.name} rental duration`} value={hours} onChange={(event) => {
            const next = RENTAL_HOURS.find((value) => String(value) === event.target.value);
            if (next) onChange(next);
          }} className="w-full appearance-none rounded-lg border border-input bg-card py-2 pl-3 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            {RENTAL_HOURS.map((duration) => <option key={duration} value={duration}>{duration} hours</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-primary" />
        </span>
      </label>
      <p aria-live="polite" className="rounded-lg bg-brand-soft px-3 py-3 text-center font-display text-2xl font-black text-primary">
        {rate === undefined ? <span className="text-base">Price on enquiry</span> : <>₹{rate.toLocaleString("en-IN")} <span className="text-sm font-semibold text-foreground">/ {hours} hrs</span></>}
      </p>
    </div>
  );
}