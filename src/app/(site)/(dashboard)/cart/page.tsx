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
import {
  ChevronRight,
  CreditCard,
  Loader2,
  Package,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return <CartPageSkeleton />;
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 p-6 rounded-xl border border-border shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Giỏ hàng của bạn
              </h1>
            </div>
            <Link
              href="/orders/create-order"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
            >
              <Package className="w-4 h-4" />
              Trang đặt hàng
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-muted/30 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Giỏ hàng đang trống
            </h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và
              thêm chúng vào giỏ hàng!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
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

      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 p-6 rounded-xl border border-border shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Giỏ hàng của bạn
              </h1>
              <p className="text-sm text-muted-foreground">
                {cartItems.length} sản phẩm trong giỏ hàng
              </p>
            </div>
          </div>
          <Link
            href="/orders/create-order"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          >
            <Package className="w-4 h-4" />
            Trang đặt hàng
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 border border-border shadow-none dark:bg-gray">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="font-medium text-foreground">
                    Chọn tất cả ({cartItems.length})
                  </span>
                </div>

                {selectedItems.length > 0 && (
                  <button
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline font-medium cursor-pointer"
                    onClick={() => setSelectedItems([])}
                  >
                    Bỏ chọn tất cả
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const product = item.variant?.product;
                  if (!product) return null;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 items-start p-4 rounded-lg bg-card dark:bg-gray border border-border/50 hover:border-border transition-colors"
                    >
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() =>
                          toggleSelectItem(item.id)
                        }
                        className="mt-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />

                      <div
                        className="w-24 h-24 rounded-lg overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                          setPreviewImage(product.image_url[0]);
                          setOpenImage(true);
                        }}
                      >
                        <Image
                          src={product.image_url[0]}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Số lượng:
                            </span>
                            <span className="font-medium text-foreground">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Size:
                            </span>
                            <span className="font-medium text-foreground">
                              {item.variant?.size}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Màu:
                            </span>
                            <span className="font-medium text-foreground uppercase">
                              {item.variant?.color}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Giá:
                            </span>
                            <span className="font-semibold text-primary">
                              {formatVND(Number(product.price))}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="p-2 bg-primary hover:bg-primary/90 text-background hover:text-background border-none transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="p-6 border border-border shadow-none dark:bg-gray sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Tóm tắt đơn hàng
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Sản phẩm đã chọn:
                  </span>
                  <span className="font-medium text-foreground">
                    {selectedItems.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Tạm tính:
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatVND(totalPrice)}
                  </span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">
                      Tổng cộng:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {formatVND(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                disabled={selectedItems.length === 0 || isSubmitting}
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang xử lý...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Đặt hàng ({selectedItems.length})
                  </div>
                )}
              </Button>

              {selectedItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Vui lòng chọn sản phẩm để tiếp tục
                </p>
              )}
            </Card>
          </div>
        </div>
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
                  className="object-contain max-h-[90vh] w-full rounded-lg"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
