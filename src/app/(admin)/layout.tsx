'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarMenu from './components/SidebarMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-[260px] border-r border-gray-200 dark:border-gray-700">
        <div className="h-16 flex items-center justify-center font-semibold border-b border-gray-200 dark:border-gray-700">
          Trang quản trị
        </div>
        <ScrollArea className="flex-grow p-4">
          <SidebarMenu />
        </ScrollArea>
      </div>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogOverlay className="fixed inset-0 bg-black/40" />
        <DialogContent className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              Trang quản trị
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <SidebarMenu />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col flex-grow">
        <header className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="ml-4 text-lg font-semibold">
            Quản lý Elysia Wear
          </h1>
        </header>

        <main className="flex-grow p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
