import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { ModeToggle } from '@/components/shared/ModeToggle';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Fragment } from 'react';
import { AppSidebar } from './components/app-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background dark:bg-gray-900">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background dark:bg-gray-900">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs />
          <ModeToggle />
        </header>
        <Fragment>{children}</Fragment>
      </SidebarInset>
    </SidebarProvider>
  );
}
