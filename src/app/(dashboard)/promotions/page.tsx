import type { Metadata } from 'next';
import { PromotionList } from '@/components/promotions/promotion-list';
import { PromotionsHeader } from '@/components/promotions/promotions-header';

export const metadata: Metadata = {
  title: 'Promotions | Seller Central',
};

export default async function PromotionsPage() {
  
  return (
      <div className="space-y-6">
        <PromotionsHeader />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Promotions</h1>
          <p className="text-muted-foreground">
            Manage your promotions and special offers on PawsomeMart.
           </p>
        </div>
        <PromotionList />
      </div>
  );
}
