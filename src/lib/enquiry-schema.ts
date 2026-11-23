import { z } from "zod";

const short = z.string().trim().max(250).default("");
export const enquirySchema = z.object({
  kind: z.enum(["booking", "contact"]),
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number"),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).default(""),
  pickup: short, destination: short,
  pickup_date: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")]).default(""),
  pickup_time: z.union([z.string().regex(/^\d{2}:\d{2}$/), z.literal("")]).default(""),
  duration: z.enum(["4 Hours", "6 Hours", "12 Hours", "24 Hours"]).default("4 Hours"),
  vehicle: short, message: z.string().trim().max(2000).default(""),
  website: z.string().max(0, "Unable to submit this enquiry").default(""),
});
export const statusSchema = z.enum(["new", "contacted", "confirmed", "closed"]);
export function enquiryFromForm(form: HTMLFormElement, kind: "booking" | "contact") {
  return enquirySchema.parse({ ...Object.fromEntries(new FormData(form)), kind });
}