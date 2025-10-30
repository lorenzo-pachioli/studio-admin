'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardHeader } from './components/dashboard-header';
import { SidebarNav } from './components/sidebar-nav';
import { Skeleton } from '@/components/ui/skeleton';
import { UserContext } from '@/context/user-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
/*   const router = useRouter();

  const {isAuthenticated} = useContext(UserContext);

   if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  } */
 
  return (
    <SidebarProvider>
        <Sidebar className="bg-background border-r">
            <SidebarNav />
        </Sidebar>
        <SidebarInset>
            <DashboardHeader />
            <main className="p-4 md:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
