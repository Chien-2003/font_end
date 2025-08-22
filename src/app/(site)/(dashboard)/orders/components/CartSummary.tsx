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
import { formatCurrency } from '@/lib/format';
import { getOrders, Order } from '@/services/orderApi';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CartSummary() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getOrders();
        setOrders(res.orders);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center">Đang tải giỏ hàng...</div>;
  if (error) return <div>Lỗi: {error}</div>;

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
        <button className="text-sm text-muted-foreground hover:underline cursor-pointer">
          Xóa tất cả
        </button>
      </div>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="flex gap-4 mb-4">
            {order.items.map((item, idx) => (
              <div
                key={item.variant_id + idx}
                className="flex gap-4 w-full"
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
                <div className="flex-1 lg:flex lg:flex-col lg:justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm font-medium">
                      {item.product_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.color} / {item.size}
                    </div>
                    <div className="flex lg:flex-row flex-col gap-2 lg:items-center items-start w-full">
                      <div className="flex items-center gap-2 lg:flex-1 lg:gap-4">
                        <Select defaultValue={item.color}>
                          <SelectTrigger className="h-8 px-2 text-xs w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={item.color}>
                              {item.color}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue={item.size}>
                          <SelectTrigger className="h-8 px-2 text-xs w-16">
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
                      {/* <div className="basis-2/12 text-end font-sans max-lg:hidden">
                        <p className="text-base font-bold leading-5"></p>
                      </div> */}
                    </div>
                  </div>
                  <div className="mt-1 flex items-end justify-start">
                    <div className="flex items-center gap-0.5 text-sm opacity-70 hover:text-primary cursor-pointer justify-center">
                      <Trash2 className="w-4 h-4" />
                      <div className="flex items-center text-center mt-1">
                        Xóa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>Không có sản phẩm trong giỏ hàng.</div>
      )}
    </div>
  );
}
