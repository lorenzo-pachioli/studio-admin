"use client";

import { useContext } from 'react';
import { ServiceCard } from '../services/service-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileQuestion } from 'lucide-react';
import { ServicesContext } from '@/context/services-context';

export function ServiceList() {
  const { services } = useContext(ServicesContext);

  if (services.length === 0) {
    return (
      <Alert>
        <FileQuestion className="h-4 w-4" />
        <AlertTitle>No Services Found</AlertTitle>
        <AlertDescription>
          You haven't added any services yet. Click 'Add Service' to get started.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((item) => (
        <ServiceCard key={item.uid} item={item} />
      ))}
    </div>
  );
}
