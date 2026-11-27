import { HelpCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "Which is the best car travels in Vijayawada for local and outstation trips?",
    a: "Madhumitha Car Travels is one of the most trusted and top-rated car rental services in Vijayawada. Based in Ayodhya Nagar, we operate a premium fleet of well-maintained sedans (Swift Dzire), 7-seater SUVs (Toyota Innova, Innova Crysta, Kia Carens), and luxury vans (Force Urbania) with experienced, polite chauffeurs for local hourly rentals, airport transfers, and outstation trips across Andhra Pradesh and Telangana.",
  },
  {
    q: "What hourly car rental packages are available in Vijayawada?",
    a: "We offer convenient 4-Hour, 8-Hour, and 12-Hour city packages for personal errands, business meetings, family shopping, and local sightseeing. Starting prices begin at ₹1,500 for Swift Dzire (4 hrs), ₹2,000 for Kia Carens and Urban Cruiser EV (4 hrs), and ₹2,500 for Toyota Innova & Innova Crysta (4 hrs). Extra hours and kilometers are clearly documented with no hidden costs.",
  },
  {
    q: "What is included in the taxi fare? Are there any hidden charges?",
    a: "We maintain 100% price transparency. Our quoted starting fares include the vehicle rental, fuel charges, and the chauffeur allowance. Toll gate fees, parking tickets, and interstate border entry permits (when travelling outside Andhra Pradesh) are charged at actuals. You never pay unexpected booking fees or surge pricing.",
  },
  {
    q: "Do you offer Vijayawada (Gannavaram - VGA) airport pickup and drop services?",
    a: "Yes! We provide 24/7 punctual airport pickup and drop taxi services between Gannavaram Airport (VGA) and all parts of Vijayawada, Guntur, and surrounding areas. Our drivers monitor flight arrival schedules to guarantee timely pickup, even in case of delays, and assist with your luggage.",
  },
  {
    q: "Which outstation taxi routes do you operate from Vijayawada?",
    a: "Our popular outstation routes include Vijayawada to Hyderabad (starting at ₹5,500 for sedans), Rajahmundry (₹3,500), Bhimavaram (₹3,500), Kakinada (₹5,500), Visakhapatnam (₹7,500), Eluru (₹1,800), Machilipatnam (₹2,000), Palakollu (₹4,000), and Narsapuram (₹4,500). Both one-way drops and round-trip packages are available with custom itineraries.",
  },
  {
    q: "How can I book a cab with Madhumitha Car Travels?",
    a: "Booking is instant! Click any 'Book Now' button to connect directly with us on WhatsApp at +91 7981872730, call our 24/7 hotline directly, or fill out the booking enquiry form on our website. We provide instant availability confirmations and driver details.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 md:px-8">
      <Reveal className="mb-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-green text-primary-foreground shadow-card">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
          <h2 className="font-display text-2xl font-black italic md:text-3xl">
            <span className="text-primary">Frequently Asked </span>
            <span className="text-accent">Questions</span>
          </h2>
          <span className="hidden h-0.5 w-20 bg-accent sm:block" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Everything you need to know about booking car rentals and taxis in Vijayawada.
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/80 px-4 transition-colors data-[state=open]:border-accent/60 data-[state=open]:bg-brand-soft/40"
              >
                <AccordionTrigger className="py-4 text-left font-display text-base font-bold text-foreground hover:no-underline md:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </section>
  );
}
