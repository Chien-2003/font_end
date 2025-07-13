import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { notFound } from "next/navigation";
import ProductCard from "@/components/shared/ItemCard";
import {
  getCategoryBySlug,
  getProductsByCategoryId,
  Category,
  Product,
} from "@/lib/categoryApi";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Image from "next/image";

const PAGE_SIZE = 7;

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
    slug === "trang-phuc-nam"
      ? (process.env.NEXT_PUBLIC_SITE_URL ??
        "https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg")
      : "https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
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
      card: "summary_large_image",
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

  const category: Category | null = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProductsByCategoryId(
    category.id,
    page,
    PAGE_SIZE,
  );
  const products: Product[] = productsResponse.data;
  const total = productsResponse.pagination?.total || products.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const validProducts = products.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  return (
    <>
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
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
        <Breadcrumbs />
        <div className="flex flex-wrap">
          {validProducts.length === 0 ? (
            <p className="text-center w-full">Không có sản phẩm nào.</p>
          ) : (
            validProducts.map((product) => {
              const firstVariant = product.variants![0];
              return (
                <ProductCard
                  key={product.id}
                  variants={product.variants!}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image_url={product.image_url}
                  image_hover_url={product.image_hover_url}
                />
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${page - 1}`}
                  isActive={false}
                  aria-disabled={page <= 1}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`?page=${i + 1}`}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`?page=${page + 1}`}
                  isActive={false}
                  aria-disabled={page >= totalPages}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
}
