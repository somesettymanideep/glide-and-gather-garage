import swift from "@/assets/fleet-swift.jpg";
import i20 from "@/assets/fleet-i20.jpg";
import baleno from "@/assets/fleet-baleno.jpg";
import creta from "@/assets/fleet-creta.jpg";
import seltos from "@/assets/fleet-seltos.jpg";
import innova from "@/assets/fleet-innova-crysta.jpg";
import ertiga from "@/assets/fleet-ertiga.jpg";
import fortuner from "@/assets/fleet-fortuner.jpg";
import eclass from "@/assets/fleet-e-class.jpg";

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
export type Car = { code: string; name: string; type: string; category: Category; seats: number; fuel: string; transmission: string; price: number; img: string };

export const CARS: Car[] = [
  { code: "MC100", name: "Maruti Suzuki Swift", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Manual", price: 1500, img: swift },
  { code: "MC101", name: "Hyundai i20", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Manual", price: 1800, img: i20 },
  { code: "MC102", name: "Maruti Baleno", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Automatic", price: 2000, img: baleno },
  { code: "MC103", name: "Hyundai Creta", type: "SUV", category: "SUV", seats: 5, fuel: "Diesel", transmission: "Manual", price: 2500, img: creta },
  { code: "MC104", name: "Kia Seltos", type: "SUV", category: "SUV", seats: 5, fuel: "Petrol", transmission: "Automatic", price: 2800, img: seltos },
  { code: "MC105", name: "Toyota Innova Crysta", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Manual", price: 3500, img: innova },
  { code: "MC106", name: "Maruti Ertiga", type: "SUV", category: "SUV", seats: 7, fuel: "Petrol", transmission: "Manual", price: 2500, img: ertiga },
  { code: "MC107", name: "Toyota Fortuner", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Automatic", price: 5500, img: fortuner },
  { code: "MC108", name: "Mercedes-Benz E-Class", type: "Luxury Car", category: "Luxury", seats: 5, fuel: "Diesel", transmission: "Automatic", price: 8000, img: eclass },
];

export function getCar(code: string) {
  return CARS.find((car) => car.code === code);
}

export function carBookingUrl(car: Car) {
  const number = PHONE.replace(/\D/g, "");
  const message = `Hello Madhumitha Car Travels, I would like to book the ${car.name} (${car.code}). Please confirm availability and the final daily rate. My travel date: `;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
