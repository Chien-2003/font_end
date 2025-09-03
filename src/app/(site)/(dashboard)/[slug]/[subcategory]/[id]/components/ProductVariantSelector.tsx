'use client';

import { useCart } from '@/contexts/CartContext';
import { alertError, alertSuccess } from '@/lib/alerts';
import { addToCart } from '@/services/cartApi';
import { createOrder } from '@/services/orderApi';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FiCheck,
  FiMinus,
  FiPackage,
  FiPlus,
  FiShoppingCart,
  FiX,
  FiZap,
} from 'react-icons/fi';

export interface ProductVariant {
  id: string;
  product_id: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
  image: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

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
  const getColorStyle = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      đỏ: '#ef4444',
      red: '#ef4444',
      xanh: '#3b82f6',
      blue: '#3b82f6',
      vàng: '#eab308',
      yellow: '#eab308',
      đen: '#1f2937',
      black: '#1f2937',
      trắng: '#f8fafc',
      white: '#f8fafc',
      xám: '#6b7280',
      gray: '#6b7280',
      hồng: '#ec4899',
      pink: '#ec4899',
      tím: '#8b5cf6',
      purple: '#8b5cf6',
      cam: '#f97316',
      orange: '#f97316',
      'xanh lá': '#22c55e',
      green: '#22c55e',
    };
    return colorMap[colorName.toLowerCase()] || '#6b7280';
  };

  const handleAddToCart = async () => {
    if (!currentVariant) return;
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!currentVariant) return;
    setBuyNowLoading(true);
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
            price: currentVariant.price,
            image: currentVariant.image,
          },
        ],
      };
      await createOrder(orderData);
      router.push('/orders/create-order');
    } catch (error) {
      alertError('Mua ngay thất bại!');
    } finally {
      setBuyNowLoading(false);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 p-6 bg-gradient-to-br from-background via-background/50 to-background rounded-lg shadow-none border border-border"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">
              Chọn màu sắc
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {colors.map((color, index) => (
              <motion.button
                key={color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedColor(color)}
                className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  color === selectedColor
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
                `}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                    getColorStyle(color) === '#f8fafc'
                      ? 'border-gray-300'
                      : ''
                  }`}
                  style={{ backgroundColor: getColorStyle(color) }}
                />
                <span
                  className={`font-medium text-sm ${
                    color === selectedColor
                      ? 'text-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  {color}
                </span>
                {color === selectedColor && (
                  <motion.div
                    layoutId="selectedColor"
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    <FiCheck className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl">
              <FiPackage className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">
              Chọn kích thước
            </h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {variantsByColor.map((variant, index) => (
              <motion.button
                key={variant.size}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: variant.quantity === 0 ? 1 : 1.05,
                }}
                whileTap={{
                  scale: variant.quantity === 0 ? 1 : 0.95,
                }}
                onClick={() => setSelectedSize(variant.size)}
                disabled={variant.quantity === 0}
                title={`Số lượng còn lại: ${variant.quantity}`}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer font-semibold ${
                  variant.size === selectedSize
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-teal-50 text-green-700 shadow'
                    : variant.quantity === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                }
                `}
              >
                {variant.size}
                {variant.quantity === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiX className="w-6 h-6 text-red-400" />
                  </div>
                )}
                {variant.size === selectedSize &&
                  variant.quantity > 0 && (
                    <motion.div
                      layoutId="selectedSize"
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <FiCheck className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl">
                <FiPackage className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">
                Số lượng
              </h3>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                (currentVariant?.quantity ?? 0) > 10
                  ? 'bg-green-100 text-green-700'
                  : (currentVariant?.quantity ?? 0) > 5
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              Còn lại: {currentVariant?.quantity ?? 0}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-background border-2 border-border rounded-2xl shadow-none overflow-hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-4 hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Giảm số lượng"
              >
                <FiMinus className="w-5 h-5 text-foreground" />
              </motion.button>

              <div className="px-6 py-4 bg-background min-w-[80px] text-center">
                <span className="text-xl font-semibold text-foreground">
                  {quantity}
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onQuantityChange(quantity + 1)}
                disabled={quantity >= (currentVariant?.quantity ?? 1)}
                className="p-4 hover:bg-background/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Tăng số lượng"
              >
                <FiPlus className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                !currentVariant ||
                currentVariant.quantity === 0 ||
                isLoading
              }
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>Thêm vào giỏ</span>
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={
              !currentVariant ||
              currentVariant.quantity === 0 ||
              buyNowLoading
            }
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
          >
            <FiZap className="w-6 h-6" />
            <span>MUA NGAY</span>
          </motion.button>
        </div>
      </motion.div>
    </Fragment>
  );
}
