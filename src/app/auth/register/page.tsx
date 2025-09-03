'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { register } from '@/app/actions/register';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginWithFacebookButton from '@/components/views/LoginWithFacebookButton';
import LoginWithGoogleButton from '@/components/views/LoginWithGoogleButton';
import PasswordInput from '@/components/views/PasswordInput';
import { ArrowRight, Check, Loader2, UserPlus } from 'lucide-react';
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
  const [focusedField, setFocusedField] = useState<string | null>(
    null,
  );

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const { watch, formState } = form;
  const watchedValues = watch();
  const { isValid, errors } = formState;

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
      await showSuccess(res.message);
      router.push('/auth/login');
    } catch (err: any) {
      showError(err.message || 'Lỗi đăng ký');
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang kiểm tra...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex justify-start px-4 mt-2 mb-16 mx-auto">
      <Card className="w-full max-w-md p-6 dark:bg-gray mx-auto">
        <CardHeader className="text-center pb-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary/60 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <UserPlus className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Tạo tài khoản mới
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Tham gia cùng chúng tôi để có trải nghiệm tuyệt vời
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Tên người dùng
                        <AnimatePresence>
                          {!errors.userName &&
                            field.value.length >= 2 && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                }}
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Tên của bạn"
                            {...field}
                            onFocus={() =>
                              setFocusedField('userName')
                            }
                            onBlur={() => setFocusedField(null)}
                            className={`pl-3 h-12 border-2 bg-background transition-all duration-200 ${
                              focusedField === 'userName'
                                ? 'border-primary ring-4 ring-primary/10'
                                : !errors.userName &&
                                    field.value.length >= 2
                                  ? 'border-green-500 hover:border-green-600'
                                  : 'border-border hover:border-muted-foreground/50'
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Địa chỉ Email
                        <AnimatePresence>
                          {!errors.email &&
                            field.value.length > 0 && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                }}
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-3 h-12 border-2 bg-background transition-all duration-200 ${
                              focusedField === 'email'
                                ? 'border-primary ring-4 ring-primary/10'
                                : !errors.email &&
                                    field.value.length > 0
                                  ? 'border-green-500 hover:border-green-600'
                                  : 'border-border hover:border-muted-foreground/50'
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Mật khẩu
                        <AnimatePresence>
                          {!errors.password &&
                            field.value.length >= 6 && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                }}
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            onFocus={() =>
                              setFocusedField('password')
                            }
                            onBlur={() => setFocusedField(null)}
                            className={`pl-3 h-12 border-2 bg-background transition-all duration-200 ${
                              focusedField === 'password'
                                ? 'border-primary ring-4 ring-primary/10'
                                : !errors.password &&
                                    field.value.length >= 6
                                  ? 'border-green-500 hover:border-green-600'
                                  : 'border-border hover:border-muted-foreground/50'
                            }`}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />

                      {/* Password Strength */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: field.value ? 1 : 0,
                          height: field.value ? 'auto' : 0,
                        }}
                        className="mt-2"
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <motion.div
                              key={level}
                              initial={{ width: 0 }}
                              animate={{
                                width: '100%',
                                backgroundColor:
                                  field.value?.length >= level * 2
                                    ? field.value?.length >= 8
                                      ? 'rgb(34, 197, 94)'
                                      : field.value?.length >= 6
                                        ? 'rgb(234, 179, 8)'
                                        : 'rgb(239, 68, 68)'
                                    : 'rgb(229, 231, 235)',
                              }}
                              transition={{ delay: level * 0.1 }}
                              className="h-1 rounded-full flex-1"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {field.value?.length < 6 && 'Mật khẩu yếu'}
                          {field.value?.length >= 6 &&
                            field.value?.length < 8 &&
                            'Mật khẩu trung bình'}
                          {field.value?.length >= 8 &&
                            'Mật khẩu mạnh'}
                        </p>
                      </motion.div>
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        Đang đăng ký...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Đăng ký tài khoản
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-muted-foreground">
                  Bạn đã có tài khoản?{' '}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </motion.div>
              <motion.div
                className="relative mt-8"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background dark:bg-gray px-4 text-muted-foreground font-medium">
                    Hoặc đăng ký bằng
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <LoginWithGoogleButton />
                <LoginWithFacebookButton />
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
