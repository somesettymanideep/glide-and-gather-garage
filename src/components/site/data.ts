import white from "@/assets/car-white.jpg";
import suv from "@/assets/car-suv.jpg";
import red from "@/assets/car-red.jpg";
import blue from "@/assets/car-blue.jpg";

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
export type Car = { name: string; type: string; category: Category; seats: number; fuel: string; img: string };

export const CARS: Car[] = [
  { name: "Toyota Etios", type: "Sedan Car", category: "Sedan", seats: 5, fuel: "Petrol", img: white },
  { name: "Honda City", type: "Sedan Car", category: "Sedan", seats: 5, fuel: "Petrol", img: white },
  { name: "Maruti Dzire", type: "Sedan Car", category: "Sedan", seats: 5, fuel: "Petrol", img: blue },
  { name: "Toyota Innova", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", img: suv },
  { name: "Toyota Fortuner", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", img: suv },
  { name: "Hyundai Creta", type: "SUV", category: "SUV", seats: 5, fuel: "Petrol", img: blue },
  { name: "Maruti Swift", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", img: red },
  { name: "Baleno", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", img: blue },
  { name: "Honda Accord", type: "Luxury Car", category: "Luxury", seats: 5, fuel: "Hybrid", img: white },
];
