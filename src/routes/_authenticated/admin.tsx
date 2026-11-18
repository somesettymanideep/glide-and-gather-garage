import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Inbox, LogOut, RefreshCw, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { getEnquiries, updateEnquiry } from "@/lib/enquiries.functions";
import { statusSchema } from "@/lib/enquiry-schema";
import { pageMeta } from "@/lib/page-meta";

const enquiriesOptions = (page = 0, kind: "all" | "booking" | "contact" = "all", status: "all" | "new" | "contacted" | "confirmed" | "closed" = "all") => queryOptions({ queryKey: ["admin-enquiries", page, kind, status], queryFn: () => getEnquiries({ data: { page, kind, status } }) });
export const Route = createFileRoute("/_authenticated/admin")({
  head: () => pageMeta("Admin enquiries", "Private booking and contact enquiry inbox for Madhumitha Car Travels."),
  loader: ({ context }) => context.queryClient.ensureQueryData(enquiriesOptions()),
  component: Admin,
  errorComponent: ({ reset }) => <main className="p-8"><h1 className="text-xl font-bold">Unable to load enquiries</h1><Button onClick={reset} className="mt-4">Try again</Button><Button asChild variant="link"><Link to="/auth">Sign in</Link></Button></main>,
});
function Admin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [kind, setKind] = useState<"all" | "booking" | "contact">("all");
  const [status, setStatus] = useState<"all" | "new" | "contacted" | "confirmed" | "closed">("all");
  const { data, isFetching } = useSuspenseQuery(enquiriesOptions(page, kind, status));
  const update = useServerFn(updateEnquiry);
  const mutation = useMutation({ mutationFn: update, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] }), onError: () => toast.error("Unable to update status. Please try again.") });
  async function signOut() { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true }); }
  return <div className="min-h-screen bg-background">
    <header className="border-b border-accent bg-card"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 md:px-8"><Link to="/" className="font-display text-lg font-bold italic text-primary">Madhumitha <span className="text-accent">Car Travels</span></Link><div className="flex gap-2"><Button asChild variant="outline"><Link to="/">View website</Link></Button><Button variant="outline" onClick={signOut}><LogOut />Sign out</Button></div></div></header>
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      {!data.allowed ? <div className="py-12"><h1 className="font-display text-2xl font-bold text-primary">Admin access required</h1><p className="mt-3 text-muted-foreground">This account does not have permission to view customer enquiries.</p><Button onClick={signOut} className="mt-6">Sign in with another account</Button></div> : <>
        <div className="flex items-center justify-between gap-3"><div><h1 className="flex items-center gap-3 font-display text-2xl font-bold text-primary"><Inbox />Enquiry inbox</h1><p className="mt-2 text-sm text-muted-foreground">{data.count} {data.count === 1 ? "enquiry" : "enquiries"}</p></div><Button variant="outline" size="icon" aria-label="Refresh enquiries" title="Refresh enquiries" disabled={isFetching} onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] })}><RefreshCw className={isFetching ? "animate-spin" : ""} /></Button></div>
        <div className="my-6 flex flex-wrap items-center gap-3 border-y py-4">
          {(["all", "booking", "contact"] as const).map((item) => <Button key={item} variant={kind === item ? "default" : "outline"} onClick={() => { setKind(item); setPage(0); }}>{item === "all" ? "All enquiries" : item === "booking" ? "Bookings" : "Contact forms"}</Button>)}
          <label className="ml-auto flex items-center gap-2 text-sm">Status<select aria-label="Filter by status" value={status} className="rounded-md border bg-card px-3 py-2" onChange={(e) => { const v = e.target.value; setStatus(v === "all" ? "all" : statusSchema.parse(v)); setPage(0); }}><option value="all">All statuses</option>{statusSchema.options.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}</select></label>
        </div>
        {data.rows.length === 0 ? <div className="border-b py-16 text-center"><Inbox className="mx-auto h-10 w-10 text-muted-foreground" /><h2 className="mt-4 text-lg font-semibold">No enquiries yet</h2></div> : <div className="divide-y">{data.rows.map((row) => <article key={row.id} className="grid gap-5 py-6 md:grid-cols-[1fr_1.4fr_0.6fr]">
          <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold text-primary">{row.name}</h2><span className="rounded bg-brand-soft px-2 py-1 text-xs text-primary">{row.kind === "booking" ? "Booking" : "Contact"}</span></div><p className="mt-1 text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p><a className="mt-3 flex items-center gap-2 text-sm" href={`tel:${row.phone}`}><Phone className="h-4 w-4 text-primary" />{row.phone}</a>{row.email && <a className="mt-2 flex items-center gap-2 break-all text-sm" href={`mailto:${row.email}`}><Mail className="h-4 w-4 shrink-0 text-primary" />{row.email}</a>}</div>
          <div className="space-y-2 break-words text-sm"><p><span className="font-medium">Vehicle:</span> {row.vehicle || "Not selected"} · {row.duration}</p><p><span className="font-medium">Pickup:</span> {row.pickup || "—"}</p><p><span className="font-medium">Drop:</span> {row.destination || "—"}</p>{(row.pickup_date || row.pickup_time) && <p><span className="font-medium">Travel:</span> {row.pickup_date} {row.pickup_time}</p>}{row.message && <p className="whitespace-pre-wrap border-l-2 border-primary pl-3">{row.message}</p>}</div>
          <label className="text-sm font-medium">Status<select aria-label={`Status for ${row.name}`} value={row.status} disabled={mutation.isPending} onChange={(e) => mutation.mutate({ data: { id: row.id, status: statusSchema.parse(e.target.value) } })} className="mt-2 block w-full rounded-md border bg-card px-3 py-2">{statusSchema.options.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}</select></label>
        </article>)}</div>}
        <div className="mt-6 flex items-center justify-end gap-3"><Button variant="outline" size="icon" aria-label="Previous page" disabled={page === 0} onClick={() => setPage(page - 1)}><ChevronLeft /></Button><span className="text-sm">Page {page + 1} of {Math.max(1, Math.ceil(data.count / 20))}</span><Button variant="outline" size="icon" aria-label="Next page" disabled={(page + 1) * 20 >= data.count} onClick={() => setPage(page + 1)}><ChevronRight /></Button></div>
      </>}
    </main>
  </div>;
}