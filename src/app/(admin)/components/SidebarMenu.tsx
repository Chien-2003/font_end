'use client';

import Link from 'next/link';
import { useState } from 'react';
// bạn tùy chỉnh import theo folder

import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Box as BoxIcon,
  Tag,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';

const menuItems = [
  {
    label: 'Bảng điều khiển',
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: '/admin',
  },
  {
    label: 'Đơn hàng',
    icon: <ShoppingCart className="w-5 h-5" />,
    href: '/admin/orders',
  },
  {
    label: 'Tạo bài viết',
    icon: <FileText className="w-5 h-5" />,
    href: '/admin/blog',
  },
];

const productItems = [
  {
    label: 'Tạo sản phẩm',
    icon: <PlusCircle className="w-5 h-5" />,
    href: '/admin/tao-san-pham',
  },
];

export default function SidebarMenu() {
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <ScrollArea className="h-full w-60 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
      <nav className="flex flex-col space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpenProduct(!openProduct)}
          className="w-full flex justify-between items-center px-3"
        >
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5" />
            <span>Sản phẩm</span>
          </div>
          {openProduct ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </Button>

        <Collapsible open={openProduct}>
          <nav className="flex flex-col mt-2 ml-6 space-y-1">
            {productItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.icon}
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </Collapsible>
      </nav>

      <div className="mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Quay lại Web</span>
        </Link>
      </div>
    </ScrollArea>
  );
}
