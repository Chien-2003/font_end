'use client';

import { useUser } from '@/contexts/UserContext';
import { useLocation } from '@/hooks/useLocation';
import { getOrders, Order } from '@/services/orderApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartSummary from '../components/CartSummary';
import CheckoutFooter from '../components/CheckoutFooter';
import OtherReceiver from '../components/OtherReceiver';
import PaymentMethods from '../components/PaymentMethods';
import ShippingInfo from '../components/ShippingInfo';

type PaymentMethod = 'cod' | 'zalopay' | 'momo' | 'vnpay';

interface OrdersResponse {
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

  const paymentOptions = [
    {
      id: 'cod' as PaymentMethod,
      label: 'Thanh toán khi nhận hàng',
      icon: '/cod.png',
    },
    {
      id: 'zalopay' as PaymentMethod,
      label: 'Thanh toán qua Zalopay',
      subLabel: 'Hỗ trợ mọi hình thức thanh toán',
      icon: '/zalo.png',
      image: '/napas.png',
    },
    {
      id: 'momo' as PaymentMethod,
      label: 'Ví Momo',
      icon: '/momo.png',
    },
    {
      id: 'vnpay' as PaymentMethod,
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

  return (
    <div className="max-w-7xl mx-auto px-3 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <ShippingInfo
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            detail={detail}
            setDetail={setDetail}
            provinceCode={provinceCode}
            setProvinceCode={setProvinceCode}
            districtCode={districtCode}
            setDistrictCode={setDistrictCode}
            wardCode={wardCode}
            setWardCode={setWardCode}
            provinces={provinces}
            districts={districts}
            wards={wards}
          />
          <OtherReceiver
            otherReceiver={otherReceiver}
            setOtherReceiver={setOtherReceiver}
          />
          <PaymentMethods
            paymentOptions={paymentOptions}
            selected={selected}
            setSelected={setSelected}
          />
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
        <div>
          <CartSummary />
        </div>
      </div>
      <CheckoutFooter
        selected={selected}
        paymentOptions={paymentOptions}
      />
    </div>
  );
}
