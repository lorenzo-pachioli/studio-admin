import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardHeader } from '../../components/dashboard/dashboard-header';
import { SidebarNav } from '../../components/dashboard/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
