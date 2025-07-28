'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
            Thông tin vận chuyển
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Nguyễn Đình Chiến" />
            <Input placeholder="0372277394" />
          </div>
          <Input
            placeholder="nguyendinhchien19042003@gmail.com"
            disabled
          />
          <Input placeholder="Nhập địa chỉ" />
          <div className="flex flex-row gap-2">
            <Select defaultValue="An Giang">
              <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="An Giang">An Giang</SelectItem>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                <SelectItem value="TP.HCM">TP.HCM</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="Thành phố Long Xuyên">
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Thành phố Long Xuyên">
                  Thành phố Long Xuyên
                </SelectItem>
                <SelectItem value="Huyện Chợ Mới">
                  Huyện Chợ Mới
                </SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="Phường Mỹ Bình">
              <SelectTrigger>
                <SelectValue placeholder="Chọn xã/phường" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phường Mỹ Bình">
                  Phường Mỹ Bình
                </SelectItem>
                <SelectItem value="Phường Mỹ Long">
                  Phường Mỹ Long
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea placeholder="Nhập ghi chú" />
          <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
            Hình thức thanh toán
          </h2>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Giỏ hàng</h2>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Tất cả sản phẩm</span>
            </div>
            <button className="text-sm text-muted-foreground hover:underline">
              Xóa tất cả
            </button>
          </div>

          <div className="flex gap-4">
            <input type="checkbox" className="mt-2" />
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
                      <span className="text-sm w-6 text-center">
                        1
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
                  <div className="basis-2/12 text-end font-sans max-lg:hidden">
                    <p className="text-base font-bold leading-5">
                      199.000đ
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-1 flex items-end justify-between">
                <div className="flex items-center flex-row gap-0.5 text-sm opacity-70 hover:text-red-500 border-none cursor-pointer">
                  <Trash2 className="w-4 h-4" />{' '}
                  <span className="flex items-center">Xóa</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Có <span className="font-semibold text-black">16</span>{' '}
            người đang thêm cùng sản phẩm giống bạn vào giỏ hàng.
          </p>

          <div className="border rounded-md p-4">
            <p className="font-semibold text-pink-600 mb-2">
              Ưu đãi dành riêng cho bạn
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Image
                  src="/placeholder.png"
                  width={80}
                  height={80}
                  alt="Combo"
                  className="mb-1"
                />
                Combo 5 Đôi Tất cổ trung Basics
              </div>
              <div>
                <Image
                  src="/placeholder.png"
                  width={80}
                  height={80}
                  alt="Combo"
                  className="mb-1"
                />
                Combo 4 Tất Nam Cổ Ngắn
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex min-h-19 items-stretch gap-8 bg-white">
        <div className="flex flex-1 items-center bg-primary/10 px-4 py-2"></div>
        <div className="flex flex-1 items-center justify-end gap-3.5">
          <div className="space-y-0.5 py-1 w-full justify-items-center">
            <div className="flex items-center gap-1 font-criteria text-lg font-bold text-primary lg:text-2xl lg:leading-9">
              194.000đ
            </div>
            <div className="lg:flex lg:items-center">
              <div className="font-sans text-xs text-neutral-900/70">
                Hoàn
                <span className="text-sm font-medium text-neutral-900">
                  2.000 CoolCash
                </span>
              </div>
              <div className="relative w-[1px] mx-2 h-5 bg-neutral-900/10 max-lg:hidden"></div>
              <div className="text-xs text-neutral-900/70">
                Tiết kiệm<span className="text-sm">5.000đ</span>
              </div>
            </div>
          </div>
          <Button
            variant="default"
            className="uppercase bg-gray-900 hover:bg-gray-800 h-full rounded-none text-base md:px-10 text-white"
          >
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
