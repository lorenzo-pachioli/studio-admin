"use client";

import React, { useState, createContext } from "react";
import { IProduct } from "@/types";
import { removeData, setData } from "@/services/operations";

export const ProductsContext = createContext<{
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;  
  addProduct: (product: IProduct) => void;
  updateProduct: (product: IProduct) => void;
  removeProduct: (id: string) => Promise<void>;
  useProductById: (id: string) => IProduct | undefined;
}>({
  products: [],
  setProducts: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => Promise.resolve(),
  useProductById: () => undefined,
});

export default function ProductsProvider({ children, initialProducts }: any) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const collection = "products";

  const addProduct = (product: IProduct) => {
    setData(collection, product.uid, product);
    setProducts([...products, product]);
  };

  const updateProduct = (product: IProduct) => {
    setData(collection, product.uid, product);
    setProducts(products.map((p) => p.uid === product.uid ? product : p));
  };

  const removeProduct = async (id: string) =>{
    await removeData(collection, id);
    setProducts(products.filter((p) => p.uid !== id));
  };

  const useProductById = (id: string): IProduct|undefined => {
    const product = products.find((p) => {
      if (p.uid == id) return p;
    });
    return product;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        removeProduct,
        useProductById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}


