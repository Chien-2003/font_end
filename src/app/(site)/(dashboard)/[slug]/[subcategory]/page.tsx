export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SidebarProvider } from '@/components/ui/sidebar';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import FilterPriceSidebar from '@/components/views/FitterPriceSidebar';
import ProductCard from '@/components/views/ItemCard';
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
} from '@/services/categoryApi';
import { getProducts } from '@/services/productsApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
}): Promise<Metadata> {
  const { slug, subcategory } = await params;
  const subCategoryData = await getSubcategoryBySlug(
    slug,
    subcategory,
  );

  if (!subCategoryData) return {};

  const title = subCategoryData.name;
  const description = `Khám phá các sản phẩm thuộc danh mục ${subCategoryData.name}`;
  const ogImageUrl =
    'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${slug}/${subcategory}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: subCategoryData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

const PAGE_SIZE = 3;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const { slug, subcategory } = await params;
  const search = await searchParams;
  const page = Number(search?.page ?? 1);

  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProducts({
    category_id: category.id,
    subcategory_slug: subcategory,
    page,
    limit: PAGE_SIZE,
  });

  const products = productsResponse.data || [];
  const totalItems = productsResponse.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const createHref = (pageNum: number) => {
    if (pageNum < 1) pageNum = 1;
    const params = new URLSearchParams();
    params.set('page', String(pageNum));
    return `?${params.toString()}`;
  };
  if (products.length === 0) return notFound();

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full py-8">
        <SidebarProvider className="mt-3">
          <FilterPriceSidebar />
          <main className="ml-2 lg:ml-3">
            <Breadcrumbs />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  categorySlug={product.category.slug_category}
                  subcategorySlug={product.subcategory?.slug ?? ''}
                  name={product.name}
                  description={product.description}
                  price={product.discounted_price ?? product.price}
                  oldPrice={
                    product.discounted_price
                      ? product.price
                      : undefined
                  }
                  discountPercent={product.discount_percentage}
                  image_url={product.image_url}
                  image_hover_url={product.image_hover_url}
                  variants={product.variants ?? []}
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={createHref(page - 1)}
                  isActive={false}
                  aria-disabled={page <= 1}
                  className={
                    page <= 1 ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={createHref(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={createHref(page + 1)}
                  isActive={false}
                  aria-disabled={page >= totalPages}
                  className={
                    page >= totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </Fragment>
  );
}
