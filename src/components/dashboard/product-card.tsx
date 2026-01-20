'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Package, ClipboardList } from 'lucide-react';
import { IProduct } from '@/types';
import { ProductsContext } from '@/context/products-context';
import { useContext, useState } from 'react';
import { ProductFormDialog } from './product-form-dialog';
import { AlertConfirmation } from '../alert-confirmation';
import { toast } from '@/hooks/use-toast';
import { deleteImage } from '@/app/actions/cloudinary';

export function ProductCard({ item }: { item: IProduct }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isProduct = 'product';
  const { removeProduct, updateProduct } = useContext(ProductsContext);

  const handleEditProduct = (updatedProduct: IProduct) => {
    updateProduct(updatedProduct);
    setIsDialogOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      if (item.imageUrl) {
        await deleteImage(item.imageUrl);
      }
      await removeProduct(item.uid);
      setIsDeleteDialogOpen(false);
      toast({ title: 'Product deleted successfully.' });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: 'Error deleting product.', variant: 'destructive' });
    }
  };

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
            {isProduct ? <Package className="mr-1 h-3 w-3" /> : <ClipboardList className="mr-1 h-3 w-3" />}
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
            {/* {!isProduct && item.location && <p className="text-sm text-muted-foreground">{item.location}</p>} */}
          </div>
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
      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditProduct}
        product={item}
      />
      <AlertConfirmation
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the product from our servers."
        onConfirm={handleDeleteProduct}
        confirmText="Delete"
      />
    </Card>
  );
}


