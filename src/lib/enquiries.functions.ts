import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { enquirySchema, statusSchema } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator(enquirySchema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _honeypot, ...enquiry } = data;
    const { count, error: limitError } = await supabaseAdmin.from("enquiries").select("id", { count: "exact", head: true }).eq("phone", enquiry.phone).gte("created_at", new Date(Date.now() - 60_000).toISOString());
    if (limitError) throw new Error("Unable to save your request. Please try again.");
    if ((count ?? 0) >= 3) throw new Error("Please wait a minute before sending another request.");
    const { error } = await supabaseAdmin.from("enquiries").insert(enquiry);
    if (error) throw new Error("Unable to save your request. Please try again or call us.");
    return { success: true };
  });

export const getEnquiries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ page: z.number().int().min(0).default(0), kind: z.enum(["all", "booking", "contact"]).default("all"), status: z.union([statusSchema, z.literal("all")]).default("all") }))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) return { allowed: false as const, rows: [], count: 0 };
    let query = context.supabase.from("enquiries").select("*", { count: "exact" }).order("created_at", { ascending: false });
    if (data.kind !== "all") query = query.eq("kind", data.kind);
    if (data.status !== "all") query = query.eq("status", data.status);
    const { data: rows, count, error } = await query.range(data.page * 20, data.page * 20 + 19);
    if (error) throw new Error("Unable to load enquiries. Please try again.");
    return { allowed: true as const, rows: rows ?? [], count: count ?? 0 };
  });

export const updateEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid(), status: statusSchema }))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !isAdmin) throw new Error("Admin access required");
    const { error } = await context.supabase.from("enquiries").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Unable to update enquiry");
    return { success: true };
  });