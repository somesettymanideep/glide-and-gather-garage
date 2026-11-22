import { describe, expect, it } from "vitest";
import { CARS, carBookingUrl, getCar, getRentalRate, PHONE_LINK } from "@/components/site/data";

describe("Car-specific booking", () => {
  it.each([[4, 2500], [8, 3500], [12, 3500]] as const)("charges Swift Dzire %i hours at ₹%i", (hours, price) => {
    const car = getCar("MC111");
    if (!car) throw new Error("Swift Dzire missing");
    expect(getRentalRate(car, hours)).toBe(price);
    const text = new URL(carBookingUrl(car, hours)).searchParams.get("text");
    expect(text).toContain(`for ${hours} hours at ₹${price.toLocaleString("en-IN")}`);
  });
  it.each([[4, 2000], [8, 3000], [12, 3500]] as const)("charges Kia Carens %i hours at ₹%i", (hours, price) => {
    const car = getCar("MC109");
    if (!car) throw new Error("Carens missing");
    expect(getRentalRate(car, hours)).toBe(price);
    expect(new URL(carBookingUrl(car, hours)).searchParams.get("text")).toContain(`for ${hours} hours at ₹${price.toLocaleString("en-IN")}`);
  });
  it.each([[4, 2000], [8, 3000], [12, 3000]] as const)("charges Urban Cruiser Ebella EV %i hours at ₹%i", (hours, price) => {
    const car = getCar("MC110");
    if (!car) throw new Error("Ebella missing");
    expect(getRentalRate(car, hours)).toBe(price);
    expect(new URL(carBookingUrl(car, hours)).searchParams.get("text")).toContain(`for ${hours} hours at ₹${price.toLocaleString("en-IN")}`);
  });
  it.each([[4, 2500], [8, 3500], [12, 3500]] as const)("charges Innova Crysta %i hours at ₹%i", (hours, price) => {
    const car = getCar("MC105");
    if (!car) throw new Error("Innova missing");
    expect(getRentalRate(car, hours)).toBe(price);
    expect(new URL(carBookingUrl(car, hours)).searchParams.get("text")).toContain(`for ${hours} hours at ₹${price.toLocaleString("en-IN")}`);
  });
  it("calls the company's existing phone number", () => {
    expect(PHONE_LINK).toBe("tel:+917981872730");
  });
  it.each(CARS)("includes the selected $code car in its WhatsApp enquiry", (car) => {
    const url = new URL(carBookingUrl(car));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    expect(url.searchParams.get("text")).toContain(`${car.name} (${car.code})`);
  });
  it("uses a different image for each car in the fleet", () => {
    expect(CARS).toHaveLength(5);
    expect(new Set(CARS.map((car) => car.img)).size).toBe(5);
  });
  it("only contains real verified cars in the fleet", () => {
    expect(CARS.every((c) => c.isRealFleet)).toBe(true);
    expect(CARS.map((c) => c.name)).toEqual([
      "Toyota Innova Crysta",
      "Kia Carens",
      "Toyota Urban Cruiser Ebella EV",
      "Maruti Suzuki Swift Dzire",
      "Force Urbania",
    ]);
  });
  it("returns only the requested car and rejects unknown codes", () => {
    expect(getCar("MC105")?.name).toBe("Toyota Innova Crysta");
    expect(getCar("MC109")?.name).toBe("Kia Carens");
    expect(getCar("MC110")?.name).toBe("Toyota Urban Cruiser Ebella EV");
    expect(getCar("MC111")?.name).toBe("Maruti Suzuki Swift Dzire");
    expect(getCar("MC112")?.name).toBe("Force Urbania");
    expect(getCar("MC100")).toBeUndefined();
    expect(getCar("missing")).toBeUndefined();
  });
});