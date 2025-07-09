"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/lib/swal";
import { useUser } from "@/contexts/UserContext";
import { login } from "@/app/actions/login";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(email, password);
      await fetchUser();
      await showSuccess(data.message || "Đăng nhập thành công");
      router.push("/");
    } catch (error: any) {
      showError(error.message || "Lỗi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: inputEmail } = await Swal.fire({
      title: "Quên mật khẩu",
      input: "email",
      inputLabel: "Nhập email của bạn",
      inputPlaceholder: "example@gmail.com",
      confirmButtonText: "Gửi",
      showCancelButton: true,
      cancelButtonText: "Huỷ",
      inputValidator: (value) => {
        if (!value) return "Vui lòng nhập email";
        return null;
      },
    });

    if (inputEmail) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { value: otpCode } = await Swal.fire({
        title: "Nhập mã xác nhận",
        html: `
          <p>Chúng tôi đã gửi mã xác nhận gồm 6 số đến <b>${inputEmail}</b></p>
          <input type="text" id="otp-input" class="swal2-input" maxlength="6" placeholder="Nhập mã gồm 6 số">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ",
        preConfirm: () => {
          const code = (
            document.getElementById("otp-input") as HTMLInputElement
          )?.value;
          if (!code || code.length !== 6) {
            Swal.showValidationMessage("Vui lòng nhập đúng mã gồm 6 số");
          }
          return code;
        },
      });
      if (otpCode) {
        await showSuccess("Xác nhận thành công. Tiếp tục đặt lại mật khẩu!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mt-12 mb-16">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Đăng nhập
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(val) => setRemember(Boolean(val))}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
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
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <p className="text-center text-sm mt-3">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Tạo tài khoản
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
