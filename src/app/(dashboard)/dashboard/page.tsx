import type { Metadata } from 'next';
import { getMockItems } from '@/lib/mock-data';
import { ItemList } from './components/item-list';

export const metadata: Metadata = {
  title: 'Dashboard | Seller Central',
};

// This would typically be a server-side fetch from Firestore.
// For demonstration, we're using mock data.
async function getItems() {
  return getMockItems();
}

export default async function DashboardPage() {
  const items = await getItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Listings</h1>
        <p className="text-muted-foreground">
          An overview of your products and services on PawsomeMart.
        p>
      </div>
      <ItemList initialItems={items} />
    </div>
  );
}
