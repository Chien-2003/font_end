'use client';

import { CartPageSkeleton } from '@/components/skeleton/CartPageSkeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { alertError, alertSuccess } from '@/lib/alerts';
import { deleteCartItem } from '@/services/cartApi';
import { createOrder } from '@/services/orderApi';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function formatVND(value: number) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

export default function CartPage() {
  const { cartItems, refreshCart, isLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openImage, setOpenImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    null,
  );
  const router = useRouter();

  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl w-full mx-auto px-4 py-6">
        <div className="flex items-center flex-row justify-between mb-6">
          <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
          <Link
            href="/orders/create-order"
            className="hover:underline hover:text-primary"
          >
            Tạo đơn hàng
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
          <ShoppingCart className="w-12 h-12" />
          <p className="mt-2 text-sm">Giỏ hàng của bạn đang trống</p>
        </div>
      </div>
    );
  }

  const isAllSelected = selectedItems.length === cartItems.length;

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      isAllSelected ? [] : cartItems.map((item) => item.id),
    );
  };

  const removeItem = async (id: string) => {
    try {
      const res = await deleteCartItem(id);
      await refreshCart();
      setSelectedItems((prev) =>
        prev.filter((itemId) => itemId !== id),
      );
      alertSuccess(res.message);
    } catch (err: any) {
      alertError(err?.response?.data?.message || err.message);
    }
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => {
      const price = Number(item.variant?.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);

  const handleCheckout = async () => {
    try {
      const selectedProducts = cartItems.filter((item) =>
        selectedItems.includes(item.id),
      );

      if (selectedProducts.length === 0) {
        alertError('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
        return;
      }
      const orderData = {
        items: selectedProducts.map((item) => ({
          variant_id: item.variant?.id ?? '',
          product_id: item.variant?.product?.id ?? '',
          product_name: item.variant?.product?.name ?? '',
          color: item.variant?.color ?? '',
          size: item.variant?.size ?? '',
          quantity: item.quantity,
          price: (item.variant?.product?.price ?? 0).toString(),
          image: item.variant?.product?.image_url?.[0] ?? '',
        })),
      };
      await createOrder(orderData);
      await Promise.all(
        selectedProducts.map((item) => deleteCartItem(item.id)),
      );
      await refreshCart();
      setSelectedItems([]);

      alertSuccess('Đơn hàng đã được tạo!');
      router.push('/orders/create-order');
    } catch (error: any) {
      alertError(
        error?.response?.data?.message || 'Thanh toán thất bại!',
      );
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 relative">
      <div className="flex items-center flex-row justify-between mb-6">
        <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
        <Link
          href="/orders/create-order"
          className="hover:underline hover:text-primary"
        >
          Tạo đơn hàng
        </Link>
      </div>

      <Card className="p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm">Chọn tất cả</span>
          </div>

          {selectedItems.length > 0 && (
            <button
              className="text-sm text-muted-foreground hover:underline"
              onClick={() => setSelectedItems([])}
            >
              Bỏ chọn tất cả
            </button>
          )}
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = item.variant?.product;
            if (!product) return null;

            return (
              <div
                key={item.id}
                className="flex gap-3 items-start border-b pb-4 last:border-b-0"
              >
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleSelectItem(item.id)}
                  className="mt-2"
                />

                <div
                  className="w-[190px] h-[150px] rounded overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => {
                    setPreviewImage(product.image_url[0]);
                    setOpenImage(true);
                  }}
                >
                  <Image
                    src={product.image_url[0]}
                    alt={product.name}
                    width={190}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Số lượng: {item.quantity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Size: {item.variant?.size}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Màu:
                    </span>
                    <span className="uppercase">
                      {item.variant?.color}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Giá:
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {formatVND(Number(product.price))}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800 mt-1 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-lg font-semibold">Tổng cộng:</h2>
          <p className="text-lg text-primary font-semibold">
            {formatVND(totalPrice)}
          </p>
        </div>
        <div className="text-right mt-4">
          <Button
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
            className="text-white bg-orange-500 hover:bg-orange-600"
          >
            Thanh toán ({selectedItems.length} sản phẩm)
          </Button>
        </div>
      </Card>
      <Dialog open={openImage} onOpenChange={setOpenImage}>
        <DialogContent className="p-0 max-w-4xl bg-transparent shadow-none border-none">
          <VisuallyHidden>
            <DialogTitle>Xem ảnh sản phẩm</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-full h-full flex justify-center items-center p-4">
            {previewImage && (
              <Image
                src={previewImage}
                alt="Xem ảnh sản phẩm"
                width={1000}
                height={1000}
                className="object-contain max-h-[90vh] w-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
