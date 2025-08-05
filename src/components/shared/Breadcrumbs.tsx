'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getCategoryBySlug } from '@/lib/categoryApi';
import { getProductDetail } from '@/lib/productsApi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
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
      if (pathParts.length > 2) {
        try {
          const productId = pathParts[2];
          const product = await getProductDetail(productId);
          newLabels.push(product.name);
        } catch (error) {
          newLabels.push(
            pathParts[2].charAt(0).toUpperCase() +
              pathParts[2].slice(1).replace(/-/g, ' '),
          );
        }
      }
      setLabels(newLabels);
    }
    loadLabels();
  }, [pathname]);
  if (labels.length !== pathParts.length) {
    return null;
  }
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
        {labels.map((label, index) => {
          const href = '/' + pathParts.slice(0, index + 1).join('/');
          const isLast = index === labels.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="">
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
