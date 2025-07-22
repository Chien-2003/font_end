'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface Category {
  id: number;
  name: string;
  slug_category: string;
}

async function fetchCategoryName(
  slug: string,
): Promise<string | null> {
  try {
    const res = await fetch(
      `http://localhost:4000/categories?slug_category=${slug}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;
    const data: Category[] = await res.json();
    if (data.length === 0) return null;
    return data[0].name;
  } catch {
    return null;
  }
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part !== '');
  const [labels, setLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function loadLabels() {
      const newLabels: string[] = [];

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        if (i === 0) {
          const categoryName = await fetchCategoryName(part);
          if (categoryName) {
            newLabels.push(categoryName);
          } else {
            newLabels.push(
              part.charAt(0).toUpperCase() +
                part.slice(1).replace(/-/g, ' '),
            );
          }
        } else {
          newLabels.push(
            part.charAt(0).toUpperCase() +
              part.slice(1).replace(/-/g, ' '),
          );
        }
      }

      setLabels(newLabels);
    }

    loadLabels();
  }, [pathname]);

  return (
    <Breadcrumb className="w-full px-1 p-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="dark:hover:text-foreground dark:text-muted-foreground text-gray-900"
          >
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathParts.map((part, index) => {
          const href = '/' + pathParts.slice(0, index + 1).join('/');
          const isLast = index === pathParts.length - 1;
          const label = labels[index] || part;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="px-1">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage aria-current="page">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="dark:hover:text-foreground dark:text-muted-foreground text-gray-900"
                  >
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
