import ProductCard from "@/components/shared/ItemCard";
import HomeBanner from "@/components/ui/HomeBanner";
import HomeCategorySection from "@/components/ui/HomeCategorySection";

export default function page() {
  return (
    <>
      <HomeBanner />
      <HomeCategorySection />
      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="flex flex-wrap">
          <ProductCard
            name="Giày Thể Thao Cao Cấp 1"
            description="Một đôi giày hoàn hảo cho cả tập luyện và đi chơi, với thiết kế hiện đại và thoải mái."
            price={79.99}
            oldPrice={99.99}
            discountPercent={10}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__ab89ab5fdc384477953765d3c65ed87a_1024x1024.jpg"
          />

          <ProductCard
            name="Giày Mùa Đông"
            description="Chống trơn, chống nước, giữ ấm cực tốt cho mùa lạnh."
            price={89.5}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__b3b9fb026da342f19fc0c224840446a3_1024x1024.jpg"
          />
          <ProductCard
            name="Giày Thể Thao Cao Cấp 1"
            description="Một đôi giày hoàn hảo cho cả tập luyện và đi chơi, với thiết kế hiện đại và thoải mái."
            price={79.99}
            oldPrice={99.99}
            discountPercent={10}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__ab89ab5fdc384477953765d3c65ed87a_1024x1024.jpg"
          />

          <ProductCard
            name="Giày Mùa Đông"
            description="Chống trơn, chống nước, giữ ấm cực tốt cho mùa lạnh."
            price={89.5}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__b3b9fb026da342f19fc0c224840446a3_1024x1024.jpg"
          />
          <ProductCard
            name="Giày Thể Thao Cao Cấp 1"
            description="Một đôi giày hoàn hảo cho cả tập luyện và đi chơi, với thiết kế hiện đại và thoải mái."
            price={79.99}
            oldPrice={99.99}
            discountPercent={10}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__ab89ab5fdc384477953765d3c65ed87a_1024x1024.jpg"
          />

          <ProductCard
            name="Giày Mùa Đông"
            description="Chống trơn, chống nước, giữ ấm cực tốt cho mùa lạnh."
            price={89.5}
            imageUrl="https://product.hstatic.net/1000402464/product/ks2…1__b3b9fb026da342f19fc0c224840446a3_1024x1024.jpg"
          />
        </div>
      </div>
    </>
  );
}
