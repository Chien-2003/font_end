'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EmptyPlaceholder } from '@/components/views/EmptyPlaceholder';
import HomeBanner from '@/components/views/HomeBanner';
import HomeCategorySection from '@/components/views/HomeCategorySection';
import ProductCard from '@/components/views/ItemCard';
import ModalFitterProduct from '@/model/modalFitterProduct';
import { getProducts } from '@/services/productsApi';
import { SortType } from '@/types/sort';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sortByCategory, setSortByCategory] = useState<
    Record<string, SortType>
  >({});

  useEffect(() => {
    getProducts({ page: 1, limit: 100 })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const maleProducts = products.filter(
    (p) => p.category?.category_type === 'nam',
  );
  const femaleProducts = products.filter(
    (p) => p.category?.category_type === 'nu',
  );
  const accessories = products.filter(
    (p) => p.category?.category_type === 'khac',
  );

  return (
    <Fragment>
      <HomeBanner />
      <HomeCategorySection />
      <Section
        title={maleProducts[0]?.category?.name}
        categorySlug={maleProducts[0]?.category?.slug_category}
        products={maleProducts}
        sortByCategory={sortByCategory}
        setSortByCategory={setSortByCategory}
      />
      <Section
        title={femaleProducts[0]?.category?.name}
        categorySlug={femaleProducts[0]?.category?.slug_category}
        products={femaleProducts}
        sortByCategory={sortByCategory}
        setSortByCategory={setSortByCategory}
      />
      <Section
        title={accessories[0]?.category?.name}
        categorySlug={accessories[0]?.category?.slug_category}
        products={accessories}
        sortByCategory={sortByCategory}
        setSortByCategory={setSortByCategory}
      />
    </Fragment>
  );
}

function Section({
  title,
  categorySlug,
  products,
  sortByCategory,
  setSortByCategory,
}: {
  title: string;
  categorySlug: string;
  products: any[];
  sortByCategory: Record<string, SortType>;
  setSortByCategory: React.Dispatch<
    React.SetStateAction<Record<string, SortType>>
  >;
}) {
  const categoryImage = products[0]?.category?.image;
  const sort = sortByCategory[categorySlug] ?? 'newest';
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'newest':
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      case 'oldest':
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );
      case 'price_asc':
        return (
          (a.discounted_price ?? a.price) -
          (b.discounted_price ?? b.price)
        );
      case 'price_desc':
        return (
          (b.discounted_price ?? b.price) -
          (a.discounted_price ?? a.price)
        );
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 md:px-14 lg:px-15 xl:px-15 2xl:px-16 w-full h-full py-8">
      <div className="flex flex-col mb-4 space-y-4 w-full">
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
        <div className="flex items-center w-full justify-between">
          <h2 className="text-3xl font-medium">{title}</h2>
          <div className="flex items-center justify-end gap-2 md:gap-4 lg:gap-6">
            <ModalFitterProduct
              sort={sort}
              onSortChange={(val) =>
                setSortByCategory((prev) => ({
                  ...prev,
                  [categorySlug]: val,
                }))
              }
            />
            <Link
              href={`/${categorySlug}`}
              className="text-base font-medium text-primary hover:underline hover:opacity-80 flex flex-row gap-1"
            >
              Xem tất cả <ChevronsRight />
            </Link>
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <EmptyPlaceholder description="Không có sản phẩm nào." />
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {sortedProducts.map((product) => (
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
          <CarouselPrevious className="hidden lg:flex cursor-pointer bg-primary hover:bg-primary/90 text-white hover:text-white" />
          <CarouselNext className="hidden lg:flex cursor-pointer bg-primary hover:bg-primary/90 text-white hover:text-white" />
        </Carousel>
      )}
    </div>
  );
}
