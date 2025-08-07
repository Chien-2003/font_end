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
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartSummary() {
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
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center">
          <Checkbox className="mt-2" />
        </div>
        <Image
          src="/placeholder.png"
          width={80}
          height={80}
          alt="product"
          className="rounded-md object-cover"
        />
        <div className="flex-1 lg:flex lg:flex-col lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-medium">
              Tshirt chạy bộ AirRush Gradient
            </div>
            <div className="text-xs text-muted-foreground">
              Trắng / S
            </div>
            <div className="flex gap-2 items-center w-full">
              <div className="flex items-center gap-2 lg:flex-1 lg:gap-4">
                <Select defaultValue="Trắng">
                  <SelectTrigger className="h-8 px-2 text-xs w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trắng">Trắng</SelectItem>
                    <SelectItem value="Đỏ">Đỏ</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="S">
                  <SelectTrigger className="h-8 px-2 text-xs w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
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
                  <span className="text-sm w-6 text-center">1</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="basis-2/12 text-end font-sans max-lg:hidden">
                <p className="text-base font-bold leading-5">
                  199.000đ
                </p>
              </div>
            </div>
          </div>
          <div className="mt-1 flex items-end justify-start">
            <div className="flex items-center gap-0.5 text-sm opacity-70 hover:text-red-600 cursor-pointer justify-center">
              <Trash2 className="w-4 h-4" />
              <div className="flex items-center text-center mt-1">
                Xóa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
