import { describe, expect, it } from "vitest";
import {
  HYDERABAD_VEHICLES,
  OTHER_ROUTES,
  outstationBookingUrl,
} from "@/components/site/OutstationFares";

describe("Outstation Taxi Fares", () => {
  it("defines the 4 vehicle options for Vijayawada to Hyderabad with exact prices", () => {
    expect(HYDERABAD_VEHICLES).toHaveLength(4);

    const sedan = HYDERABAD_VEHICLES.find((v) => v.vehicle === "Sedan Cars");
    expect(sedan?.price).toBe(5500);

    const ertiga = HYDERABAD_VEHICLES.find((v) => v.vehicle === "Maruti Ertiga");
    expect(ertiga?.price).toBe(6500);

    const innova = HYDERABAD_VEHICLES.find((v) => v.vehicle === "Toyota Innova");
    expect(innova?.price).toBe(8500);

    const crysta = HYDERABAD_VEHICLES.find((v) => v.vehicle === "Toyota Innova Crysta");
    expect(crysta?.price).toBe(9500);
  });

  it("defines all 8 other popular outstation routes with exact starting fares", () => {
    const routeMap = new Map(OTHER_ROUTES.map((r) => [r.destination, r.price]));

    expect(routeMap.get("Eluru")).toBe(1800);
    expect(routeMap.get("Rajahmundry")).toBe(3500);
    expect(routeMap.get("Bhimavaram")).toBe(3500);
    expect(routeMap.get("Kakinada")).toBe(5500);
    expect(routeMap.get("Vizag")).toBe(7500);
    expect(routeMap.get("Machilipatnam")).toBe(2000);
    expect(routeMap.get("Palakollu")).toBe(4000);
    expect(routeMap.get("Narsapuram")).toBe(4500);
  });

  it("generates WhatsApp booking URL with pre-filled destination, vehicle and price", () => {
    const url = new URL(outstationBookingUrl("Hyderabad", 6500, "Maruti Ertiga"));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain("Vijayawada to Hyderabad");
    expect(text).toContain("Maruti Ertiga");
    expect(text).toContain("₹6,500");
  });

  it("generates WhatsApp booking URL for other outstation routes", () => {
    const url = new URL(outstationBookingUrl("Vizag", 7500));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain("Vijayawada to Vizag");
    expect(text).toContain("₹7,500");
  });
});
