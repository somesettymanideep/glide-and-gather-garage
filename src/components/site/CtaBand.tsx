import type { ReactNode } from "react";
import hero from "@/assets/hero.png";
import car from "@/assets/fleet-innova-crysta.jpg";
import { Reveal } from "./Reveal";

export function CtaBand({ title, children, actions }: { title: ReactNode; children?: ReactNode; actions: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/30 via-brand-deep/75 to-brand-deep/40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 md:grid-cols-[1fr_2fr_auto] md:px-8">
        <Reveal variant="left"><img src={car} alt="" className="mx-auto w-56 rounded-xl mix-blend-multiply md:w-full" loading="lazy" /></Reveal>
        <Reveal><div className="text-center text-primary-foreground md:text-left">
          <h3 className="font-display text-3xl font-black italic md:text-4xl">{title}</h3>
          {children && <p className="mt-1 font-medium">{children}</p>}
        </div></Reveal>
        <Reveal variant="right"><div className="flex flex-wrap justify-center gap-3">{actions}</div></Reveal>
      </div>
    </section>
  );
}
