'use client';

import { login } from '@/app/actions/login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoginWithFacebookButton from '@/components/views/LoginWithFacebookButton';
import LoginWithGoogleButton from '@/components/views/LoginWithGoogleButton';
import PasswordInput from '@/components/views/PasswordInput';
import { ArrowRight, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(email, password);
      await fetchUser();
      await showSuccess(data.message || 'Đăng nhập thành công');
      router.push('/');
    } catch (error: any) {
      showError(error.message || 'Lỗi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: inputEmail } = await Swal.fire({
      title: 'Quên mật khẩu',
      input: 'email',
      inputLabel: 'Nhập email của bạn',
      inputPlaceholder: 'example@gmail.com',
      confirmButtonText: 'Gửi',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      inputValidator: (value) => {
        if (!value) return 'Vui lòng nhập email';
        return null;
      },
    });

    if (inputEmail) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { value: otpCode } = await Swal.fire({
        title: 'Nhập mã xác nhận',
        html: `
          <p>Chúng tôi đã gửi mã xác nhận gồm 6 số đến <b>${inputEmail}</b></p>
          <input type="text" id="otp-input" class="swal2-input" maxlength="6" placeholder="Nhập mã gồm 6 số">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
        preConfirm: () => {
          const code = (
            document.getElementById('otp-input') as HTMLInputElement
          )?.value;
          if (!code || code.length !== 6) {
            Swal.showValidationMessage(
              'Vui lòng nhập đúng mã gồm 6 số',
            );
          }
          return code;
        },
      });
      if (otpCode) {
        await showSuccess(
          'Xác nhận thành công. Tiếp tục đặt lại mật khẩu!',
        );
      }
    }
  };

  return (
    <div className="flex justify-center px-4 mt-2 mb-16 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full justify-center mx-auto"
      >
        <Card className="w-full max-w-md p-6 dark:bg-gray mx-auto">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary/60 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Chào mừng trở lại
            </CardTitle>
            <p className="text-foreground/90 text-sm mt-2">
              Đăng nhập để tiếp tục hành trình mua sắm của bạn
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="password">Mật khẩu</Label>
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(val) =>
                      setRemember(Boolean(val))
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm cursor-pointer"
                  >
                    Ghi nhớ đăng nhập
                  </Label>
                </div>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Quên mật khẩu?
                </button>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Đang đăng nhập...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Đăng nhập
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              <motion.div
                className="relative mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background dark:bg-gray px-4 text-gray-500 font-medium">
                    Hoặc đăng nhập bằng
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <LoginWithGoogleButton />
                <LoginWithFacebookButton />
              </motion.div>
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-foreground">
                  Bạn chưa có tài khoản?{' '}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                  >
                    Tạo tài khoản mới
                  </Link>
                </p>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
