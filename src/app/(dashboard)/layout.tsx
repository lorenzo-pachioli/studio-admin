import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
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
            <main className="p-4 md:p-6 lg:p-8">
              {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
