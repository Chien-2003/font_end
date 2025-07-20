'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  quantity: number;
}

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
}

export default function ProductVariantSelector({
  variants,
}: ProductVariantSelectorProps) {
  const colors = useMemo(() => {
    return Array.from(new Set(variants.map((v) => v.color)));
  }, [variants]);
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const variantsOfSelectedColor = useMemo(() => {
    return variants.filter((v) => v.color === selectedColor);
  }, [variants, selectedColor]);
  const [selectedSize, setSelectedSize] = useState(
    variantsOfSelectedColor[0]?.size || '',
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(variantsOfSelectedColor[0]?.size || '');
    setQuantity(1);
  }, [selectedColor, variantsOfSelectedColor]);

  const currentVariant = variantsOfSelectedColor.find(
    (v) => v.size === selectedSize,
  );

  const onQuantityChange = (val: number) => {
    if (!currentVariant) return;
    if (val < 1) val = 1;
    if (val > currentVariant.quantity) val = currentVariant.quantity;
    setQuantity(val);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2.5 ">
        <p className="font-medium">Chọn màu:</p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <Button
              key={color}
              variant={
                color === selectedColor ? 'default' : 'outline'
              }
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="font-medium">Chọn kích cỡ:</p>
        <div className="flex gap-2 flex-wrap">
          {variantsOfSelectedColor.map((variant) => (
            <Button
              key={variant.size}
              variant={
                variant.size === selectedSize ? 'default' : 'outline'
              }
              onClick={() => setSelectedSize(variant.size)}
              disabled={variant.quantity === 0}
              title={`Số lượng còn lại: ${variant.quantity}`}
            >
              {variant.size}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="font-medium">
          Số lượng còn lại: {currentVariant?.quantity ?? 0}
        </p>

        <div className="flex items-center gap-2 h-full">
          <div className="flex items-center gap-2 h-full md:h-10 lg:h-15">
            <Button
              variant="outline"
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Giảm số lượng"
              className="h-full w-full md:w-10 lg:w-15 text-2xl"
            >
              –
            </Button>

            <span className="lg:w-15 w-10 text-center items-center h-full flex justify-center">
              {quantity}
            </span>

            <Button
              variant="outline"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= (currentVariant?.quantity ?? 1)}
              aria-label="Tăng số lượng"
              className="h-full w-full md:w-10 lg:w-15 text-2xl"
            >
              +
            </Button>
          </div>
          <div className="h-full md:h-10 lg:h-15 w-full">
            <Button
              variant="outline"
              disabled={
                !currentVariant || currentVariant.quantity === 0
              }
              onClick={() => {}}
              className="w-full h-full"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="h-full md:h-10 lg:h-15 w-full">
          <Button
            disabled={
              !currentVariant || currentVariant.quantity === 0
            }
            onClick={() => {}}
            className="w-full h-full uppercase bg-orange-500 hover:bg-orange-600 text-white transform transition duration-300 ease-in-out hover:scale-105"
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
