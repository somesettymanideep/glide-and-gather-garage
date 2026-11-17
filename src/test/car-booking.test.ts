import { describe, expect, it } from "vitest";
import { CARS, carBookingUrl, getCar } from "@/components/site/data";

describe("Car-specific booking", () => {
  it.each(CARS)("includes the selected $code car in its WhatsApp enquiry", (car) => {
    const url = new URL(carBookingUrl(car));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    expect(url.searchParams.get("text")).toContain(`${car.name} (${car.code})`);
  });
  it("uses a different image for each of the nine cars", () => {
    expect(CARS).toHaveLength(9);
    expect(new Set(CARS.map((car) => car.img)).size).toBe(9);
  });
  it("returns only the requested car and rejects unknown codes", () => {
    expect(getCar("MC105")?.name).toBe("Toyota Innova Crysta");
    expect(getCar("missing")).toBeUndefined();
  });
});