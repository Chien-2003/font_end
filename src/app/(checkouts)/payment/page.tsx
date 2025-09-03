'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { alertSuccess } from '@/lib/alerts';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CheckCircle,
  CreditCard,
  Gift,
  MapPin,
  MoveLeft,
  Package,
  QrCode,
  Smartphone,
  Truck,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] =
    useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsPageVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const orderItems = [
    {
      id: 1,
      name: 'Dell XPS 13',
      color: 'Xanh Navy',
      quantity: 1,
      price: 25990000,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      color: 'Đen',
      quantity: 1,
      price: 26990000,
      image:
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop',
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = selectedShipping === 'express' ? 40000 : 25000;
  const discountAmount = discountApplied ? 50000 : 0;
  const total = subtotal + shippingCost - discountAmount;

  const handleDiscountApply = () => {
    if (discountCode.toLowerCase() === 'save50') {
      setDiscountApplied(true);
    } else {
      const input = document.getElementById('discount-input');
      if (input) {
        input.classList.add('animate-pulse');
        setTimeout(
          () => input.classList.remove('animate-pulse'),
          500,
        );
      }
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alertSuccess('Đơn hàng đã được đặt thành công!');
    }, 3000);
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="group px-3 py-2 rounded-xl bg-background hover:bg-background/90 border border-border hover:border-border flex items-center gap-2 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
              >
                <MoveLeft className="w-4 h-4 text-foreground/90 group-hover:text-foreground transition-colors duration-200" />
                <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">
                  Quay lại
                </span>
              </Link>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Thanh toán đơn hàng
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-6">
              <div
                className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-700 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Thông tin người nhận
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="font-medium text-card-foreground">
                      Nguyễn Văn A
                    </div>
                    <div className="text-muted-foreground">
                      nguyenvana@email.com
                    </div>
                    <div className="text-muted-foreground">
                      0901234567
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium text-card-foreground">
                        Giao đến:
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      123 Đường Nguyễn Văn Linh, Phường 10
                    </div>
                    <div className="text-muted-foreground">
                      Quận 7, TP. Hồ Chí Minh
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-700 delay-200 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Phương thức vận chuyển
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      value: 'standard',
                      title: 'Giao hàng Tiêu chuẩn',
                      description: 'Dự kiến nhận hàng sau 2-4 ngày',
                      price: 25000,
                      color: 'text-primary',
                      bgColor: 'bg-primary/5',
                    },
                    {
                      value: 'express',
                      title: 'Giao hàng Hỏa tốc',
                      description:
                        'Dự kiến nhận hàng trong 24h (tại TP.HCM)',
                      price: 40000,
                      color: 'text-orange-500',
                      bgColor: 'bg-orange-50',
                    },
                  ].map((option, index) => (
                    <label
                      key={option.value}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedShipping === option.value
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/20'
                          : 'border-border hover:border-primary/50 hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.value}
                        checked={selectedShipping === option.value}
                        onChange={(e) =>
                          setSelectedShipping(e.target.value)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${option.bgColor} flex items-center justify-center`}
                          >
                            <Truck
                              className={`w-4 h-4 ${option.color}`}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-card-foreground">
                              {option.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {option.description}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-semibold ${option.color}`}
                        >
                          {option.price.toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div
                className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-700 delay-400 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    Phương thức thanh toán
                  </h2>
                </div>

                <div className="space-y-4">
                  <label
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedPayment === 'cod'
                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPayment === 'cod'}
                      onChange={(e) =>
                        setSelectedPayment(e.target.value)
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600 text-lg">
                          <BadgeDollarSign />
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-card-foreground">
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bạn sẽ thanh toán bằng tiền mặt cho nhân
                          viên giao hàng
                        </div>
                      </div>
                    </div>
                  </label>
                  <div>
                    <label
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedPayment === 'bank'
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/20'
                          : 'border-border hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={selectedPayment === 'bank'}
                        onChange={(e) =>
                          setSelectedPayment(e.target.value)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-card-foreground">
                            Chuyển khoản ngân hàng
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Thanh toán qua chuyển khoản
                          </div>
                        </div>
                      </div>
                    </label>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        selectedPayment === 'bank'
                          ? 'max-h-96 opacity-100 mt-4'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-muted/30 border border-border rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-card-foreground mb-3">
                              Thông tin chuyển khoản
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Ngân hàng:
                                </span>
                                <span className="text-card-foreground font-medium">
                                  Vietcombank
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Số tài khoản:
                                </span>
                                <span className="text-card-foreground font-medium">
                                  0123456789
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Chủ tài khoản:
                                </span>
                                <span className="text-card-foreground font-medium">
                                  CÔNG TY ABC
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Nội dung:
                                </span>
                                <span className="text-primary font-medium">
                                  DH
                                  {Math.random()
                                    .toString(36)
                                    .substr(2, 6)
                                    .toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <div className="w-32 h-32 bg-background border border-border rounded-xl flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                  <QrCode />
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  QR Code
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedPayment === 'ewallet'
                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="ewallet"
                      checked={selectedPayment === 'ewallet'}
                      onChange={(e) =>
                        setSelectedPayment(e.target.value)
                      }
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-card-foreground">
                            Ví điện tử
                          </div>
                          <div className="text-sm text-muted-foreground">
                            MoMo, ZaloPay, ShopeePay
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-6 bg-pink-500 rounded text-xs text-white flex items-center justify-center font-medium">
                          M
                        </div>
                        <div className="w-8 h-6 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-medium">
                          Z
                        </div>
                        <div className="w-8 h-6 bg-orange-500 rounded text-xs text-white flex items-center justify-center font-medium">
                          S
                        </div>
                      </div>
                    </div>
                  </label>
                  <div>
                    <label
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedPayment === 'card'
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/20'
                          : 'border-border hover:border-primary/50 hover:shadow-md'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedPayment === 'card'}
                        onChange={(e) =>
                          setSelectedPayment(e.target.value)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-card-foreground">
                              Thẻ Tín dụng/Ghi nợ
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Visa, Mastercard, JCB
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-8 h-6 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-medium">
                            V
                          </div>
                          <div className="w-8 h-6 bg-red-600 rounded text-xs text-white flex items-center justify-center font-medium">
                            M
                          </div>
                          <div className="w-8 h-6 bg-green-600 rounded text-xs text-white flex items-center justify-center font-medium">
                            J
                          </div>
                        </div>
                      </div>
                    </label>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        selectedPayment === 'card'
                          ? 'max-h-96 opacity-100 mt-4'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-muted/30 border border-border rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label
                              htmlFor="card-number"
                              className="mb-2"
                            >
                              Số thẻ
                            </Label>
                            <Input
                              id="card-number"
                              value={cardInfo.number}
                              readOnly
                              placeholder="1234 5678 9012 3456"
                              disabled
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label
                              htmlFor="card-name"
                              className="mb-2"
                            >
                              Tên trên thẻ
                            </Label>
                            <Input
                              id="card-name"
                              value={cardInfo.name}
                              readOnly
                              placeholder="NGUYEN VAN A"
                              disabled
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="card-expiry"
                              className="mb-2"
                            >
                              Ngày hết hạn
                            </Label>
                            <Input
                              id="card-expiry"
                              value={cardInfo.expiry}
                              readOnly
                              placeholder="MM/YY"
                              disabled
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="card-cvv"
                              className="mb-2"
                            >
                              Mã CVV
                            </Label>
                            <Input
                              id="card-cvv"
                              value={cardInfo.cvv}
                              readOnly
                              placeholder="123"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-700 delay-600 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(!!checked)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    Tôi đã đọc và đồng ý với các
                    <Link
                      href="#"
                      className="text-primary hover:text-primary/80 mx-1 transition-colors duration-200"
                    >
                      điều khoản và điều kiện
                    </Link>
                    của website
                  </Label>
                </label>
              </div>
              <div
                className={`transform transition-all duration-700 delay-800 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <Button
                  size="xxl"
                  onClick={handlePlaceOrder}
                  disabled={!agreedToTerms || isProcessing}
                  className={`w-full py-4 px-6 font-semibold uppercase text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                    agreedToTerms && !isProcessing
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      HOÀN TẤT thanh toán ĐƠN HÀNG
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div
                className={`bg-card border border-border rounded-xl shadow-sm sticky top-20 transform transition-all duration-700 delay-300 ease-out ${
                  isPageVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-card-foreground">
                      Tóm tắt đơn hàng
                    </h2>
                  </div>
                  <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                    {orderItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-300 ${
                          isPageVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-4'
                        }`}
                        style={{
                          animationDelay: `${(index + 5) * 100}ms`,
                        }}
                      >
                        <div className="w-18 h-18 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={72}
                            height={72}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-card-foreground truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Màu: {item.color} / SL: {item.quantity}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {(
                            item.price * item.quantity
                          ).toLocaleString('vi-VN')}
                          đ
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-6 p-4 bg-muted/30 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="font-medium text-card-foreground">
                        Mã giảm giá
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        id="discount-input"
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        value={discountCode}
                        onChange={(e) =>
                          setDiscountCode(e.target.value)
                        }
                        className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:border-ring transition-all duration-200"
                      />
                      <button
                        onClick={handleDiscountApply}
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {discountApplied && (
                      <div className="mt-3 flex items-center text-primary text-sm animate-in fade-in-0 slide-in-from-bottom-2">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mã giảm giá đã được áp dụng
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Tạm tính:
                      </span>
                      <span className="text-card-foreground">
                        {subtotal.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Phí vận chuyển:
                      </span>
                      <span
                        className={`transition-all duration-300 ${
                          selectedShipping === 'express'
                            ? 'text-orange-500'
                            : 'text-card-foreground'
                        }`}
                      >
                        {shippingCost.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-sm text-primary animate-in fade-in-0 slide-in-from-right-2">
                        <span>Giảm giá:</span>
                        <span>
                          -{discountAmount.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    )}
                    <div className="h-px bg-border my-4"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-card-foreground">
                        Tổng cộng:
                      </span>
                      <span className="text-primary transition-all duration-300 text-xl">
                        {total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
