import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/reset-password")({ head: () => pageMeta("Reset admin password", "Set a new password for your Madhumitha Car Travels account."), component: ResetPassword });
function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    if (!recovery) { setFeedback("Open the password reset link from your email."); return; }
    void supabase.auth.getUser().then(({ data }) => { setReady(Boolean(data.user)); if (!data.user) setFeedback("This reset link has expired. Request another one."); });
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== form.get("confirm")) { setFeedback("Passwords do not match."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setFeedback(error ? error.message : "Password updated. You can now sign in.");
    if (!error) setReady(false);
    setBusy(false);
  }
  return <main className="flex min-h-screen items-center justify-center bg-brand-soft px-4"><div className="w-full max-w-md rounded-lg border bg-card p-7 shadow-card"><h1 className="font-display text-2xl font-bold text-primary">Reset password</h1>{ready && <form className="mt-6 space-y-4" onSubmit={submit}><label className="block space-y-2">New password<Input name="password" type="password" required minLength={8} autoComplete="new-password" /></label><label className="block space-y-2">Confirm password<Input name="confirm" type="password" required minLength={8} autoComplete="new-password" /></label><Button type="submit" disabled={busy} className="w-full">{busy ? "Saving…" : "Save password"}</Button></form>}{feedback && <p className="mt-4 text-sm" role="status">{feedback}</p>}<Button asChild variant="link" className="mt-4"><Link to="/auth">Back to sign in</Link></Button></div></main>;
}