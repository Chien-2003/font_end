import ProductCard from '@/components/shared/ItemCard';
import HomeBanner from '@/components/shared/HomeBanner';
import HomeCategorySection from '@/components/shared/HomeCategorySection';
import { getProducts } from '@/lib/productsApi';
import { Fragment } from 'react';

export default async function HomePage() {
  const allProductsResponse = await getProducts({
    page: 1,
    limit: 100,
  });
  const allProducts = allProductsResponse?.data ?? [];

  const maleProducts = allProducts.filter(
    (product) => product.category?.category_type === 'Nam',
  );

  const femaleProducts = allProducts.filter(
    (product) => product.category?.category_type === 'Nữ',
  );

  const accessories = allProducts.filter(
    (product) => product.category?.category_type === 'Phụ kiện',
  );

  return (
    <Fragment>
      <HomeBanner />
      <HomeCategorySection />
      <Section
        title={maleProducts[0]?.category?.name}
        products={maleProducts}
      />
      <Section
        title={femaleProducts[0]?.category?.name}
        products={femaleProducts}
      />
      <Section
        title={accessories[0]?.category?.name}
        products={accessories}
      />
    </Fragment>
  );
}

function Section({
  title,
  products,
}: {
  title: string;
  products: any[];
}) {
  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {products.length === 0 ? (
        <p className="text-center w-full">Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
  );
}
