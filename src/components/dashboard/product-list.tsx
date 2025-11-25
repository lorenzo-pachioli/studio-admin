'use client';

import { useContext, useEffect } from 'react';
import { ProductCard } from './product-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileQuestion } from 'lucide-react';
import { ProductsContext } from '@/context/products-context';
import { IProduct } from '@/types';

export function ProductList() {
  const {products} = useContext(ProductsContext);

  if (products.length === 0) {
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
      {products.map((item) => (
        <ProductCard key={item.uid} item={item} />
      ))}
    </div>
  );
}
