'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 as Loader2Icon } from 'lucide-react';
import { CreditCard, CreditCardValue } from '../ui/credit-card';

const FormSchema = z
  .object({
    cardholderName: z
      .string()
      .min(2, 'Tên chủ thẻ phải có ít nhất 2 ký tự')
      .max(50, 'Tên chủ thẻ phải ít hơn 50 ký tự'),

    cardNumber: z
      .string()
      .min(1, 'Số thẻ là bắt buộc')
      .refine((value) => {
        const cleanNumber = value.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleanNumber);
      }, 'Định dạng số thẻ không hợp lệ'),

    expiryMonth: z
      .string()
      .min(1, 'Tháng hết hạn là bắt buộc')
      .refine((value) => {
        const month = parseInt(value);
        return month >= 1 && month <= 12;
      }, 'Tháng không hợp lệ'),

    expiryYear: z
      .string()
      .min(1, 'Năm hết hạn là bắt buộc')
      .refine((value) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= currentYear + 20;
      }, 'Năm không hợp lệ'),

    cvv: z
      .string()
      .min(3, 'CVV phải có ít nhất 3 chữ số')
      .max(4, 'CVV phải có tối đa 4 chữ số')
      .refine(
        (value) => /^\d+$/.test(value),
        'CVV chỉ được chứa các chữ số',
      ),
  })
  .refine(
    (data) => {
      if (!data.expiryMonth || !data.expiryYear) return true;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const expiryYear = parseInt(data.expiryYear);
      const expiryMonth = parseInt(data.expiryMonth);

      return (
        expiryYear > currentYear ||
        (expiryYear === currentYear && expiryMonth >= currentMonth)
      );
    },
    {
      message: 'Thẻ đã hết hạn',
      path: ['năm hết hạn'],
    },
  );

type CreditCardFormData = z.infer<typeof FormSchema>;

export function CreditCardForm() {
  const [creditCard, setCreditCard] = useState<CreditCardValue>({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [isCardValid, setIsCardValid] = useState(false);

  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
    mode: 'onChange',
  });

  const handleCreditCardChange = (value: CreditCardValue) => {
    setCreditCard(value);
    form.setValue('cardholderName', value.cardholderName, {
      shouldValidate: true,
    });
    form.setValue('cardNumber', value.cardNumber, {
      shouldValidate: true,
    });
    form.setValue('expiryMonth', value.expiryMonth, {
      shouldValidate: true,
    });
    form.setValue('expiryYear', value.expiryYear, {
      shouldValidate: true,
    });
    form.setValue('cvv', value.cvv, { shouldValidate: true });
  };

  const handleValidationChange = (isValid: boolean, errors: any) => {
    setIsCardValid(isValid);
  };

  const onSubmit = (data: CreditCardFormData) => {
    toast.success(
      <div className="space-y-2">
        <p className="font-semibold">Payment Information Submitted</p>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-xs">
          <code className="text-white">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </div>,
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem className="flex flex-col mx-auto w-full">
                <FormLabel>Thông tin thẻ tín dụng</FormLabel>
                <FormControl>
                  <CreditCard
                    value={creditCard}
                    onChange={handleCreditCardChange}
                    onValidationChange={handleValidationChange}
                    cvvLabel="CVC"
                    cardStyle="shiny-silver"
                    showVendor={true}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  Tất cả các trường đều bắt buộc. Thông tin của bạn
                  được bảo mật và mã hóa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="hidden">
            <FormField
              control={form.control}
              name="cardNumber"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="expiryMonth"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="expiryYear"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={() => <FormMessage />}
            />
          </div>

          <div className="space-y-6">
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={!form.formState.isValid || !isCardValid}
            >
              {form.formState.isSubmitting ? (
                <Loader2Icon className="animate-spin h-5 w-5" />
              ) : (
                'Tạo'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
