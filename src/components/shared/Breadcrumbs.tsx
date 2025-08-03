'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { getCategoryBySlug } from '@/lib/categoryApi';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part !== '');
  const [labels, setLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function loadLabels() {
      let newLabels: string[] = [];

      if (pathParts.length === 0) {
        setLabels(newLabels);
        return;
      }
      const categorySlug = pathParts[0];
      const category = await getCategoryBySlug(categorySlug);
      if (category?.name) {
        newLabels.push(category.name);
      } else {
        newLabels.push(
          categorySlug.charAt(0).toUpperCase() +
            categorySlug.slice(1).replace(/-/g, ' '),
        );
      }
      if (pathParts.length > 1) {
        const subcategorySlug = pathParts[1];
        let subcategoryName = '';
        if (category?.subcategories) {
          const sub = category.subcategories.find(
            (sc) => sc.slug === subcategorySlug,
          );
          if (sub) {
            subcategoryName = sub.name;
          }
        }
        if (!subcategoryName) {
          subcategoryName =
            subcategorySlug.charAt(0).toUpperCase() +
            subcategorySlug.slice(1).replace(/-/g, ' ');
        }
        newLabels.push(subcategoryName);
      }
      for (let i = 2; i < pathParts.length; i++) {
        const part = pathParts[i];
        newLabels.push(
          part.charAt(0).toUpperCase() +
            part.slice(1).replace(/-/g, ' '),
        );
      }
      setLabels(newLabels);
    }
    loadLabels();
  }, [pathname]);
  return (
    <Breadcrumb className="w-full pb-2">
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
