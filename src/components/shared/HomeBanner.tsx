'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BannerFormData, getBanners } from '@/lib/bannerApi';
import { EmptyPlaceholder } from './EmptyPlaceholder';

export default function HomeBanner() {
  const [banners, setBanners] = useState<BannerFormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data.filter((b) => b.is_active));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);

  if (loading)
    return <div className="text-center">Đang tải banner...</div>;
  if (banners.length === 0)
    return <EmptyPlaceholder description="Không có banner." />;

  const banner = banners[0];

  return (
    <div className="pb-3 h-full bg-white">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banner.image_url.map((src, index) => (
            <CarouselItem
              key={index}
              className="aspect-[3/1] md:aspect-[16/5]"
            >
              <Link
                href={banner.link || '#'}
                aria-label={`${banner.title} - ảnh ${index + 1}`}
              >
                <div className="relative w-full h-[690px]">
                  <Image
                    src={src}
                    alt={`${banner.title} - ảnh ${index + 1}`}
                    fill
                    className="object-fill h-full"
                    unoptimized={true}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
