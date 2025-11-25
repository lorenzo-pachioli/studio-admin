"use client";

import React, { useState, createContext } from "react";
import { IService } from "@/types";
import { removeData, setData } from "@/services/operations";

export const ServicesContext = createContext<{
  services: IService[];
  setServices: React.Dispatch<React.SetStateAction<IService[]>>;
  addService: (service: IService) => void;
  updateService: (service: IService) => void;
  removeService: (id: string) => void;
  useServiceById: (id: string) => IService | undefined;
}>({
  services: [],
  setServices: () => {},
  addService: () => {},
  updateService: () => {},
  removeService: () => {},
  useServiceById: () => undefined,
});

export default function ServicesProvider({ children, initialServices }: any) {
  const [services, setServices] = useState<IService[]>(initialServices);
  const collection = "services";

  const addService = (service: IService) => {
    setData(collection, service.uid, service);
    setServices((prevServices) => [...prevServices, service]);
  };

  const updateService = (service: IService) => {
    setData(collection, service.uid, service);
    setServices((prevServices) =>
      prevServices.map((s) => (s.uid === service.uid ? service : s))
    );
  };

  const removeService = (id: string) => {
    removeData(collection, id);
    setServices((prevServices) => prevServices.filter((s) => s.uid !== id));
  };

  const useServiceById = (id: string): IService | undefined => {
    const service = services.find((service) => {
      if (service.uid == id) return service;
    });
    return service;
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        setServices,
        addService,
        updateService,
        removeService,
        useServiceById,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
