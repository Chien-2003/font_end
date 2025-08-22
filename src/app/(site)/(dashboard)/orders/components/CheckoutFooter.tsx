'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface CheckoutFooterProps {
  selected: string;
  paymentOptions: {
    id: string;
    label: string;
    subLabel?: string;
    icon: string;
  }[];
}

export default function CheckoutFooter({
  selected,
  paymentOptions,
}: CheckoutFooterProps) {
  const selectedOption = paymentOptions.find(
    (opt) => opt.id === selected,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex min-h-19 items-stretch gap-8 bg-white">
      <div className="flex flex-1 items-center bg-primary/10 px-4 py-2">
        <div className="flex flex-1 items-center justify-center gap-0.5 md:gap-2 lg:justify-start lg:pl-8 xl:pl-12 2xl:pl-16">
          {selectedOption && (
            <>
              <div className="w-12 h-12 relative">
                <Image
                  src={selectedOption.icon}
                  alt="Phương thức thanh toán"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="line-clamp-1 font-sans text-sm text-neutral-600 lg:text-base lg:leading-4.5 flex gap-2 items-center">
                <strong>{selectedOption.label}</strong>
                {selectedOption.subLabel && (
                  <> {selectedOption.subLabel} </>
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
          Thanh toán
        </Button>
      </div>
    </div>
  );
}
