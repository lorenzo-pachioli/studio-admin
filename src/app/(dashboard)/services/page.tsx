import type { Metadata } from 'next';
import { ServiceList } from '@/components/services/service-list';
import { ServicesHeader } from '@/components/services/services-header';

export const metadata: Metadata = {
  title: 'Services | Seller Central',
};

export default async function ServicesPage() {
  
  return (
      <div className="space-y-6">
        <ServicesHeader />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Services</h1>
          <p className="text-muted-foreground">
            Manage your service offerings on PawsomeMart.
           </p>
        </div>
        <ServiceList />
      </div>
  );
}

