"use client";
import { useState, useContext } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { PromotionFormDialog } from './promotion-form-dialog';
import { PromotionsContext } from '@/context/promotions-context';
import { IPromotion } from '@/types';

export function PromotionsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addPromotion } = useContext(PromotionsContext);

  const handleAddPromotion = (newPromotion: IPromotion) => {
    addPromotion(newPromotion);
    setIsDialogOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <SidebarTrigger className="sm:hidden" />
      <div className="hidden sm:block">
        <Logo />
      </div>
      <div className="flex-1" />
      <Button 
        size="sm" 
        className="h-8 gap-1 bg-accent hover:bg-accent/90 text-accent-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Promotion
        </span>
      </Button>
      <PromotionFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSubmit={handleAddPromotion} 
      />
      <UserNav />
    </header>
  );
}
