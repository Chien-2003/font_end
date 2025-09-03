'use client';

import { CreditCardForm } from '@/components/payment/CreditCard';
import { Label } from '@/components/ui/label';
import { Banknote, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const paymentMethods = [
  {
    id: 'cash',
    title: 'Thanh toán khi nhận hàng (COD)',
    description: 'Thanh toán bằng tiền mặt khi nhận được hàng',
    icon: '💵',
    popular: false,
  },
  {
    id: 'bank_transfer',
    title: 'Chuyển khoản ngân hàng',
    description: 'Thanh toán trực tuyến qua thẻ tín dụng/ghi nợ',
    icon: '💳',
    popular: true,
  },
  {
    id: 'momo',
    title: 'Ví MoMo',
    description: 'Thanh toán nhanh chóng qua ví điện tử MoMo',
    icon: '📱',
    popular: false,
  },
  {
    id: 'zalopay',
    title: 'ZaloPay',
    description: 'Thanh toán tiện lợi qua ví ZaloPay',
    icon: '🔔',
    popular: false,
  },
];

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [showCreditForm, setShowCreditForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedMethod === 'bank_transfer') {
      const timer = setTimeout(() => setShowCreditForm(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowCreditForm(false);
    }
  }, [selectedMethod]);

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className={`mb-8 transform transition-all duration-700 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:bg-primary/20">
            <Banknote className="w-4 h-4 text-primary transition-colors duration-300" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Hình thức thanh toán
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Chọn phương thức thanh toán phù hợp với bạn
        </p>
      </div>
      <div
        className={`bg-card border border-border rounded-xl p-6 shadow-sm transform transition-all duration-800 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="space-y-4 mb-6">
          <Label className="text-base font-semibold text-card-foreground">
            Chọn phương thức thanh toán
          </Label>

          <div className="grid gap-4">
            {paymentMethods.map((method, index) => (
              <div
                key={method.id}
                className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'
                } ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-background hover:bg-accent/50 hover:border-ring'
                }`}
                style={{
                  animationDelay: `${(index + 1) * 150}ms`,
                  transitionDelay: `${(index + 1) * 50}ms`,
                }}
                onClick={() => handleMethodSelect(method.id)}
              >
                {method.popular && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium transform rotate-12 shadow-sm">
                      Phổ biến
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary'
                        : 'border-input hover:border-ring'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-scale-in"></div>
                    )}
                  </div>
                  <div
                    className={`text-2xl transform transition-all duration-300 ${
                      selectedMethod === method.id
                        ? 'scale-110'
                        : 'scale-100'
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium transition-colors duration-300 ${
                        selectedMethod === method.id
                          ? 'text-primary'
                          : 'text-card-foreground'
                      }`}
                    >
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.description}
                    </p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedMethod === 'bank_transfer' && (
          <div
            className={`transform transition-all duration-700 ease-out ${
              showCreditForm
                ? 'opacity-100 translate-y-0 max-h-screen'
                : 'opacity-0 translate-y-4 max-h-0 overflow-hidden'
            }`}
          >
            <div className="border-t border-border pt-6 mt-6">
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">
                    Thông tin thẻ thanh toán
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Vui lòng nhập thông tin thẻ tín dụng hoặc thẻ ghi nợ
                  của bạn
                </p>
              </div>

              <div className="transform transition-all duration-500 delay-200">
                <CreditCardForm />
              </div>
            </div>
          </div>
        )}
        {selectedMethod && (
          <div
            className={`mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4 transform transition-all duration-600 delay-300 ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary">
                  Phương thức đã chọn
                </h4>
                <p className="text-sm text-muted-foreground">
                  {
                    paymentMethods.find(
                      (m) => m.id === selectedMethod,
                    )?.title
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`mt-4 text-xs text-muted-foreground transform transition-all duration-700 delay-700 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        <p>
          Thông tin thanh toán của bạn được bảo mật và mã hóa an toàn.
        </p>
      </div>
    </div>
  );
}
