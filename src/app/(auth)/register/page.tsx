"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { register } from "@/app/actions/register";
import { showError, showSuccess } from "@/lib/swal";
import PasswordField from "@/components/shared/PasswordField";
import { useUser } from "@/contexts/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useUser();

  const [checkingUser, setCheckingUser] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (user) {
      router.replace("/");
    } else {
      setCheckingUser(false);
    }
  }, [user, router]);

  // Không hiển thị giao diện khi đang kiểm tra đăng nhập
  if (checkingUser) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
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
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      mb={8}
      p={4}
      border="1px solid #ccc"
      borderRadius={2}
      boxShadow={2}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Đăng ký tài khoản
      </Typography>

      <form onSubmit={handleRegister}>
        <Stack spacing={2}>
          <TextField
            label="Tên người dùng"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <PasswordField
            label="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Đăng ký"}
          </Button>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Bạn đã có tài khoản?{" "}
              <MuiLink href="/login" underline="hover" sx={{ fontWeight: 500 }}>
                Đăng nhập
              </MuiLink>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
