'use client';

import { useContext } from 'react';
import { ProductsContext } from '../context/products-context';

export const useProduct = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
