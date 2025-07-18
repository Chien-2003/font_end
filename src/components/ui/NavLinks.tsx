'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import * as React from 'react';
import { Category, getAllCategories } from '@/lib/categoryApi';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function NavLinks({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const staticLinks = [
    { name: 'Liên hệ', href: '/lien-he' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <NavigationMenu className={`${className} bg-white dark:bg-gray-900`}>
      <NavigationMenuList className="flex gap-4">
        {categories.map((category) => {
          const href = `/${category.slug_category}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <NavigationMenuItem key={category.id} className="relative">
              <NavigationMenuTrigger
                onClick={() => router.push(href)}
                className={`uppercase text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-[#b4282b] bg-[#fee6e6] dark:bg-[#5f121f]'
                    : 'text-gray-700 hover:text-[#b4282b] hover:bg-gray-100 dark:text-gray-300 dark:hover:text-[#b4282b] dark:hover:bg-gray-800'
                }`}
              >
                {category.name}
              </NavigationMenuTrigger>

              {category.subcategories && category.subcategories.length > 0 && (
                <NavigationMenuContent className="z-50 bg-white dark:bg-gray-900 rounded-md shadow-lg p-6 min-w-[400px] md:min-w-[480px] lg:min-w-[520px]">
                  <div className="flex gap-x-8">
                    {chunkArray(category.subcategories, 4).map((group, idx) => (
                      <ul key={idx} className="flex flex-col space-y-3">
                        {group.map((sub) => (
                          <ListItem
                            key={sub.id}
                            title={sub.name}
                            href={`${href}/${sub.slug}`}
                            active={pathname === `${href}/${sub.slug}`}
                          >
                            {sub.name}
                          </ListItem>
                        ))}
                      </ul>
                    ))}
                  </div>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          );
        })}
        {staticLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className={`${navigationMenuTriggerStyle()} uppercase text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-[#b4282b] bg-[#fee6e6] dark:bg-[#5f121f]'
                      : 'text-gray-700 hover:text-[#b4282b] hover:bg-gray-100 dark:text-gray-300 dark:hover:text-[#b4282b] dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  active = false,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & {
  href: string;
  active?: boolean;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`block rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-[#fee6e6] hover:text-[#b4282b] focus:bg-[#fee6e6] focus:text-[#b4282b] ${
            active ? 'text-[#b4282b] font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className="line-clamp-2 text-xs text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
