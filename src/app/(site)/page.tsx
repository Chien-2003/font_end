import HomeBanner from '@/components/shared/HomeBanner';
import HomeCategorySection from '@/components/shared/HomeCategorySection';
import ProductCard from '@/components/shared/ItemCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getProducts } from '@/services/productsApi';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
export default async function HomePage() {
  const allProductsResponse = await getProducts({
    page: 1,
    limit: 100,
  });
  const allProducts = allProductsResponse?.data ?? [];

  const maleProducts = allProducts.filter(
    (product) => product.category?.category_type === 'nam',
  );

  const femaleProducts = allProducts.filter(
    (product) => product.category?.category_type === 'nu',
  );

  const accessories = allProducts.filter(
    (product) => product.category?.category_type === 'khac',
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
  const categoryImage = products[0]?.category?.image;

  return (
    <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full py-8">
      {/* <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8"> */}
      <div className="flex flex-col mb-4 space-y-4">
        {categoryImage && (
          <div className="relative w-full h-[630px] overflow-hidden">
            <Image
              src={categoryImage}
              alt={title}
              fill
              className="object-fill"
              priority
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium">{title}</h2>
          <Link
            href={`/${products[0]?.category?.slug_category}`}
            className="text-base font-medium text-primary hover:underline hover:opacity-80 transform transition-all"
          >
            Xem thêm
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-center w-full">Không có sản phẩm nào.</p>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex cursor-pointer" />
          <CarouselNext className="hidden lg:flex cursor-pointer" />
        </Carousel>
      )}
    </div>
  );
}
