'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { deleteCartItem } from '@/lib/cartApi';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import { Trash2, ShoppingCart, X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { CartPageSkeleton } from '@/components/skeleton/CartPageSkeleton';

import Alert from '@/components/shared/Alert';

function formatVND(value: number) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

export default function CartPage() {
  const { cartItems, refreshCart, isLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // đổi thành string[]
  const [openImage, setOpenImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    null,
  );

  // Alert state
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<
    'info' | 'error' | 'success'
  >('info');

  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
          <ShoppingCart className="w-12 h-12" />
          <p className="mt-2 text-sm">Giỏ hàng của bạn đang trống</p>
        </div>
      </div>
    );
  }

  const isAllSelected = selectedItems.length === cartItems.length;

  const toggleSelectItem = (id: string) => {
    // id string
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
    // id string
    try {
      const res = await deleteCartItem(id);
      await refreshCart();
      setSelectedItems((prev) =>
        prev.filter((itemId) => itemId !== id),
      );
      setAlertType('success');
      setAlertMessage(res.message || 'Xóa sản phẩm thành công!');
    } catch (err: any) {
      console.error('Lỗi khi xoá sản phẩm:', err);
      setAlertType('error');
      setAlertMessage(
        err?.response?.data?.message ||
          err.message ||
          'Có lỗi xảy ra!',
      );
    }
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => {
      const price = Number(item.variant?.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 relative">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <Card className="p-4">
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
                    setPreviewImage(product.image_url);
                    setOpenImage(true);
                  }}
                >
                  <Image
                    src={product.image_url}
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
                    <div
                      className="w-4 h-4 border border-gray-300"
                      style={{ backgroundColor: item.variant?.color }}
                    />
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
                  className="text-red-600 hover:text-red-800 mt-1"
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
          <Button disabled={selectedItems.length === 0}>
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
            <button
              onClick={() => setOpenImage(false)}
              className="absolute top-4 right-4 text-white bg-black/60 rounded-full p-2 z-10"
            >
              <X className="w-5 h-5" />
            </button>

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

      <Alert
        type={alertType}
        message={alertMessage}
        onClose={() => setAlertMessage('')}
      />
    </div>
  );
}
