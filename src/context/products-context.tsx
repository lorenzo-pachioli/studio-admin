"use client";

import React, { useState, createContext } from "react";
import { IProduct } from "@/types";
import { getCollections } from "@/services/operations";

export const ProductsContext = createContext<{
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  useProductById: (id: string) => IProduct | undefined;
}>({
  products: [],
  setProducts: () => {},
  useProductById: () => undefined,
});

export default function ProductsProvider({ children }: any) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const useProductById = (id: string): IProduct|undefined => {
    const product = products.find((product) => {
      if (product.uid == id) return product;
    });
    return product;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        useProductById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

