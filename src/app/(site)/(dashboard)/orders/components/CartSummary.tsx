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
import { Minus, Plus, Trash2 } from 'lucide-react';
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
    return <div className="text-center">Đang tải giỏ hàng...</div>;
  if (error) return <EmptyPlaceholder description={error} />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Giỏ hàng</h2>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Checkbox id="check-all" />
          <label htmlFor="check-all" className="text-sm">
            Tất cả sản phẩm
          </label>
        </div>
        {orders.length > 0 && (
          <button className="text-sm text-muted-foreground hover:underline cursor-pointer">
            Xóa tất cả
          </button>
        )}
      </div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="flex flex-col w-full">
            {order.items.map((item, idx) => (
              <div
                key={item.variant_id + idx}
                className="flex gap-4 w-full border-b last:border-b-0 pb-4"
              >
                <div className="flex flex-col items-center justify-center">
                  <Checkbox className="mt-2" />
                </div>
                <Image
                  src={item.image}
                  width={80}
                  height={80}
                  alt={item.product_name}
                  className="rounded-md object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm font-medium">
                      <Link
                        href={getProductLink(
                          productDetails[item.product_id],
                        )}
                        className="hover:underline hover:text-primary"
                      >
                        {item.product_name}
                      </Link>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.color} / {item.size}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center w-full">
                      <div className="flex items-center gap-2 lg:flex-1 lg:gap-4">
                        <Select defaultValue={item.color}>
                          <SelectTrigger className="h-8 px-2 text-xs min-w-34">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.color}>
                              {item.color}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={item.size}>
                          <SelectTrigger className="h-8 px-2 text-xs min-w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.size}>
                              {item.size}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="lg:basis-3/12 2xl:basis-1/5">
                        <div className="flex h-8 w-fit items-center px-1 py-2 text-sm">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="basis-2/12 text-end font-sans">
                        <p className="text-base font-bold leading-5 text-primary">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-end justify-start">
                    <div
                      onClick={() => handleDeleteOrder(order.id)}
                      className="flex items-center gap-0.5 text-sm opacity-70 hover:text-primary cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="mt-1">Xóa</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-6">
          {message}
        </div>
      )}
    </div>
  );
}
