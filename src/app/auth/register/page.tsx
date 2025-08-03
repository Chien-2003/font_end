'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/app/actions/register';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import PasswordInput from '@/components/shared/PasswordInput';
import LoginWithGoogleButton from '@/components/shared/LoginWithGoogleButton';
import LoginWithFacebookButton from '@/components/shared/LoginWithFacebookButton';
import Link from 'next/link';

const formSchema = z.object({
  userName: z.string().min(2, 'Tên người dùng quá ngắn'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useUser();
  const [checkingUser, setCheckingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      router.replace('/');
    } else {
      setCheckingUser(false);
    }
  }, [user, router]);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const res = await register(
        values.userName,
        values.email,
        values.password,
      );
      await showSuccess(res.message || 'Đăng ký thành công');
      router.push('/auth/login');
    } catch (err: any) {
      showError(err.message || 'Lỗi đăng ký');
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingUser) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 mt-2 mb-16">
      <Card className="w-full max-w-md p-6 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Đăng ký tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người dùng</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm mt-3">
            Bạn đã có tài khoản?{' '}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng nhập
            </Link>
          </p>

          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="dark:bg-gray-900 bg-white px-2 text-foreground">
                Hoặc đăng nhập bằng
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <LoginWithGoogleButton />
            <LoginWithFacebookButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
