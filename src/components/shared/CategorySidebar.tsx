'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  useSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';
import type { Category } from '@/lib/categoryApi';

interface AppSidebarProps {
  category: Category;
}

export function AppSidebar({ category }: AppSidebarProps) {
  const subcategories = category.subcategories || [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentSubSlug = searchParams.get('sub');

  const handleChange = (value: string) => {
    const newSearchParams = new URLSearchParams(
      searchParams?.toString() ?? '',
    );

    if (value) newSearchParams.set('sub', value);
    else newSearchParams.delete('sub');

    newSearchParams.set('page', '1');

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2">
            Bộ lọc
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <RadioGroup
              value={currentSubSlug ?? ''}
              onValueChange={handleChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center flex-wrap space-x-2">
                <RadioGroupItem value="" id="all" />
                <Label htmlFor="all" className="ml-2">
                  Tất cả
                </Label>
              </div>
              {subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center flex-wrap space-x-2"
                >
                  <RadioGroupItem value={sub.slug} id={sub.slug} />
                  <Label htmlFor={sub.slug} className="ml-2">
                    {sub.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
