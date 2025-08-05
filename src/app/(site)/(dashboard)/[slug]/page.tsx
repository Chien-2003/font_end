import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { AppSidebar } from '@/components/shared/CategoryFitterSidebar';
import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import ProductCard from '@/components/shared/ItemCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Category, getCategoryBySlug } from '@/lib/categoryApi';
import { getProducts, Product } from '@/lib/productsApi';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

const PAGE_SIZE = 10;

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  const title = `Danh mục: ${category.name}`;
  const description = category.description;

  const ogImageUrl =
    slug === 'trang-phuc-nam'
      ? (process.env.NEXT_PUBLIC_SITE_URL ??
        'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg')
      : 'https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `http://localhost:3000/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: category.name,
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

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: any;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { slug } = awaitedParams;
  const page = Number(awaitedSearchParams?.page) || 1;
  const subSlug = awaitedSearchParams?.sub || '';

  const category: Category | null = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProducts({
    category_id: category.id,
    subcategory_slug: subSlug,
    page,
    limit: PAGE_SIZE,
  });
  const products: Product[] = productsResponse.data || [];
  const totalItems = productsResponse.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const paginatedProducts = products;
  const createHref = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', String(pageNum));
    if (subSlug) params.set('sub', subSlug);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  return (
    <Fragment>
      {category.image && (
        <div className="relative w-full h-[556px]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-fill h-full"
          />
        </div>
      )}
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full py-8">
        <SidebarProvider className="mt-3">
          <AppSidebar category={category} />
          <main className="ml-2 lg:ml-3">
            <Breadcrumbs />
            {paginatedProducts.length === 0 ? (
              <div className="w-full">
                <EmptyPlaceholder description="Không có sản phẩm nào để hiển thị." />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product, index) => (
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
            )}
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
