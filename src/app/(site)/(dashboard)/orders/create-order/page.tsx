'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from '@/hooks/useLocation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
type PaymentMethod = 'cod' | 'zalopay' | 'momo' | 'vnpay';
export default function CheckoutPage() {
  const { user } = useUser();
  const [selected, setSelected] = useState<PaymentMethod>('vnpay');

  const paymentOptions: {
    id: PaymentMethod;
    label: string;
    subLabel?: string;
    icon: string;
    image?: string;
    note?: string;
  }[] = [
    {
      id: 'cod',
      label: 'Thanh toán khi nhận hàng',
      icon: '/cod.png',
    },
    {
      id: 'zalopay',
      label: 'Thanh toán qua Zalopay',
      subLabel: 'Hỗ trợ mọi hình thức thanh toán',
      icon: '/zalo.png',
      image: '/napas.png',
    },
    {
      id: 'momo',
      label: 'Ví Momo',
      icon: '/momo.png',
    },
    {
      id: 'vnpay',
      label: 'Ví điện tử VNPAY',
      subLabel: 'Quét QR để thanh toán',
      icon: '/vnpay.png',
    },
  ];
  const {
    provinces,
    districts,
    wards,
    provinceCode,
    setProvinceCode,
    districtCode,
    setDistrictCode,
    wardCode,
    setWardCode,
  } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [detail, setDetail] = useState('');
  useEffect(() => {
    if (user) {
      setName(user.full_name ?? '');
      setEmail(user.email);
      setPhone(user.phone ?? '');
    }
  }, [user]);
  useEffect(() => {
    if (user?.order_address) {
      const { codes, detail } = user.order_address;
      setProvinceCode(codes?.province_code ?? '');
      setDetail(detail ?? '');
    }
  }, [user, setProvinceCode, setDetail]);
  useEffect(() => {
    if (user?.order_address && districts.length > 0) {
      const districtCodeFromUser =
        user.order_address.codes?.district_code ?? '';
      if (districtCodeFromUser) {
        const foundDistrict = districts.find(
          (d) => d.code === districtCodeFromUser,
        );
        if (foundDistrict) {
          setDistrictCode(districtCodeFromUser);
        }
      }
    }
  }, [districts, user, setDistrictCode]);
  useEffect(() => {
    if (user?.order_address && wards.length > 0) {
      const wardCodeFromUser =
        user.order_address.codes?.ward_code ?? '';
      if (wardCodeFromUser) {
        const foundWard = wards.find(
          (w) => w.code === wardCodeFromUser,
        );
        if (foundWard) {
          setWardCode(wardCodeFromUser);
        }
      }
    }
  }, [wards, user, setWardCode]);

  return (
    <div className="max-w-7xl mx-auto px-3 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
            Thông tin vận chuyển
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Input placeholder="Email" value={email} disabled />

          <Input
            placeholder="Số nhà, tên đường..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          <div className="flex flex-row gap-2">
            <Select
              onValueChange={setProvinceCode}
              value={provinceCode}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p.code} value={p.code}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setDistrictCode}
              value={districtCode}
              disabled={!provinceCode}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.code} value={d.code}>
                    {d.name_with_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setWardCode}
              value={wardCode}
              disabled={!districtCode}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phường/xã" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem key={w.code} value={w.code}>
                    {w.name_with_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea placeholder="Nhập ghi chú" />

          <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
            Hình thức thanh toán
          </h2>
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 border rounded-xl px-4 py-2 lg:gap-4 ${
                selected === option.id
                  ? 'dark:bg-neutral-100 border-blue-600'
                  : 'dark:bg-white'
              } cursor-pointer transition`}
              onClick={() => setSelected(option.id)}
            >
              <input
                type="radio"
                name="payment"
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="w-5 h-5 checked:accent-blue-600 accent-white border border-gray-300 rounded-full cursor-pointer"
              />
              <div className="flex-shrink-0 w-12 h-12 relative">
                <Image
                  src={option.icon}
                  alt={option.label}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-sans text-sm font-semibold text-neutral-800">
                  {option.label}
                </div>
                {option.subLabel && (
                  <div className="font-sans text-xxs leading-2.5 text-neutral-500 lg:text-xs">
                    {option.subLabel}
                  </div>
                )}
                {option.image && (
                  <div className="flex-shrink-0 w-[156px] h-3 relative mt-1">
                    <Image
                      src={option.image}
                      alt={option.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <p className="text-sm mt-4">
            Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn
            hoàn toàn có thể trả lại sản phẩm.
            <br />
            Tìm hiểu thêm{' '}
            <Link
              href="/dich-vu-60-ngay-doi-tra"
              className="text-blue-600 font-medium underline"
            >
              Tại đây
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Giỏ hàng</h2>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Tất cả sản phẩm</span>
            </div>
            <button className="text-sm text-muted-foreground hover:underline cursor-pointer">
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
                <div className="flex items-center gap-0.5 text-sm opacity-70 hover:text-red-500 cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa</span>
                </div>
              </div>
            </div>
          </div>
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
        <div className="flex flex-1 items-center bg-primary/10 px-4 py-2">
          <div className="flex flex-1 items-center justify-center gap-0.5 md:gap-2 lg:justify-start lg:pl-8 xl:pl-12 2xl:pl-16">
            {selected && (
              <>
                <div className="w-12 h-12 relative">
                  <Image
                    src={
                      paymentOptions.find(
                        (opt) => opt.id === selected,
                      )?.icon || '/placeholder.png'
                    }
                    alt="Phương thức thanh toán"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="line-clamp-1 font-sans text-sm text-neutral-600 lg:text-base lg:leading-4.5 flex gap-1 items-center">
                  <strong>
                    {
                      paymentOptions.find(
                        (opt) => opt.id === selected,
                      )?.label
                    }
                  </strong>
                  {paymentOptions.find((opt) => opt.id === selected)
                    ?.subLabel && (
                    <>
                      {
                        paymentOptions.find(
                          (opt) => opt.id === selected,
                        )?.subLabel
                      }
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3.5">
          <div className="space-y-0.5 py-1 w-full justify-items-center">
            <div className="flex items-center gap-1 font-criteria text-lg font-bold text-primary lg:text-2xl lg:leading-9">
              194.000đ
            </div>
            <div className="lg:flex lg:items-center">
              <div className="font-sans text-xs text-neutral-900/70">
                Hoàn{' '}
                <span className="text-sm font-medium text-neutral-900">
                  2.000 CoolCash
                </span>
              </div>
              <div className="relative w-[1px] mx-2 h-5 bg-neutral-900/10 max-lg:hidden" />
              <div className="text-xs text-neutral-900/70">
                Tiết kiệm <span className="text-sm">5.000đ</span>
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
