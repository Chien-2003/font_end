'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Image from 'next/image';
import Link from 'next/link';

const banners = [
  {
    href: '#',
    src: 'https://file.hstatic.net/1000402464/file/hero_1-100_8edbb021f9e14c8883e99e728ca20759.jpg',
    alt: 'Banner 1',
  },
  {
    href: '#',
    src: 'https://file.hstatic.net/1000402464/file/jh_slide_chinh.jpg',
    alt: 'Banner 2',
  },
  {
    href: '#',
    src: 'https://file.hstatic.net/1000402464/file/fl_slide_chinh.jpg',
    alt: 'Banner 3',
  },
];

export default function HomeBanner() {
  return (
    <div className="pb-3 h-full bg-white">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((item, index) => (
            <CarouselItem
              key={index}
              className="aspect-[3/1] md:aspect-[16/5]"
            >
              <Link href={item.href} aria-label={item.alt}>
                <div className="relative w-full h-[690px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover h-full"
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
