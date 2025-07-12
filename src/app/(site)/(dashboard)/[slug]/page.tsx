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

interface PageProps {
  params: { slug: string };
}
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  const title = `Elysia Wear | Danh mục: ${category.name}`;
  const description = category.description;

  const ogImageUrl =
    slug === "trang-phuc-nam"
      ? (process.env.NEXT_PUBLIC_SITE_URL ??
        "https://n7media.coolmate.me/uploads/July2025/EXCOOL_-_Desktop-1.jpg")
      : "https://yourdomain.com/og-default.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://yourdomain.com/${slug}`,
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

export default async function CategoryPage({ params }: { params: any }) {
  const { slug } = params;

  const category: Category | null = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const productsResponse = await getProductsByCategoryId(category.id);
  const products: Product[] = productsResponse.data;

  const validProducts = products.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  return (
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
                variant_id={firstVariant.id}
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
    </div>
  );
}
