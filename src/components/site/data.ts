import innova from "@/assets/fleet-innova-crysta.jpg";
import innovaFront from "@/assets/fleet-innova-crysta-front.jpg";
import carens from "@/assets/fleet-carens.jpg";
import carensFront from "@/assets/fleet-carens-front.jpg";
import ebella from "@/assets/fleet-urban-cruiser-ebella.jpg";
import ebellaFront from "@/assets/fleet-urban-cruiser-ebella-front.jpg";
import dzire from "@/assets/fleet-swift-dzire.jpg";
import dzireFront from "@/assets/fleet-swift-dzire-front.jpg";
import urbania from "@/assets/fleet-force-urbania.jpg";

export const PHONE = "+91 7981872730";
export const PHONE_LINK = "tel:+917981872730";
export const EMAIL = "madhumithamunnangi14@gmail.com";
export const ADDRESS = [
  "Sector 01, Road No. 05, Plot No. 41,",
  "Lotus Landmark, Near Model Dairy,",
  "Ayodhya Nagar, Vijayawada,",
  "Krishna District, Andhra Pradesh – 520003",
];

export type Category = "Sedan" | "SUV" | "Hatchback" | "Luxury";
export const RENTAL_HOURS = [4, 8, 12] as const;
export type RentalHours = (typeof RENTAL_HOURS)[number];
export type Car = {
  code: string;
  name: string;
  type: string;
  category: Category;
  seats: number;
  fuel: string;
  transmission: string;
  price: number;
  hourlyRates?: Partial<Record<RentalHours, number>>;
  img: string;
  gallery?: string[];
  isRealFleet?: boolean;
};

export const CARS: Car[] = [
  { code: "MC105", name: "Toyota Innova", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Manual", price: 3500, hourlyRates: { 4: 2500, 8: 3500, 12: 4000 }, img: innova, gallery: [innova, innovaFront], isRealFleet: true },
  { code: "MC109", name: "Kia Carens", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Manual", price: 3500, hourlyRates: { 4: 2000, 8: 3500, 12: 4000 }, img: carens, gallery: [carens, carensFront], isRealFleet: true },
  { code: "MC110", name: "Toyota Urban Cruiser Ebella EV", type: "Electric SUV", category: "SUV", seats: 5, fuel: "Electric (EV)", transmission: "Automatic", price: 2800, hourlyRates: { 4: 2000, 8: 3000, 12: 3500 }, img: ebella, gallery: [ebella, ebellaFront], isRealFleet: true },
  { code: "MC111", name: "Maruti Suzuki Swift Dzire", type: "Sedan", category: "Sedan", seats: 5, fuel: "Petrol", transmission: "Manual", price: 2400, hourlyRates: { 4: 1500, 8: 2400, 12: 3500 }, img: dzire, gallery: [dzire, dzireFront], isRealFleet: true },
   { code: "MC112", name: "Force Urbania", type: "Luxury Van", category: "Luxury", seats: 13, fuel: "Diesel", transmission: "Manual", price: 5500, img: urbania, gallery: [urbania], isRealFleet: true },
];

export function getCar(code: string) {
  return CARS.find((car) => car.code === code);
}

export function getRentalRate(car: Car, hours: RentalHours) {
  return car.hourlyRates?.[hours];
}

export function carBookingUrl(car: Car, hours?: RentalHours) {
  const number = PHONE.replace(/\D/g, "");
  const rate = hours ? getRentalRate(car, hours) : undefined;
  const packageText = hours ? ` for ${hours} hours${rate === undefined ? "" : ` at ₹${rate.toLocaleString("en-IN")}`}` : "";
  const message = `Hello Madhumitha Car Travels, I would like to book the ${car.name} (${car.code})${packageText}. Please confirm availability and the final rate. My travel date: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
