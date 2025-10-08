'use client';

import Image from 'next/image';
import { Item } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Package, ClipboardList } from 'lucide-react';

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const isProduct = item.itemType === 'product';

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
            <Badge variant={isProduct ? 'secondary' : 'outline'}>
                {isProduct ? <Package className="mr-1 h-3 w-3"/> : <ClipboardList className="mr-1 h-3 w-3"/>}
                {item.category}
            </Badge>
            {isProduct && item.stock !== undefined && (
                <Badge variant={item.stock > 0 ? 'default' : 'destructive'} className={item.stock > 0 ? 'bg-green-100 text-green-800' : ''}>
                {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                </Badge>
            )}
        </div>
        <CardTitle className="text-lg leading-tight mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center w-full">
            <div>
                {isProduct && <p className="text-lg font-bold">${item.price.toFixed(2)}</p>}
                {!isProduct && item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
