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

export default function NavLinks({
  className = '',
}: {
  className?: string;
}) {
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
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {categories.map((category) => {
          const href = `/${category.slug_category}`;
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger
                onClick={() => router.push(href)}
                className={`uppercase text-sm font-medium dark:bg-gray-900 px-4 py-2 ${
                  isActive ? 'text-[#b4282b]' : ''
                }`}
              >
                {category.name}
              </NavigationMenuTrigger>
              {category.subcategories &&
                category.subcategories.length > 0 && (
                  <NavigationMenuContent>
                    <div className="flex gap-x-6 p-4 md:w-[400px] lg:w-[500px]">
                      {chunkArray(category.subcategories, 4).map(
                        (group, index) => (
                          <ul
                            key={index}
                            className="flex flex-col space-y-2"
                          >
                            {group.map((sub) => (
                              <ListItem
                                key={sub.id}
                                title={sub.name}
                                href={`${href}/${sub.slug}`}
                                active={
                                  pathname === `${href}/${sub.slug}`
                                }
                              >
                                {sub.name}
                              </ListItem>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </NavigationMenuContent>
                )}
            </NavigationMenuItem>
          );
        })}
        {staticLinks.map((link) => (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={`${navigationMenuTriggerStyle()} uppercase text-base font-medium dark:bg-gray-900 ${
                  pathname === link.href ? 'text-[#b4282b]' : ''
                }`}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
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
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div
            className={`text-sm font-medium leading-none ${
              active ? 'text-[#b4282b]' : ''
            }`}
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
