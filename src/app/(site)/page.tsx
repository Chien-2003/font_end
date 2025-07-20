import ProductCard from '@/components/shared/ItemCard';
import HomeBanner from '@/components/shared/HomeBanner';
import HomeCategorySection from '@/components/shared/HomeCategorySection';
import { getAllProducts } from '@/lib/productsApi';

export default async function HomePage() {
  const productsResponse = await getAllProducts({
    page: 1,
    limit: 100,
  });

  const validProducts = Array.isArray(productsResponse?.data)
    ? productsResponse.data.filter(
        (product) => product.variants && product.variants.length > 0,
      )
    : [];

  return (
    <>
      <HomeBanner />
      <HomeCategorySection />
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8">
        {validProducts.length === 0 ? (
          <p className="text-center w-full">Không có sản phẩm nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
            {validProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                categorySlug={product.category?.slug_category}
                name={product.name}
                description={product.description}
                price={product.discounted_price ?? product.price}
                oldPrice={
                  product.discounted_price ? product.price : undefined
                }
                discountPercent={product.discount_percentage}
                image_url={product.image_url}
                image_hover_url={product.image_hover_url}
                variants={product.variants ?? []}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
