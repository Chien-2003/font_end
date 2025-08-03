'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({
  description,
}: ProductTabsProps) {
  return (
    <Tabs
      defaultValue="description"
      className="mt-10 w-full justify-center items-center"
    >
      <TabsList className="text-foreground h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
        <TabsTrigger
          value="description"
          className="hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
        >
          MÔ TẢ SẢN PHẨM
        </TabsTrigger>
        <TabsTrigger
          value="policy"
          className="hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
        >
          CHÍNH SÁCH ĐỔI HÀNG
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <p className="text-foreground p-4 whitespace-pre-line text-sm leading-9">
          {description}
        </p>
      </TabsContent>

      <TabsContent value="policy">
        <div className="text-foreground p-4 text-sm leading-relaxed space-y-2"></div>
      </TabsContent>
    </Tabs>
  );
}
