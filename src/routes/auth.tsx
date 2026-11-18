import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/auth")({ head: () => pageMeta("Admin sign in", "Secure sign in to the Madhumitha Car Travels enquiry inbox."), component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setBusy(true); setFeedback("");
    try {
      if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setFeedback("Check your email for a password reset link.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
        if (error) throw error;
        if (data.session) await navigate({ to: "/admin" });
        else setFeedback("Check your email to confirm your account, then sign in here.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await navigate({ to: "/admin" });
      }
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to sign in. Please try again."); }
    finally { setBusy(false); }
  }
  async function social(provider: "google") {
    setBusy(true); setFeedback("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
      if (!result.redirected) await navigate({ to: "/admin" });
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-brand-soft px-4 py-12">
    <div className="w-full max-w-md rounded-lg border bg-card p-7 shadow-card">
      <Link to="/" className="font-display text-lg font-bold italic text-primary">Madhumitha <span className="text-accent">Car Travels</span></Link>
      <LockKeyhole className="mb-3 mt-8 h-8 w-8 text-primary" />
      <h1 className="font-display text-2xl font-bold text-primary">{mode === "signin" ? "Admin sign in" : mode === "signup" ? "Create your account" : "Reset password"}</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm font-medium">Email address<Input name="email" type="email" required autoComplete="email" /></label>
        {mode !== "reset" && <label className="block space-y-2 text-sm font-medium">Password<Input name="password" type="password" required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} /></label>}
        <Button className="w-full" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}</Button>
      </form>
      {feedback && <p role="status" className="mt-4 break-words text-sm text-accent">{feedback}</p>}
      <div className="mt-3 flex flex-wrap justify-between gap-2">
        <Button variant="link" className="px-0" onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setFeedback(""); }}>{mode === "signup" ? "Back to sign in" : "Create account"}</Button>
        <Button variant="link" className="px-0" onClick={() => { setMode(mode === "reset" ? "signin" : "reset"); setFeedback(""); }}>{mode === "reset" ? "Back to sign in" : "Forgot password?"}</Button>
      </div>
      <div className="my-5 border-t" />
      <div className="space-y-3">
        <Button variant="outline" disabled={busy} className="w-full" onClick={() => social("google")}><GoogleMark />Continue with Google</Button>
        <Button asChild variant="link" className="w-full"><Link to="/admin">Open admin inbox</Link></Button>
      </div>
    </div>
  </main>;
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" /><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" /><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" /></svg>;
}