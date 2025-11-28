"use client";

import React, { useState, createContext } from "react";
import { IPromotion } from "@/types";
import { removeData, setData } from "@/services/operations";

export const PromotionsContext = createContext<{
  promotions: IPromotion[];
  setPromotions: React.Dispatch<React.SetStateAction<IPromotion[]>>;
  addPromotion: (promotion: IPromotion) => void;
  updatePromotion: (promotion: IPromotion) => void;
  removePromotion: (id: string) => void;
  usePromotionById: (id: string) => IPromotion | undefined;
}>({
  promotions: [],
  setPromotions: () => {},
  addPromotion: () => {},
  updatePromotion: () => {},
  removePromotion: () => {},
  usePromotionById: () => undefined,
});

export default function PromotionsProvider({ children, initialPromotions }: any) {
  const [promotions, setPromotions] = useState<IPromotion[]>(initialPromotions);
  const collection = "promotions";

  const addPromotion = (promotion: IPromotion) => {
    setData(collection, promotion.uid, promotion);
    setPromotions((prevPromotions) => [...prevPromotions, promotion]);
  };

  const updatePromotion = (promotion: IPromotion) => {
    setData(collection, promotion.uid, promotion);
    setPromotions((prevPromotions) =>
      prevPromotions.map((p) => (p.uid === promotion.uid ? promotion : p))
    );
  };

  const removePromotion = (id: string) => {
    removeData(collection, id);
    setPromotions((prevPromotions) => prevPromotions.filter((p) => p.uid !== id));
  };

  const usePromotionById = (id: string): IPromotion | undefined => {
    const promotion = promotions.find((promotion) => {
      if (promotion.uid == id) return promotion;
    });
    return promotion;
  };

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        setPromotions,
        addPromotion,
        updatePromotion,
        removePromotion,
        usePromotionById,
      }}
    >
      {children}
    </PromotionsContext.Provider>
  );
}
