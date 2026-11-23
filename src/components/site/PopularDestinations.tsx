import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Compass, ArrowRight, ChevronLeft, ChevronRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { WhatsappIcon } from "./BrandIcons";
import { PHONE } from "./data";
import { Reveal } from "./Reveal";

import kanakaDurga from "@/assets/dest-kanaka-durga.jpg";
import prakasamBarrage from "@/assets/dest-prakasam-barrage.jpg";
import undavalliCaves from "@/assets/dest-undavalli-caves.jpg";
import bhavaniIsland from "@/assets/dest-bhavani-island.jpg";
import kondapalliFort from "@/assets/dest-kondapalli-fort.jpg";

export interface Destination {
  id: string;
  name: string;
  category: string;
  image: string;
  distance: string;
  duration: string;
  recommendedPackage: string;
  description: string;
  highlight: string;
}

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: "kanaka-durga",
    name: "Sri Durga Malleswara Swamy Temple",
    category: "Pilgrimage & Heritage",
    image: kanakaDurga,
    distance: "4 km from City Center",
    duration: "15 mins drive",
    recommendedPackage: "4 Hours Package",
    highlight: "Indrakeeladri Hill & Krishna River View",
    description: "Perched atop the scenic Indrakeeladri hillock overlooking the Krishna River, this ancient sacred temple is Vijayawada's crown spiritual destination.",
  },
  {
    id: "prakasam-barrage",
    name: "Prakasam Barrage & Riverfront",
    category: "Scenic Landmark",
    image: prakasamBarrage,
    distance: "3.5 km from City Center",
    duration: "10 mins drive",
    recommendedPackage: "4 Hours Package",
    highlight: "Night Illuminations & River Breeze",
    description: "Extending 1.22 km across the Krishna River, this iconic historic barrage creates a shimmering lake with walking promenades and golden evening lighting.",
  },
  {
    id: "undavalli-caves",
    name: "Undavalli Rock-Cut Caves",
    category: "Ancient Architecture",
    image: undavalliCaves,
    distance: "8 km from City Center",
    duration: "20 mins drive",
    recommendedPackage: "4 Hours / 8 Hours Package",
    highlight: "7th-Century Monolithic Vishnu Sculpture",
    description: "Magnificent 4-story monolithic rock-cut cave temples carved from solid sandstone, surrounded by tranquil countryside and lush palm gardens.",
  },
  {
    id: "bhavani-island",
    name: "Bhavani Island River Resort",
    category: "Boating & Leisure",
    image: bhavaniIsland,
    distance: "6 km from City Center",
    duration: "18 mins drive",
    recommendedPackage: "8 Hours Package",
    highlight: "River Boating & Adventure Water Sports",
    description: "One of the largest river islands in India, situated in the Krishna River waters with speedboat rides, water adventures, manicured gardens, and picnics.",
  },
  {
    id: "kondapalli-fort",
    name: "Historic Kondapalli Fort (Qila)",
    category: "Historic Fortress",
    image: kondapalliFort,
    distance: "24 km from City Center",
    duration: "45 mins drive",
    recommendedPackage: "8 Hours / 12 Hours Package",
    highlight: "Panoramic Hilltops & Heritage Toys Village",
    description: "14th-century hill fortress featuring the grand Gaja Saala (royal elephant stable), panoramic Eastern Ghats valley views, and nearby Kondapalli toy craft.",
  },
];

export function destinationBookingUrl(dest: Destination) {
  const number = PHONE.replace(/\D/g, "");
  const message = `Hello Madhumitha Car Travels, I would like to book a cab to visit ${dest.name} in Vijayawada with the ${dest.recommendedPackage}. Please share car options and rates. My travel date: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function PopularDestinations() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      {/* Header with Title and Nav Buttons */}
      <Reveal className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="hidden h-0.5 w-12 bg-accent sm:block" />
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              <Compass className="h-4 w-4" /> Explore Vijayawada
            </p>
          </div>
          <h2 className="mt-2 font-display text-2xl font-black italic md:text-4xl">
            <span className="text-primary">Popular </span>
            <span className="text-accent">Destinations</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Discover iconic temples, serene river islands, and historic fortresses in and around Vijayawada with our clean, reliable chauffeur-driven fleet.
          </p>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous destination slide"
            onClick={() => api?.scrollPrev()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition-all hover:border-primary hover:bg-brand-soft hover:text-primary active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next destination slide"
            onClick={() => api?.scrollNext()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition-all hover:border-primary hover:bg-brand-soft hover:text-primary active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Reveal>

      {/* Carousel */}
      <Reveal>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {POPULAR_DESTINATIONS.map((dest) => (
              <CarouselItem key={dest.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                  {/* Photo & Overlay Badges */}
                  <div className="relative h-52 w-full overflow-hidden bg-car-photo">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-60" />

                    {/* Category Tag */}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/95 px-3 py-1 text-xs font-bold text-primary-foreground shadow-card backdrop-blur-sm">
                      {dest.category}
                    </span>

                    {/* Distance Pill */}
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow-card backdrop-blur-sm">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {dest.distance}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-primary transition-colors group-hover:text-accent">
                      {dest.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-accent">
                      ★ {dest.highlight}
                    </p>

                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {dest.description}
                    </p>

                    {/* Trip details pill */}
                    <div className="mt-4 rounded-xl border border-border/80 bg-brand-soft/70 p-3 text-xs">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="h-3.5 w-3.5 text-primary" /> Approx: {dest.duration}
                        </span>
                        <span className="font-bold text-primary">
                          {dest.recommendedPackage}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5 pt-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-10 border-primary font-bold text-primary hover:bg-brand-soft hover:text-primary"
                      >
                        <Link to="/cars">
                          <Car className="h-4 w-4" /> View Cars
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        className="h-10 bg-grad-green font-bold text-primary-foreground shadow-card"
                      >
                        <a
                          href={destinationBookingUrl(dest)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <WhatsappIcon className="h-4 w-4" /> Book Cab
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Carousel Dots Indicator */}
        {count > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner with Outstation and Local Tour info */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-deep to-foreground p-5 text-primary-foreground shadow-card md:p-6">
          <div className="max-w-xl">
            <h4 className="font-display text-lg font-bold text-star">
              Planning a Custom Sightseeing Tour or Outstation Trip?
            </h4>
            <p className="mt-1 text-xs text-primary-foreground/90 md:text-sm">
              We provide personalized 4-hour, 8-hour, and 12-hour city packages as well as Amaravati, Mangalagiri, and Kuchipudi tours with zero hidden charges.
            </p>
          </div>
          <Button asChild className="rounded-full bg-grad-red px-6 py-2.5 font-bold text-accent-foreground shadow-card hover:opacity-95">
            <Link to="/contact">
              Plan Custom Trip <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
