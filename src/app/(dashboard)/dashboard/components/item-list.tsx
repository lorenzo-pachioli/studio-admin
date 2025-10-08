'use client';

import { useState } from 'react';
import { Item } from '@/lib/types';
import { ItemCard } from './item-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileQuestion } from 'lucide-react';

export function ItemList({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);

  if (items.length === 0) {
    return (
      <Alert>
        <FileQuestion className="h-4 w-4" />
        <AlertTitle>No Listings Found</AlertTitle>
        <AlertDescription>
          You haven't added any products or services yet. Click 'Add Item' to get started.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.uid} item={item} />
      ))}
    </div>
  );
}
