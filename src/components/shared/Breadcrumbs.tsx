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
import { getCategoryBySlug } from '@/lib/categoryApi';

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
          const category = await getCategoryBySlug(part);
          if (category?.name) {
            newLabels.push(category.name);
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
