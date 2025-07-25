'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ProductImageCarousel({
  images,
  alt,
}: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="flex gap-2">
      <div className="w-35">
        <Swiper
          direction="vertical"
          slidesPerView={4}
          spaceBetween={1}
          freeMode={true}
          mousewheel={true}
          className="h-[600px]"
        >
          {images.map((url, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
                marginBottom: '0px',
                marginTop: '0px',
              }}
            >
              <div
                onClick={() => handleThumbnailClick(index)}
                className={`relative h-34 w-34 border cursor-pointer overflow-hidden transition-opacity space-y-2.5 ${
                  index === selectedIndex
                    ? 'opacity-100 ring-1 ring-blue-500'
                    : 'opacity-50'
                }`}
              >
                <Image
                  src={url}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-[600px] h-[600px] flex-1">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} ${selectedIndex + 1}`}
          fill
          className="object-cover lg:object-scale-down w-full h-full"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-3xl"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-3xl"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
