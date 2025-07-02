import ProductCard from "@/components/shared/ItemCard";
import { getAllProducts } from "@/lib/products";

export default async function page() {
  const products = await getAllProducts();
  return (
    <div className="container mx-auto">
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
  );
}
