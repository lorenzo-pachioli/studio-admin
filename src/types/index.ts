import { JWTPayload } from "jose";

export interface IAdmin {
  displayName: string | null;
  photoURL: string | null;
  addresses: IAddress[];
  email: string | null;
  emailVerified: boolean;
}

export interface IAddress {
  uid: string;
  type: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean
  addressLine2: string;
}

export interface Product {
  uid: string; // Firebase document ID
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating?: number;
  stock?: number;
  brand?: string;
  tags?: string[];
  dataAiHint?: string;
}

export interface Service {
  uid: string; // Firebase document ID
  name: string;
  description: string;
  category: string; // e.g., Vet, Grooming, Training
  imageUrl: string;
  location?: string;
  contact?: string; // Phone or email
  rating?: number;
  dataAiHint?: string;
}

export interface Promotion {
  uid: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string; // Link to product, category, or page
  dataAiHint?: string;
}

export interface IOrders {
  uid: string; // Unique identifier for the order
  user_id: string; // ID of the user who placed the order
  items: ICartItem[]; // List of items in the order
  quantity: number; // Total quantity of items in the order
  created_at: Date; // Timestamp of when the order was created
  total: number; // Total price of the order
  status: "pending" | "completed" | "canceled"; // Order status
  meli_id?: number; // MercadoPago payment ID
}

export interface ICartItem {
  product_id: string; // ID of the product
  product: string; // Name of the product
  quantity: number; // Quantity of the product in the cart
  price: number; // Price of the product
};

