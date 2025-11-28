import { IAdmin } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const userModeler = (user?: any): IAdmin => {
  if (!user) return {
    displayName: "",
    photoURL: "",
    addresses: [],
    email: "",
    emailVerified: false,
    products_categories: [],
    services_categories: []
  };

  return {
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    email: user.email || "",
    emailVerified: user.emailVerified || false,
    addresses: user.addresses || [],
    products_categories: user.products_categories || [],
    services_categories: user.services_categories || []
  }
}