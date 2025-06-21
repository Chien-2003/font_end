"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const banners = [
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/hero_1-100_8edbb021f9e14c8883e99e728ca20759.jpg",
    alt: "Banner 1",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/jh_slide_chinh.jpg",
    alt: "Banner 2",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/fl_slide_chinh.jpg",
    alt: "Banner 3",
  },
];

export default function HomeBanner() {
  return (
    <div className="pb-3 h-full bg-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.href} aria-label={item.alt}>
              <div className="relative w-full h-full aspect-[3/1] md:aspect-[16/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={640}
                  className="w-full h-full"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
