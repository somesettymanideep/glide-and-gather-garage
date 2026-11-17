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
export type Car = { code: string; name: string; type: string; category: Category; seats: number; fuel: string; transmission: string; price: number; img: string };

export const CARS: Car[] = [
  { code: "MC100", name: "Maruti Suzuki Swift", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Manual", price: 1500, img: white },
  { code: "MC101", name: "Hyundai i20", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Manual", price: 1800, img: white },
  { code: "MC102", name: "Maruti Baleno", type: "Hatchback", category: "Hatchback", seats: 5, fuel: "Petrol", transmission: "Automatic", price: 2000, img: blue },
  { code: "MC103", name: "Hyundai Creta", type: "SUV", category: "SUV", seats: 5, fuel: "Diesel", transmission: "Manual", price: 2500, img: suv },
  { code: "MC104", name: "Kia Seltos", type: "SUV", category: "SUV", seats: 5, fuel: "Petrol", transmission: "Automatic", price: 2800, img: suv },
  { code: "MC105", name: "Toyota Innova Crysta", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Manual", price: 3500, img: white },
  { code: "MC106", name: "Maruti Ertiga", type: "SUV", category: "SUV", seats: 7, fuel: "Petrol", transmission: "Manual", price: 2500, img: white },
  { code: "MC107", name: "Toyota Fortuner", type: "SUV", category: "SUV", seats: 7, fuel: "Diesel", transmission: "Automatic", price: 5500, img: red },
  { code: "MC108", name: "Mercedes-Benz E-Class", type: "Luxury Car", category: "Luxury", seats: 5, fuel: "Diesel", transmission: "Automatic", price: 8000, img: white },
];
