"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/actions/register";
import { showError, showSuccess } from "@/lib/swal";
import { useUser } from "@/contexts/UserContext";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useUser();

  const [checkingUser, setCheckingUser] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    } else {
      setCheckingUser(false);
    }
  }, [user, router]);

  if (checkingUser) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await register(userName, email, password);
      await showSuccess(res.message || "Đăng ký thành công");
      router.push("/login");
    } catch (err: any) {
      showError(err.message || "Lỗi đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 mt-12 mb-16">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Đăng ký tài khoản
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <Input
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tên của bạn"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Đăng ký"
              )}
            </Button>

            <p className="text-center text-sm mt-3">
              Bạn đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Đăng nhập
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
