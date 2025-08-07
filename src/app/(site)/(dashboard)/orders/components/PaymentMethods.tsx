'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
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
    </Fragment>
  );
}
