"use client";

import { useContext } from 'react';
import { PromotionCard } from './promotion-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileQuestion } from 'lucide-react';
import { PromotionsContext } from '@/context/promotions-context';

export function PromotionList() {
  const { promotions } = useContext(PromotionsContext);

  if (promotions.length === 0) {
    return (
      <Alert>
        <FileQuestion className="h-4 w-4" />
        <AlertTitle>No Promotions Found</AlertTitle>
        <AlertDescription>
          You haven't added any promotions yet. Click 'Add Promotion' to get started.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {promotions.map((item) => (
        <PromotionCard key={item.uid} item={item} />
      ))}
    </div>
  );
}
