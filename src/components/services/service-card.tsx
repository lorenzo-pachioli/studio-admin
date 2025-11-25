"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, ClipboardList, MapPin, Phone } from 'lucide-react';
import { IService } from '@/types';
import { ServicesContext } from '@/context/services-context';
import { useContext, useState } from 'react';
import { ServiceFormDialog } from './service-form-dialog';
import { AlertConfirmation } from '../alert-confirmation';
import { toast } from '@/hooks/use-toast';

export function ServiceCard({ item }: { item: IService }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { removeService, updateService } = useContext(ServicesContext);

  const handleEditService = (updatedService: IService) => {
    updateService(updatedService);
    setIsDialogOpen(false);
  };

  const handleDeleteService = () => {
    removeService(item.uid);
    setIsDeleteDialogOpen(false);
    toast({ title: 'Service deleted successfully.' });
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
          <Badge variant="outline">
            <ClipboardList className="mr-1 h-3 w-3" />
            {item.category}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
        <div className="mt-2 space-y-1">
          {item.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {item.location}
            </div>
          )}
          {item.contact && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="mr-1 h-3 w-3" />
              {item.contact}
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
      <ServiceFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleEditService}
        service={item}
      />
      <AlertConfirmation
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the service from our servers."
        onConfirm={handleDeleteService}
        confirmText="Delete"
      />
    </Card>
  );
}
