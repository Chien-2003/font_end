"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/shared/ItemCard";
import HomeBanner from "@/components/ui/HomeBanner";
import HomeCategorySection from "@/components/ui/HomeCategorySection";
import { getAllProducts, Product } from "@/lib/products";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeCategorySection />

      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="flex flex-wrap">
          {loading ? (
            <p className="text-center w-full">Đang tải sản phẩm...</p>
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
