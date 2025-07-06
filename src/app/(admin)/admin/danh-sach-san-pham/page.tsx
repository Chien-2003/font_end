import ProductCard from "@/components/shared/ItemCard";
import { getAllProducts } from "@/lib/productsApi";

export default async function page() {
  const products = await getAllProducts();

  const validProducts = products.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  return (
    <div className="container mx-auto">
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
