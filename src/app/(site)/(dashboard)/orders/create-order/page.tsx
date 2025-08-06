'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from '@/hooks/useLocation';
import { getOrders, Order } from '@/services/orderApi';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type PaymentMethod = 'cod' | 'zalopay' | 'momo' | 'vnpay';
export interface OrdersResponse {
  common: {
    status: string;
    order_address?: any;
    note?: string | null;
    payment_method?: string;
    payment_status?: string | null;
    shipping_info?: any;
    user: {
      id: string;
      user_name: string;
      email: string;
    };
  };
  orders: Order[];
}
export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [detail, setDetail] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [otherReceiver, setOtherReceiver] = useState(false);
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const [selected, setSelected] = useState<PaymentMethod>('cod');
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
      const found = districts.find(
        (d) => d.code === districtCodeFromUser,
      );
      if (found) setDistrictCode(districtCodeFromUser);
    }
  }, [districts, user, setDistrictCode]);

  useEffect(() => {
    if (user?.order_address && wards.length > 0) {
      const wardCodeFromUser =
        user.order_address.codes?.ward_code ?? '';
      const found = wards.find((w) => w.code === wardCodeFromUser);
      if (found) setWardCode(wardCodeFromUser);
    }
  }, [wards, user, setWardCode]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getOrders();
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div>Đang tải đơn hàng...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  // if (!data) return <div>Không có dữ liệu đơn hàng</div>;
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
          <div className="grid w-full gap-2">
            <Label id="note" htmlFor="note">
              Nhập ghi chú
            </Label>
            <Textarea placeholder="Nhập ghi chú" id="note" />
          </div>
          <div className="relative h-[1px] w-full my-5 bg-neutral-900/10 dark:bg-gray-500 max-lg:hidden"></div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="other-receiver"
                checked={otherReceiver}
                onCheckedChange={(val) => setOtherReceiver(!!val)}
              />
              <Label
                htmlFor="other-receiver"
                className="text-primary font-semibold cursor-pointer"
              >
                Gọi người khác nhận hàng (nếu có)
              </Label>
            </div>
            <AnimatePresence initial={false}>
              {otherReceiver && (
                <motion.div
                  key="other-receiver-info"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded p-4 space-y-4 bg-neutral-100 dark:bg-gray-900"
                >
                  <RadioGroup
                    defaultValue="nu"
                    className="flex items-center gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nam" id="r-nam" />
                      <label
                        htmlFor="r-nam"
                        className="text-sm font-medium leading-none"
                      >
                        Nam
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nu" id="r-nu" />
                      <label
                        htmlFor="r-nu"
                        className="text-sm font-medium leading-none"
                      >
                        Nữ
                      </label>
                    </div>
                  </RadioGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      className="rounded-full h-11 px-4 bg-white dark:bg-gray-900 dark:border-white"
                      placeholder="Họ và tên người nhận"
                    />
                    <Input
                      className="rounded-full h-11 px-4 bg-white dark:bg-gray-900 dark:border-white"
                      placeholder="Số điện thoại người nhận"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative h-[1px] w-full my-5 bg-neutral-900/10 dark:bg-gray-500 max-lg:hidden"></div>
          <h2 className="mb-2 font-criteria text-xl leading-6 lg:mb-5 lg:text-[28px] lg:leading-10">
            Hình thức thanh toán
          </h2>
          <RadioGroup
            value={selected}
            onValueChange={(val) => setSelected(val as PaymentMethod)}
            className="space-y-2"
          >
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-center gap-2 border rounded-xl px-4 py-2 lg:gap-4 transition cursor-pointer ${
                  selected === option.id
                    ? 'dark:bg-gray-900 border-blue-600'
                    : 'dark:bg-gray-800'
                }`}
              >
                <RadioGroupItem
                  value={option.id}
                  id={`payment-${option.id}`}
                  className="h-5 w-5"
                />
                <label
                  htmlFor={`payment-${option.id}`}
                  className="flex items-center gap-2 w-full cursor-pointer"
                >
                  <div className="w-12 h-12 relative shrink-0">
                    <Image
                      src={option.icon}
                      alt={option.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-sans text-sm font-semibold">
                      {option.label}
                    </div>
                    {option.subLabel && (
                      <div className="font-sans text-xxs leading-2.5 lg:text-xs">
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
                </label>
              </div>
            ))}
          </RadioGroup>

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
              <div className="mt-1 flex items-end justify-start">
                <div className="flex items-center gap-0.5 text-sm opacity-70 hover:text-red-500 cursor-pointer justify-center">
                  <Trash2 className="w-4 h-4" />
                  <div className="flex items-center text-center mt-1">
                    Xóa
                  </div>
                </div>
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
                <div className="line-clamp-1 font-sans text-sm text-neutral-600 lg:text-base lg:leading-4.5 flex gap-2 items-center">
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
                      {' '}
                      {
                        paymentOptions.find(
                          (opt) => opt.id === selected,
                        )?.subLabel
                      }{' '}
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
