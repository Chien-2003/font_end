"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryItem {
  href: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const categories: CategoryItem[] = [
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon1.jpg",
    alt: "New Collection 2024",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg",
    alt: "Áo John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon6.jpg",
    alt: "Quần John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon5.jpg",
    alt: "Áo thun John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon8.jpg",
    alt: "Áo khoác John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon7.jpg",
    alt: "Phụ kiện John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon3.jpg",
    alt: "Áo polo John Henry",
  },
  {
    href: "#",
    src: "https://file.hstatic.net/1000402464/file/icon4.jpg",
    alt: "Áo sơ mi John Henry",
  },
];

export default function HomeCategorySection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="w-28 flex flex-col items-center text-center"
            >
              <Link href={item.href} className="group">
                <div className="relative w-auto h- mx-auto overflow-hidden transition-transform group-hover:scale-105">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={70}
                    height={81}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
