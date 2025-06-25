"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/lib/swal";
import { useUser } from "@/contexts/UserContext";
import { login } from "@/app/actions/login";

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
  const { fetchUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(email, password);
      await fetchUser();
      await showSuccess(data.message || "Đăng nhập thành công");
      router.push("/profile");
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

          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <MuiLink
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              sx={{ textTransform: "none" }}
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
        </form>
      </Paper>
    </Box>
  );
}
