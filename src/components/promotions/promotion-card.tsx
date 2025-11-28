"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Link as LinkIcon, Sparkles } from 'lucide-react';
import { IPromotion } from '@/types';
import { PromotionsContext } from '@/context/promotions-context';
import { useContext, useState } from 'react';
import { PromotionFormDialog } from './promotion-form-dialog';
import { AlertConfirmation } from '../alert-confirmation';
import { toast } from '@/hooks/use-toast';

export function PromotionCard({ item }: { item: IPromotion }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { removePromotion, updatePromotion } = useContext(PromotionsContext);

  const handleEditPromotion = (updatedPromotion: IPromotion) => {
    updatePromotion(updatedPromotion);
    setIsDialogOpen(false);
  };

  const handleDeletePromotion = () => {
    removePromotion(item.uid);
    setIsDeleteDialogOpen(false);
    toast({ title: 'Promotion deleted successfully.' });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg leading-tight mb-1">{item.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <LinkIcon className="mr-1 h-3 w-3" />
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline truncate max-w-[200px]">
              {item.link}
            </a>
          </div>
          {item.dataAiHint && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              {item.dataAiHint}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center w-full">
          <div />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardFooter>
      <PromotionFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditPromotion}
        promotion={item}
      />
      <AlertConfirmation
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the promotion from our servers."
        onConfirm={handleDeletePromotion}
        confirmText="Delete"
      />
    </Card>
  );
}
