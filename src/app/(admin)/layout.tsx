'use client';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { AppSidebar } from './components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarProvider className='bg-background dark:bg-gray-900'>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background dark:bg-gray-900">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumbs />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
