import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADDRESS, PHONE, PHONE_LINK } from "./data";
import { Reveal } from "./Reveal";

export function LocalSignals() {
  return (
    <section id="location" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 md:px-8">
      <Reveal className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
          <h2 className="font-display text-2xl font-black italic md:text-3xl">
            <span className="text-primary">Visit Our Office & </span>
            <span className="text-accent">Local Service Hub</span>
          </h2>
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Proudly based in Ayodhya Nagar, Vijayawada — Serving passengers 24 hours a day, 7 days a week.
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left: Location & Local Business Info */}
        <Reveal variant="left" className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
            <h3 className="font-display text-xl font-bold text-primary md:text-2xl">
              Madhumitha Car Travels — Vijayawada
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Official operating hub for chauffeur-driven local rentals, airport taxi transfers, and outstation trips across Andhra Pradesh and Telangana.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-foreground">Registered Office Address:</span>
                  <div className="text-muted-foreground">
                    {ADDRESS.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-foreground">24/7 Booking Hotline: </span>
                  <a href={PHONE_LINK} className="font-bold text-primary hover:underline">
                    {PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-foreground">Operating Hours: </span>
                  <span className="text-muted-foreground">Open 24 Hours / 7 Days a Week</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-foreground">Service Coverage: </span>
                  <span className="text-muted-foreground">
                    Vijayawada, Gannavaram Airport (VGA), Guntur, Amaravati, Mangalagiri, Tenali, and all Outstation AP/Telangana routes.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-full bg-grad-green px-6 font-semibold text-primary-foreground shadow-card hover:opacity-95"
              >
                <a
                  href="https://maps.google.com/?q=Ayodhya+Nagar+Vijayawada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  Get Google Maps Directions
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary font-semibold text-primary hover:bg-brand-soft"
              >
                <a href={PHONE_LINK}>Call Us Now</a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Right: Embedded Interactive Map */}
        <Reveal variant="right" className="overflow-hidden rounded-2xl border bg-card shadow-card">
          <div className="relative h-96 w-full">
            <iframe
              title="Madhumitha Car Travels Location Map"
              src="https://www.google.com/maps?q=Lotus+Landmark+Ayodhya+Nagar+Vijayawada&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur">
              Ayodhya Nagar, Vijayawada 520003
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
