'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Category, getAllCategories } from '@/lib/categoryApi';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function NavLinks({
  className = '',
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();

        const desiredOrder = [
          'Trang phục nam',
          'Trang phục nữ',
          'Phụ kiện',
        ];
        const sortedData = desiredOrder
          .map((name) => data.find((cat) => cat.name === name))
          .filter(Boolean) as Category[];

        setCategories(sortedData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }

    fetchCategories();
  }, []);

  const staticLinks = [
    { name: 'Liên hệ', href: '/lien-he' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <NavigationMenu
      className={`${className} bg-background dark:bg-gray-900`}
    >
      <NavigationMenuList className="flex gap-4">
        {categories.map((category) => {
          const href = `/${category.slug_category}`;
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <NavigationMenuItem
              key={category.id}
              className="relative"
            >
              <NavigationMenuTrigger
                className={`uppercase text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10 dark:bg-primary/20'
                    : 'dark:text-white hover:text-primary hover:bg-muted/50 dark:hover:text-primary dark:hover:bg-muted/30'
                }`}
              >
                <Link href={href} className="w-full h-full block">
                  {category.name}
                </Link>
              </NavigationMenuTrigger>

              {category.subcategories &&
                category.subcategories.length > 0 && (
                  <NavigationMenuContent className="z-50 bg-white dark:bg-gray-900 rounded-md shadow-lg p-6 min-w-[400px] md:min-w-[480px] lg:min-w-[520px]">
                    <div className="flex gap-x-8">
                      {chunkArray(category.subcategories, 4).map(
                        (group, idx) => (
                          <ul
                            key={idx}
                            className="flex flex-col space-y-3"
                          >
                            {group.map((sub) => {
                              const subHref = `${href}/${sub.slug}`;
                              const isSubActive =
                                pathname === subHref;

                              return (
                                <li key={sub.id}>
                                  <Link
                                    href={subHref}
                                    className={`block rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-primary/10 focus:bg-primary/10 focus:text-primary ${
                                      isSubActive
                                        ? 'text-primary font-semibold'
                                        : 'dark:text-white'
                                    }`}
                                  >
                                    <div className="text-sm font-semibold hover:text-primary">
                                      {sub.name}
                                    </div>
                                    {/* <div className="line-clamp-2 text-xs dark:text-white">
                                      {sub.name}
                                    </div> */}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ),
                      )}
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
              <Link
                href={link.href}
                className={`uppercase text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10 dark:bg-primary/20'
                    : 'dark:text-white hover:text-primary hover:bg-muted/50 dark:hover:text-primary dark:hover:bg-muted/30'
                }`}
              >
                {link.name}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
