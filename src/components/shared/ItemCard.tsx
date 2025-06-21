"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  oldPrice?: number;
  discountPercent?: number;
  image_url: string;
  image_hover_url?: string;
}

export default function ProductCard({
  name,
  description,
  price,
  oldPrice,
  discountPercent,
  image_url,
  image_hover_url,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current || !hoverImageRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(hoverImageRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    const card = cardRef.current;
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3 mb-6 pro-loop">
      <div
        ref={cardRef}
        className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col"
      >
        <>
        <div className="relative w-full h-[431px]">
          <Image
            width={287}
            height={431}
            className="w-full h-full object-cover absolute top-0 left-0 z-10"
            src={image_url}
            alt={name}
          />
          {image_hover_url && (
            <Image
              ref={hoverImageRef}
              width={287}
              height={431}
              className="w-full h-full object-cover absolute top-0 left-0 z-20 opacity-0 pointer-events-none"
              src={image_hover_url}
              alt={`${name} hover`}
            />
          )}
          {discountPercent && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-30">
              {discountPercent}%
            </div>
          )}
        </div>
        <h3 className="text-sm font-semibold px-2 pt-2 text-gray-800 hover:text-[#b4282b]">
          {name.length > 32 ? `${name.slice(0, 32)}...` : name}
        </h3>
        </>
        <div className="p-2 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-3">
              {description.length > 50
                ? `${description.slice(0, 50)}...`
                : description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{price}</span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {oldPrice}
                </span>
              )}
            </div>
            <button
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-200 ease-in-out focus:outline-none flex items-center justify-center"
              aria-label="Thêm vào giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553L16.5 4H5.129L5 3H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
