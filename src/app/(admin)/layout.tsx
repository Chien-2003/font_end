import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { ModeToggle } from '@/components/views/ModeToggle';
import { Fragment, Suspense } from 'react';
import { AppSidebar } from './components/app-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background dark:bg-gray">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background dark:bg-gray">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs />
          <ModeToggle />
        </header>
        <Suspense fallback={<div></div>}>
          <Fragment>{children}</Fragment>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
