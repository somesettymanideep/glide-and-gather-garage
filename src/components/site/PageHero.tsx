import type { ReactNode } from "react";
import hero from "@/assets/hero.png.asset.json";

export function PageHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative min-h-[460px] pt-28 md:min-h-[480px]">
      <img src={hero.url} alt="Car on a riverside road near a temple and bridge" className="absolute inset-0 h-full w-full object-cover object-right" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/40" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8">{children}</div>
    </section>
  );
}
