import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Car, ChevronRight, Fuel, Settings, Snowflake, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { WhatsappIcon } from "@/components/site/BrandIcons";
import { carBookingUrl, getCar } from "@/components/site/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cars_/$carId")({
  beforeLoad: ({ params }) => {
    if (!getCar(params.carId)) throw notFound();
  },
  head: ({ params }) => {
    const car = getCar(params.carId);
    const loaderData = car ? { car } : undefined;
    const title = loaderData ? `${loaderData.car.name} | Madhumitha Car Travels` : "Car unavailable | Madhumitha Car Travels";
    const description = loaderData ? `Explore ${loaderData.car.name}: ${loaderData.car.seats} seats, ${loaderData.car.fuel}, ${loaderData.car.transmission} and air conditioning. Enquire about daily rentals in Vijayawada on WhatsApp.` : "Explore the fleet at Madhumitha Car Travels.";
    const url = loaderData ? `https://glide-and-gather-garage.lovable.app/cars/${loaderData.car.code}` : undefined;
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, ...(url ? [{ property: "og:url", content: url }] : [{ name: "robots", content: "noindex" }])],
      links: url ? [{ rel: "canonical", href: url }] : [],
    };
  },
  component: CarDetails,
  notFoundComponent: () => <CarUnavailable />,
  errorComponent: ({ reset }) => <CarUnavailable retry={reset} />,
});

function CarUnavailable({ retry }: { retry?: () => void }) {
  return <><SiteHeader /><main className="mx-auto min-h-[60vh] max-w-7xl px-4 pb-16 pt-36"><h1 className="font-display text-3xl font-bold text-primary">Car unavailable</h1><div className="mt-6 flex gap-3"><Button asChild><Link to="/cars"><ArrowLeft />Our Cars</Link></Button>{retry && <Button onClick={retry} variant="outline">Try again</Button>}</div></main><SiteFooter /></>;
}

function CarDetails() {
  const { carId } = Route.useParams();
  const car = getCar(carId);
  if (!car) return <CarUnavailable />;
  const specs = [
    { label: "Vehicle type", value: car.type, Icon: Car },
    { label: "Seating capacity", value: `${car.seats} seats`, Icon: Users },
    { label: "Fuel type", value: car.fuel, Icon: Fuel },
    { label: "Transmission", value: car.transmission, Icon: Settings },
    { label: "Air conditioning", value: "AC", Icon: Snowflake },
    { label: "Car code", value: car.code, Icon: Car },
  ];
  return (
    <div className="overflow-x-hidden">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium"><Link to="/">Home</Link><ChevronRight className="h-4 w-4 text-accent" /><Link to="/cars">Our Cars</Link><ChevronRight className="h-4 w-4 text-accent" /><span className="text-primary">{car.name}</span></nav>
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <Reveal>
            <div className="overflow-hidden rounded-lg bg-muted"><img src={car.img} alt={car.name} width={1536} height={512} className="aspect-[3/1] w-full object-contain" /></div>
            <p className="mt-2 text-xs text-muted-foreground">Model illustration; actual vehicle colour and variant may differ.</p>
            <h2 className="mt-8 border-b border-accent pb-3 font-display text-xl font-bold text-primary">Vehicle Specifications</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              {specs.map(({ label, value, Icon }) => <div key={label} className="flex items-center gap-3 border-b py-5"><Icon className="h-5 w-5 shrink-0 text-primary" /><div><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div></div>)}
            </dl>
          </Reveal>
          <Reveal variant="right">
            <p className="text-sm font-semibold text-accent">{car.code} · {car.type}</p>
            <h1 className="mt-3 font-display text-3xl font-black italic text-primary md:text-4xl">{car.name}</h1>
            <p className="mt-4 text-muted-foreground">{car.seats}-seater {car.type.toLowerCase()} with {car.transmission.toLowerCase()} transmission, {car.fuel.toLowerCase()} fuel and air conditioning.</p>
            <div className="my-7 border-y py-6"><p className="text-sm font-semibold">Daily rate</p><p className="mt-2 font-display text-3xl font-black text-primary">₹{car.price.toLocaleString("en-IN")} <span className="text-base font-medium text-foreground">/ day</span></p><p className="mt-2 text-sm text-muted-foreground">Indicative rate from the reference. Final price and availability confirmed on WhatsApp.</p></div>
            <Button asChild size="lg" className="h-auto w-full whitespace-normal bg-grad-green py-4 text-base font-bold"><a href={carBookingUrl(car)} target="_blank" rel="noopener noreferrer"><WhatsappIcon />Book on WhatsApp</a></Button>
            <Button asChild variant="link" className="mt-4 px-0"><Link to="/cars"><ArrowLeft />Back to Our Cars</Link></Button>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}