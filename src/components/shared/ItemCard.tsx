"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { IoCartOutline } from "react-icons/io5";
import { addToCart } from "@/lib/cartApi";
import { showError, showSuccess } from "@/lib/swal";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  variant_id: number;
  name: string;
  description: string;
  price: string;
  oldPrice?: number;
  discountPercent?: number;
  image_url: string;
  image_hover_url?: string;
}

export default function ProductCard({
  variant_id,
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
  const { refreshCart } = useCart();
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
        <div className="p-2 flex-grow flex flex-col justify-between">
          <p className="text-gray-600 text-sm mb-2">
            {description.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">{price}</span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {oldPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>
            <button
              className="text-black p-2 cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none flex items-center justify-center"
              aria-label="Thêm vào giỏ hàng"
              onClick={async () => {
                try {
                  await addToCart(variant_id, 1);
                  await refreshCart();
                  showSuccess("Đã thêm vào giỏ hàng!");
                } catch (err) {
                  console.error(err);
                  showError("Thêm vào giỏ hàng thất bại!");
                }
              }}
            >
              <IoCartOutline className="text-2xl text-black w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
