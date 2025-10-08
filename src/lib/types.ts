export interface Product {
  uid: string;
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
  uid: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  location?: string;
  contact?: string;
  rating?: number;
  dataAiHint?: string;
}

export type Item = (Product & { itemType: 'product' }) | (Service & { itemType: 'service' });
