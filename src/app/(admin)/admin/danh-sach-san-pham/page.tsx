import ProductCard from '@/components/shared/ItemCard';
import { getAllProducts } from '@/lib/productsApi';

export default async function page() {
  const productsResponse = await getAllProducts({
    page: 1,
    limit: 100,
  });
  const validProducts = productsResponse.data.filter(
    (product) => product.variants && product.variants.length > 0,
  );

  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
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
    </div>
  );
}
