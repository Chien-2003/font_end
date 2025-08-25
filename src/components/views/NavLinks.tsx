'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Category, getAllCategories } from '@/services/categoryApi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

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
    { name: 'Blog', href: '/page/blog' },
  ];

  return (
    <NavigationMenu className={`${className}`}>
      <NavigationMenuList className="flex gap-6">
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
                className={`
                  uppercase text-sm font-semibold py-2 px-1 rounded-md nav-link transition-colors duration-200 relative
                  before:content-['']
                  before:absolute
                  before:left-0
                  before:bottom-0
                  before:h-[2px]
                  before:bg-primary
                  before:w-0
                  before:transition-all
                  before:duration-200
                  hover:before:w-full
                  ${
                    isActive
                      ? 'text-primary before:w-full hover:text-primary'
                      : 'dark:text-white hover:text-primary dark:hover:text-primary'
                  }
                `}
              >
                <Link
                  href={href}
                  className="w-full h-full block px-0"
                >
                  {category.name}
                </Link>
              </NavigationMenuTrigger>

              {category.subcategories &&
                category.subcategories.length > 0 && (
                  <NavigationMenuContent className="z-50 bg-background dark:bg-gray-900 shadow-lg p-4 min-w-[400px] md:min-w-[480px] lg:min-w-[520px]">
                    <div className="flex gap-x-8">
                      {chunkArray(category.subcategories, 4).map(
                        (group, idx) => (
                          <ul
                            key={idx}
                            className="flex flex-col space-y-2"
                          >
                            {group.map((sub) => {
                              const subHref = `${href}/${sub.slug}`;
                              const isSubActive =
                                pathname === subHref;

                              return (
                                <li key={sub.id}>
                                  <Link
                                    href={subHref}
                                    className={`
                                  block rounded-md p-3 leading-none nav-link no-underline outline-none transition-colors duration-200 relative
                                  ${
                                    isSubActive
                                      ? 'text-primary italic font-bold before:w-full hover:text-primary'
                                      : 'dark:text-white hover:text-primary'
                                  }
                                `}
                                  >
                                    {sub.name}
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
              <NavigationMenuTrigger
                hasSubmenu={false}
                className={`
                  uppercase text-sm font-semibold py-2 px-1 rounded-md nav-link transition-colors duration-200 relative
                  before:content-['']
                  before:absolute
                  before:left-0
                  before:bottom-0
                  before:h-[2px]
                  before:bg-primary
                  before:w-0
                  before:transition-all
                  before:duration-200
                  hover:before:w-full
                  ${
                    isActive
                      ? 'text-primary before:w-full hover:text-primary'
                      : 'dark:text-white hover:text-primary dark:hover:text-primary'
                  }
                `}
              >
                <Link
                  href={link.href}
                  className="w-full h-full block px-0"
                >
                  {link.name}
                </Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
