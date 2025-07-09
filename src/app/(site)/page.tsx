import ProductCard from "@/components/shared/ItemCard";
import { Button } from "@/components/ui/button";
import HomeBanner from "@/components/ui/HomeBanner";
import HomeCategorySection from "@/components/ui/HomeCategorySection";
import { getAllProducts } from "@/lib/productsApi";

export default async function HomePage() {
  const products = await getAllProducts();
  const validProducts = products.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  return (
    <>
      <HomeBanner />
      <HomeCategorySection />
      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
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
    </>
  );
}
