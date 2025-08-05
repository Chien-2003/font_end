'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCart } from '@/contexts/CartContext';
import { addToCart } from '@/lib/cartApi';
import { showError, showSuccess } from '@/lib/swal';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface Variant {
  id: string;
  size: string;
  quantity: number;
  color?: string;
}

interface ProductCardProps {
  id: string;
  categorySlug: string;
  subcategorySlug?: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  image_url: string[];
  image_hover_url?: string;
  variants: Variant[];
  index?: number;
}

export default function ProductCard({
  id,
  categorySlug,
  subcategorySlug,
  name,
  description,
  price,
  oldPrice,
  discountPercent,
  image_url,
  image_hover_url,
  variants,
  index,
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
      ease: 'power3.out',
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    const card = cardRef.current;
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const mainImage =
    image_url.length > 0 ? image_url[0] : '/placeholder.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: index ? index * 0.25 : 0,
      }}
    >
      <Card
        ref={cardRef}
        className="h-full border shadow-none py-0 rounded-none"
      >
        <CardHeader className="p-0 relative h-[431px] overflow-hidden group">
          <Link href={`/${categorySlug}/${subcategorySlug}/${id}`}>
            <Image
              width={287}
              height={431}
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
              src={mainImage}
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
          </Link>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30">
            <div className="bg-gray-400/20 backdrop-blur-[15px] border-none p-5 rounded-lg shadow-none md:w-[calc(290px-16px)] lg:w-[calc(290px-16px)] text-center">
              <p className="text-base text-start text-black mb-2">
                Thêm nhanh vào giỏ hàng{' '}
                <span className="text-lg">+</span>
              </p>
              <TooltipProvider>
                <div className="flex flex-wrap items-center gap-3">
                  {variants.map((variant) => (
                    <VariantAddButton
                      key={variant.id}
                      variant={variant}
                      refreshCart={refreshCart}
                    />
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 flex flex-col flex-grow">
          <Link href={`/${categorySlug}/${subcategorySlug}/${id}`}>
            <h3 className="text-sm font-semibold mb-2 hover:text-primary">
              {name.length > 32 ? `${name.slice(0, 32)}...` : name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            {description.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>
          <div className="flex justify-between items-end mt-auto">
            <div className="flex items-baseline gap-2 space-x-3">
              {oldPrice !== undefined && oldPrice > price && (
                <span className="text-sm line-through text-muted-foreground">
                  {oldPrice}
                </span>
              )}
              {typeof discountPercent === 'number' &&
                discountPercent > 0 && (
                  <div className="text-xs bg-blue-500 text-white font-semibold px-2 py-1 rounded-full z-30">
                    -{discountPercent}%
                  </div>
                )}
              <span className="text-base font-bold">{price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface VariantAddButtonProps {
  variant: Variant;
  refreshCart: () => void;
}

function VariantAddButton({
  variant,
  refreshCart,
}: VariantAddButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const pulseTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const btn = btnRef.current;

    const onEnter = () => {
      pulseTween.current?.kill();

      gsap.to(btn, {
        scale: 1.1,
        boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.7)',
        background:
          'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)',
        color: '#fff',
        duration: 0.3,
        ease: 'power3.out',
      });

      pulseTween.current = gsap.to(btn, {
        boxShadow: '0 0 25px 8px rgba(59, 130, 246, 0.9)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 1.2,
      });
    };

    const onLeave = () => {
      pulseTween.current?.kill();
      pulseTween.current = null;

      gsap.to(btn, {
        scale: 1,
        boxShadow: 'none',
        background: '#fff',
        color: '#000',
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const onClick = () => {
      gsap.fromTo(
        btn,
        { scale: 1.1 },
        { scale: 1, duration: 0.2, ease: 'bounce.out' },
      );
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('click', onClick);

    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('click', onClick);
      pulseTween.current?.kill();
      pulseTween.current = null;
    };
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          ref={btnRef}
          className="text-sm bg-white text-black px-4 py-2 rounded-md cursor-pointer select-none transition-colors"
          onClick={() => {
            addToCart(variant.id, 1)
              .then(() => {
                refreshCart();
                showSuccess('Đã thêm vào giỏ hàng!');
              })
              .catch(() => showError('Thêm vào giỏ hàng thất bại!'));
          }}
          type="button"
        >
          {variant.size}
        </button>
      </TooltipTrigger>
      <TooltipContent className="text-white">
        Màu sắc:{' '}
        <span className="font-medium uppercase text-white">
          {variant.color || 'Null'}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
