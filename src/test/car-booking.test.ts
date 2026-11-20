import { describe, expect, it } from "vitest";
import { CARS, carBookingUrl, getCar } from "@/components/site/data";

describe("Car-specific booking", () => {
  it.each(CARS)("includes the selected $code car in its WhatsApp enquiry", (car) => {
    const url = new URL(carBookingUrl(car));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    expect(url.searchParams.get("text")).toContain(`${car.name} (${car.code})`);
  });
  it("uses a different image for each car in the fleet", () => {
    expect(CARS).toHaveLength(4);
    expect(new Set(CARS.map((car) => car.img)).size).toBe(4);
  });
  it("only contains real verified cars in the fleet", () => {
    expect(CARS.every((c) => c.isRealFleet)).toBe(true);
    expect(CARS.map((c) => c.name)).toEqual([
      "Toyota Innova Crysta",
      "Kia Carens",
      "Toyota Urban Cruiser Ebella EV",
      "Maruti Suzuki Swift Dzire",
    ]);
  });
  it("returns only the requested car and rejects unknown codes", () => {
    expect(getCar("MC105")?.name).toBe("Toyota Innova Crysta");
    expect(getCar("MC109")?.name).toBe("Kia Carens");
    expect(getCar("MC110")?.name).toBe("Toyota Urban Cruiser Ebella EV");
    expect(getCar("MC111")?.name).toBe("Maruti Suzuki Swift Dzire");
    expect(getCar("MC100")).toBeUndefined();
    expect(getCar("missing")).toBeUndefined();
  });
});