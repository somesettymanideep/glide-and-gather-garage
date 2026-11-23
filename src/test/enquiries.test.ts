import { describe, expect, it } from "vitest";
import { enquirySchema, statusSchema } from "@/lib/enquiry-schema";

describe("stored enquiries", () => {
  it("accepts home booking details and defaults duration to 4 Hours", () => {
    const entry = enquirySchema.parse({ kind: "booking", name: "Test Traveller", phone: "9876543210", destination: "Vijayawada" });
    expect(entry).toMatchObject({ kind: "booking", name: "Test Traveller", phone: "9876543210", duration: "4 Hours", destination: "Vijayawada" });

    const entryWith4Hours = enquirySchema.parse({ kind: "booking", name: "Test Traveller", phone: "9876543210", duration: "4 Hours", destination: "Vijayawada" });
    expect(entryWith4Hours.duration).toBe("4 Hours");
  });
  it("preserves contact and journey details", () => {
    const entry = enquirySchema.parse({ kind: "contact", name: "Test Traveller", phone: "9876543210", email: "traveller@example.com", pickup: "Airport", pickup_date: "2026-11-25", pickup_time: "10:00", vehicle: "Hyundai i20", message: "Two passengers" });
    expect(entry).toMatchObject({ kind: "contact", email: "traveller@example.com", pickup: "Airport", pickup_date: "2026-11-25", pickup_time: "10:00", vehicle: "Hyundai i20", message: "Two passengers" });
  });
  it("requires a name and phone instead of accepting empty submissions", () => {
    expect(enquirySchema.safeParse({ kind: "booking", name: "", phone: "" }).success).toBe(false);
  });
  it("rejects honeypot submissions", () => {
    expect(enquirySchema.safeParse({ kind: "booking", name: "Bot", phone: "9876543210", website: "spam" }).success).toBe(false);
  });
  it("only accepts the defined enquiry statuses", () => {
    expect(statusSchema.parse("confirmed")).toBe("confirmed");
    expect(statusSchema.safeParse("admin").success).toBe(false);
  });
});