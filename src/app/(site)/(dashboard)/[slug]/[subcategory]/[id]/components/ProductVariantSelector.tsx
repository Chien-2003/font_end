'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { alertError, alertSuccess } from '@/lib/alerts';
import { addToCart } from '@/services/cartApi';
import { createOrder } from '@/services/orderApi';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface ProductVariant {
  id: string;
  product_id: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
}

interface ProductVariantSelectorProps {
  productId: string;
  variants: ProductVariant[];
}

export default function ProductVariantSelector({
  productId,
  variants,
}: ProductVariantSelectorProps) {
  const { refreshCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstSync = useRef(true);
  const [variantsState, setVariantsState] =
    useState<ProductVariant[]>(variants);
  const colors = useMemo(
    () => Array.from(new Set(variantsState.map((v) => v.color))),
    [variantsState],
  );
  const getColorFromParams = () =>
    searchParams.get('color') || colors[0] || '';
  const getVariantsByColor = (color: string) =>
    variantsState.filter((v) => v.color === color);
  const getSizeFromParams = (colorVariants: ProductVariant[]) =>
    searchParams.get('size') || colorVariants[0]?.size || '';
  const getQuantityFromParams = () => {
    const q = parseInt(searchParams.get('quantity') || '', 10);
    return isNaN(q) || q < 1 ? 1 : q;
  };
  const [selectedColor, setSelectedColor] = useState(() =>
    getColorFromParams(),
  );
  const variantsByColor = useMemo(
    () => getVariantsByColor(selectedColor),
    [variants, selectedColor],
  );

  const [selectedSize, setSelectedSize] = useState(() =>
    getSizeFromParams(variantsByColor),
  );
  const [quantity, setQuantity] = useState(() =>
    getQuantityFromParams(),
  );

  const currentVariant = variantsByColor.find(
    (v) => v.size === selectedSize,
  );
  const handleAddToCart = async () => {
    if (!currentVariant) return;
    try {
      const res = await addToCart(currentVariant.id, quantity);
      await refreshCart();
      setVariantsState((prev) =>
        prev.map((v) =>
          v.id === currentVariant.id
            ? { ...v, quantity: v.quantity - quantity }
            : v,
        ),
      );
      alertSuccess(res?.message || 'Đã thêm vào giỏ hàng!');
    } catch (err: any) {
      alertError(
        err?.response?.data?.message ||
          err.message ||
          'Có lỗi xảy ra!',
      );
    }
  };
  const handleBuyNow = async () => {
    if (!currentVariant) return;
    try {
      const orderData = {
        items: [
          {
            variant_id: currentVariant.id,
            product_id: currentVariant.product_id,
            product_name: currentVariant.product_name,
            color: currentVariant.color,
            size: currentVariant.size,
            quantity,
          },
        ],
      };
      await createOrder(orderData);
      router.push('/orders/create-order');
    } catch (error) {
      alertError('Mua ngay thất bại!');
    }
  };

  useEffect(() => {
    const newColor = getColorFromParams();
    if (newColor !== selectedColor) setSelectedColor(newColor);

    const newVariantsByColor = getVariantsByColor(newColor);
    const newSize =
      searchParams.get('size') || newVariantsByColor[0]?.size || '';
    if (newSize !== selectedSize) setSelectedSize(newSize);

    const newQuantity = getQuantityFromParams();
    if (newQuantity !== quantity) setQuantity(newQuantity);
  }, [searchParams]);

  useEffect(() => {
    const firstSize = variantsByColor[0]?.size || '';
    if (firstSize !== selectedSize) setSelectedSize(firstSize);
    setQuantity(1);
  }, [selectedColor]);

  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('color', selectedColor);
    params.set('size', selectedSize);
    params.set('quantity', String(quantity));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedColor, selectedSize, quantity]);
  const onQuantityChange = (val: number) => {
    if (!currentVariant) return;
    const clamped = Math.max(
      1,
      Math.min(val, currentVariant.quantity),
    );
    setQuantity(clamped);
  };

  return (
    <Fragment>
      <div className="space-y-6">
        <div className="space-y-2.5">
          <p className="font-medium">Chọn màu:</p>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <Button
                key={color}
                variant={
                  color === selectedColor ? 'default' : 'outline'
                }
                onClick={() => setSelectedColor(color)}
                className="dark:text-white"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          <p className="font-medium">Chọn kích cỡ:</p>
          <div className="flex gap-2 flex-wrap">
            {variantsByColor.map((variant) => (
              <Button
                key={variant.size}
                variant={
                  variant.size === selectedSize
                    ? 'default'
                    : 'outline'
                }
                onClick={() => setSelectedSize(variant.size)}
                disabled={variant.quantity === 0}
                title={`Số lượng còn lại: ${variant.quantity}`}
                className="dark:text-white"
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
                className="h-full w-full md:w-10 lg:w-15 text-2xl"
                aria-label="Giảm số lượng"
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
                className="h-full w-full md:w-10 lg:w-15 text-2xl"
                aria-label="Tăng số lượng"
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
                onClick={handleAddToCart}
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
              onClick={handleBuyNow}
              className="w-full h-full uppercase bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-105"
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
