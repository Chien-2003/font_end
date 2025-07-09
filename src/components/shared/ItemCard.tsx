"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { IoCartOutline } from "react-icons/io5";
import { addToCart } from "@/lib/cartApi";
import { showError, showSuccess } from "@/lib/swal";
import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
    <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3 mb-6">
      <Card
        ref={cardRef}
        className="flex flex-col h-full border shadow-none py-0 rounded-none"
      >
        <CardHeader className="p-0 relative h-[431px] overflow-hidden">
          <Image
            width={287}
            height={431}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
            src={image_url}
            alt={name}
          />
          {image_hover_url && (
            <Image
              ref={hoverImageRef}
              width={287}
              height={431}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 z-20 pointer-events-none"
              src={image_hover_url}
              alt={`${name} hover`}
            />
          )}
          {discountPercent && (
            <div className="absolute top-2 right-2 bg-blue-50 text-xs font-semibold px-2 py-1 rounded-full z-30">
              {discountPercent}%
            </div>
          )}
        </CardHeader>

        <CardContent className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold mb-2 hover:text-[#b4282b]">
            {name.length > 32 ? `${name.slice(0, 32)}...` : name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {description.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>
          <div className="flex justify-between items-end mt-auto">
            <div className="flex items-baseline">
              <span className="text-xl font-bold">{price}</span>
              {oldPrice && (
                <span className="text-sm line-through ml-2 text-muted-foreground">
                  {oldPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pb-2 mt-auto">
          <button
            className="ml-auto p-2 px-2 rounded transition-colors duration-200 ease-in-out cursor-pointer"
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
            <IoCartOutline className="text-2xl w-6 h-6" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
