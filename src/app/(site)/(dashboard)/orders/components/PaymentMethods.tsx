'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { CheckCircle2, CreditCard, Shield } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment } from 'react';

export type PaymentMethod = 'cod' | 'zalopay' | 'momo' | 'vnpay';

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  subLabel?: string;
  icon: string;
  image?: string;
}

interface PaymentMethodsProps {
  paymentOptions: PaymentMethodOption[];
  selected: PaymentMethod;
  setSelected: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

export default function PaymentMethods({
  paymentOptions,
  selected,
  setSelected,
}: PaymentMethodsProps) {
  return (
    <Fragment>
      <div className="relative my-8 max-lg:hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
        <div className="relative flex my-5 justify-center">
          <div className="bg-background dark:bg-gray px-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Hình thức thanh toán
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Chọn phương thức thanh toán phù hợp với bạn
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/30 px-4 py-2 rounded-lg border border-border/50 w-fit">
          <Shield className="w-4 h-4 text-primary" />
          <span>Thanh toán được bảo mật 100%</span>
        </div>
      </div>
      <RadioGroup
        value={selected}
        onValueChange={(val) => setSelected(val as PaymentMethod)}
        className="space-y-3"
      >
        {paymentOptions.map((option, index) => {
          const isSelected = selected === option.id;
          return (
            <div
              key={option.id}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-primary bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 shadow shadow-primary/10'
                  : 'border-border/50 bg-card hover:border-primary/30 hover:bg-accent/5 hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 p-5 lg:p-6">
                <div className="relative">
                  <RadioGroupItem
                    value={option.id}
                    id={`payment-${option.id}`}
                    className={`h-5 w-5 border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                        : 'border-muted-foreground/30 hover:border-primary/50'
                    }`}
                  />
                  {isSelected && (
                    <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
                  )}
                </div>

                <label
                  htmlFor={`payment-${option.id}`}
                  className="flex items-center gap-4 w-full cursor-pointer"
                >
                  <div
                    className={`relative w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'border-primary/30 bg-primary/10 shadow shadow-primary/20'
                        : 'border-border/30 bg-accent/20 group-hover:border-primary/20 group-hover:bg-primary/5'
                    }
                  `}
                  >
                    <Image
                      src={option.icon}
                      alt={option.label}
                      width={32}
                      height={32}
                      className="object-contain filter group-hover:brightness-110 transition-all duration-200"
                    />
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className={`
                      font-semibold text-base transition-colors duration-200
                      ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}
                    `}
                    >
                      {option.label}
                    </div>

                    {option.subLabel && (
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {option.subLabel}
                      </div>
                    )}
                    {option.image && (
                      <div className="mt-3">
                        <div className="relative w-40 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                          <Image
                            src={option.image}
                            alt={`${option.label} supported cards`}
                            fill
                            className="object-contain object-left"
                          />
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <div className="flex items-center gap-2 mt-3 text-xs text-primary/80">
                        <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                        <span>
                          {option.id === 'cod' &&
                            'Thanh toán khi nhận hàng'}
                          {option.id === 'zalopay' &&
                            'Cashback 1% cho giao dịch đầu tiên'}
                          {option.id === 'momo' &&
                            'Ưu đãi đặc biệt từ MoMo'}
                          {option.id === 'vnpay' &&
                            'Bảo mật cao với VNPay'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-300 transform ${
                      isSelected
                        ? 'rotate-90 text-primary opacity-100'
                        : 'rotate-0 text-muted-foreground/50 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </label>
              </div>
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary/5 to-transparent'
                    : 'bg-gradient-to-r from-accent/10 to-transparent'
                }`}
              ></div>
            </div>
          );
        })}
      </RadioGroup>
      <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-border/30">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              Cam kết bảo mật
            </p>
            <p className="leading-relaxed">
              Thông tin thanh toán của bạn được mã hóa SSL 256-bit và
              tuân thủ tiêu chuẩn PCI DSS. Chúng tôi không lưu trữ
              thông tin thẻ của bạn.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
