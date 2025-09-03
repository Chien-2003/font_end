'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyPlaceholder } from '@/components/views/EmptyPlaceholder';
import { alertError, alertSuccess } from '@/lib/alerts';
import { formatCurrency } from '@/lib/format';
import { deleteOrder, getOrders, Order } from '@/services/orderApi';
import { getProductDetail, Product } from '@/services/productsApi';
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function getProductLink(product?: Product) {
  if (!product) return '##';
  return `/${product.category.slug_category}/${product.subcategory?.slug ?? ''}/${product.id}`;
}

export default function CartSummary() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<
    Record<string, Product>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrdersAndDetails() {
      try {
        const res = await getOrders();
        setOrders(res.orders);
        const detailMap: Record<string, Product> = {};
        for (const order of res.orders) {
          for (const item of order.items) {
            if (!detailMap[item.product_id]) {
              try {
                const detail = await getProductDetail(
                  'ew-' + item.product_id,
                );
                detailMap[item.product_id] = detail;
              } catch (err) {
                console.error(
                  'Không lấy được chi tiết sản phẩm:',
                  err,
                );
              }
            }
          }
        }
        setProductDetails(detailMap);

        if (res.message) setMessage(res.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchOrdersAndDetails();
  }, []);

  async function handleDeleteOrder(orderId: string) {
    try {
      const res = await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      alertSuccess(res.message);
    } catch (err) {
      console.error('Xóa thất bại:', err);
      alertError('Xóa thất bại');
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96 bg-card rounded-xl border border-border/50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground font-medium">
            Đang tải giỏ hàng...
          </p>
        </div>
      </div>
    );

  if (error) return <EmptyPlaceholder description={error} />;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/10 rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Giỏ hàng của bạn
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              id="check-all"
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="check-all"
              className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
            >
              Chọn tất cả (
              {orders.reduce(
                (total, order) => total + order.items.length,
                0,
              )}{' '}
              sản phẩm)
            </label>
          </div>
          {orders.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa tất cả
            </Button>
          )}
        </div>
      </div>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-background dark:bg-gray rounded-lg border border-border/50 hover:shadow transition-all duration-300 overflow-hidden"
            >
              {order.items.map((item, idx) => (
                <div
                  key={item.variant_id + idx}
                  className="flex gap-4 px-2 py-4 border-b border-border/30 last:border-b-0 hover:bg-accent/5 transition-colors duration-200"
                >
                  <div className="flex items-start pt-2">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  </div>
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-lg border border-border/20">
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.product_name}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-2 -right-2 h-8 w-8 bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        <Link
                          href={getProductLink(
                            productDetails[item.product_id],
                          )}
                          className="line-clamp-2 hover:underline"
                        >
                          {item.product_name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="px-2 py-1 bg-accent/50 rounded-md font-medium">
                          {item.color}
                        </span>
                        <span className="text-border">•</span>
                        <span className="px-2 py-1 bg-accent/50 rounded-md font-medium">
                          {item.size}
                        </span>
                        <span className="text-border">•</span>
                        <div className="lg:basis-auto text-right">
                          <p className="text-xl font-bold text-primary">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 lg:items-center">
                      <div className="flex items-center gap-3 lg:flex-1">
                        <Select defaultValue={item.color}>
                          <SelectTrigger className="h-10 px-3 text-sm min-w-28 border-border/50 hover:border-primary/50 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.color}>
                              {item.color}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={item.size}>
                          <SelectTrigger className="h-10 px-3 text-sm min-w-20 border-border/50 hover:border-primary/50 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.size}>
                              {item.size}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="basis-auto">
                        <div className="flex items-center bg-accent/30 rounded-lg border border-border/50 overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm font-semibold px-4 py-2 min-w-12 text-center bg-background/50">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa khỏi giỏ hàng
                      </Button>

                      <div className="text-sm text-muted-foreground">
                        Miễn phí đổi trả trong 30 ngày
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border/50 p-12 text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Giỏ hàng trống
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {message ||
                'Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và thêm vào giỏ hàng'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-sm">
            Khám phá sản phẩm
          </Button>
        </div>
      )}
      {/* {orders.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Tổng cộng (
              {orders.reduce(
                (total, order) => total + order.items.length,
                0,
              )}{' '}
              sản phẩm):
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(
                orders.reduce(
                  (total, order) =>
                    total +
                    order.items.reduce(
                      (itemTotal, item) =>
                        itemTotal +
                        Number(item.price) * item.quantity,
                      0,
                    ),
                  0,
                ),
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              className="flex-1 h-12 font-semibold border-primary/20 hover:bg-primary/5 transition-all duration-200"
            >
              Tiếp tục mua sắm
            </Button>
            <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg">
              Thanh toán
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}
