import type { Metadata } from 'next';
import { ProductList } from '@/components/dashboard/product-list';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export const metadata: Metadata = {
  title: 'Dashboard | Seller Central',
};

export default async function DashboardPage() {
  
  return (
      <div className="space-y-6">
        <DashboardHeader />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Listings</h1>
          <p className="text-muted-foreground">
            An overview of your products and services on PawsomeMart.
          </p>
        </div>
        <ProductList/>
      </div>
  );
}

