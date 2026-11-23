import { describe, expect, it } from "vitest";
import { destinationBookingUrl, POPULAR_DESTINATIONS } from "@/components/site/PopularDestinations";

describe("Popular Destinations", () => {
  it("includes at least 5 popular destinations in Vijayawada", () => {
    expect(POPULAR_DESTINATIONS.length).toBeGreaterThanOrEqual(5);
  });

  it("has valid names, categories, and images for all destinations", () => {
    for (const dest of POPULAR_DESTINATIONS) {
      expect(dest.name).toBeTruthy();
      expect(dest.category).toBeTruthy();
      expect(dest.image).toBeTruthy();
      expect(dest.distance).toContain("km");
      expect(dest.duration).toContain("drive");
      expect(dest.recommendedPackage).toBeTruthy();
    }
  });

  it("generates a WhatsApp booking link pre-filling the destination and package", () => {
    const temple = POPULAR_DESTINATIONS.find((d) => d.id === "kanaka-durga");
    if (!temple) throw new Error("Kanaka Durga missing");

    const url = new URL(destinationBookingUrl(temple));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/917981872730");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain(temple.name);
    expect(text).toContain(temple.recommendedPackage);
  });
});
