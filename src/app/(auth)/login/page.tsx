"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/lib/swal";
import { useUser } from "@/contexts/UserContext";
import { login } from "@/app/actions/login";
import PasswordField from "@/components/shared/PasswordField";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const { user, fetchUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f3f4f6"
      px={2}
      mb={8}
      mt={8}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Đăng nhập
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <PasswordField
            label="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <input
                type="checkbox"
                id="remember"
                style={{ marginRight: "8px" }}
              />
              <label htmlFor="remember" style={{ fontSize: "14px" }}>
                Ghi nhớ đăng nhập
              </label>
            </Box>

            <MuiLink
              component="button"
              variant="body2"
              underline="hover"
              sx={{ fontSize: 14, textTransform: "none", fontWeight: 400 }}
              onClick={handleForgotPassword}
            >
              Quên mật khẩu?
            </MuiLink>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đăng nhập"
            )}
          </Button>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Bạn chưa có tài khoản?{" "}
              <MuiLink
                href="/register"
                underline="hover"
                sx={{ fontWeight: 500 }}
              >
                Tạo tài khoản
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
