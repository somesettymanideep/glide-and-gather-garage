import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import hero from "@/assets/hero.png.asset.json";

export function PageHero({ title }: { title: string }) {
  return (
    <section className="relative flex h-[300px] items-center justify-center pt-16 md:h-[370px]">
      <img src={hero.url} alt="Car on a riverside road near a temple and bridge" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/70 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      <div className="relative px-4 text-center">
        <h1 className="hero-in font-display text-4xl font-black italic md:text-6xl">
          <span className="text-primary">{title.split(" ")[0]} </span>
          <span className="text-accent">{title.split(" ").slice(1).join(" ")}</span>
        </h1>
        <nav className="hero-in mt-4 flex items-center justify-center gap-2 text-sm font-semibold md:text-base" style={{ animationDelay: ".15s" }} aria-label="Breadcrumb">
          <Link to="/" className="flex items-center gap-1.5 text-foreground transition-colors hover:text-accent">
            <Home className="h-4 w-4" />Home
          </Link>
          <ChevronRight className="h-4 w-4 text-accent" />
          <span className="text-accent">{title}</span>
        </nav>
      </div>
    </section>
  );
}
