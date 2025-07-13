"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { addToCart } from "@/lib/cartApi";
import { showError, showSuccess } from "@/lib/swal";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Variant {
  id: number;
  size: string;
  quantity: number;
}

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  image_url: string;
  image_hover_url?: string;
  variants: Variant[];
}

export default function ProductCard({
  name,
  description,
  price,
  oldPrice,
  discountPercent,
  image_url,
  image_hover_url,
  variants,
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
        <CardHeader className="p-0 relative h-[431px] overflow-hidden group">
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
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30 border-none">
            <div className="bg-gray-400/20 backdrop-blur-[15px] border-none p-5 rounded-lg shadow-none min-w-[calc(290px-16px)] text-center">
              <p className="text-base text-start text-black mb-2">
                Thêm nhanh vào giỏ hàng <span className="text-lg">+</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    className="text-sm bg-white text-black hover:bg-black text-center hover:text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                    onClick={() => {
                      addToCart(variant.id, 1)
                        .then(() => {
                          refreshCart();
                          showSuccess("Đã thêm vào giỏ hàng!");
                        })
                        .catch(() => showError("Thêm vào giỏ hàng thất bại!"));
                    }}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
              <span className="text-lg font-bold">{price}</span>
              {oldPrice && (
                <span className="text-sm line-through ml-2 text-muted-foreground">
                  {oldPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
