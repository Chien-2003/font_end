export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FilterPriceSidebar from '@/components/shared/FitterPriceSidebar';
import ProductCard from '@/components/shared/ItemCard';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getCategoryBySlug } from '@/lib/categoryApi';
import { getProducts } from '@/lib/productsApi';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

const PAGE_SIZE = 10;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = searchParams
    ? await searchParams
    : undefined;

  const { slug, subcategory } = awaitedParams;
  const page = Number(awaitedSearchParams?.page ?? 1);

  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProducts({
    category_id: category.id,
    subcategory_slug: subcategory,
    page,
    limit: PAGE_SIZE,
  });

  const products = productsResponse.data || [];

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
      </div>
    </Fragment>
  );
}
