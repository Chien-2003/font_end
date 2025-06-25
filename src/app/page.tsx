import ProductCard from "@/components/shared/ItemCard";
import HomeBanner from "@/components/ui/HomeBanner";
import HomeCategorySection from "@/components/ui/HomeCategorySection";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <HomeBanner />
      <HomeCategorySection />

      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="flex flex-wrap">
          {products.length === 0 ? (
            <p className="text-center w-full">Không có sản phẩm nào.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image_url={product.image_url}
                image_hover_url={product.image_hover_url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
