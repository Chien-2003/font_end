import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getProductDetail } from '@/lib/productsApi';
import ProductVariantSelector from './components/ProductVariantSelector';
import ProductImageCarousel from './components/ProductImageCarousel';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const product = await getProductDetail(resolvedParams.id);
    const firstImage =
      Array.isArray(product.image_url) && product.image_url.length > 0
        ? product.image_url[0]
        : '';
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: firstImage,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [firstImage],
      },
    };
  } catch (error) {
    return {
      title: 'Sản phẩm không tồn tại',
      description: 'Sản phẩm bạn đang tìm không tồn tại.',
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const resolvedParams = await params;

  try {
    const product = await getProductDetail(resolvedParams.id);

    if (!product) {
      return notFound();
    }

    return (
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <ProductImageCarousel
              images={
                Array.isArray(product.image_url)
                  ? product.image_url
                  : [product.image_url]
              }
              alt={product.name}
            />
          </div>
          <div className="md:col-span-6">
            <h1 className="text-2xl font-bold mb-3">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              {product.discounted_price && (
                <span className="text-gray-400 line-through text-lg">
                  {product.price}
                </span>
              )}
              <span className="text-2xl font-bold text-red-600">
                {product.discounted_price ?? product.price}
              </span>
              {product.discount_percentage !== undefined &&
                product.discount_percentage > 0 && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    -{product.discount_percentage}%
                  </span>
                )}
            </div>

            <ProductVariantSelector
              variants={product.variants ?? []}
            />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Chi tiết sản phẩm lỗi:', err);
    return notFound();
  }
}
