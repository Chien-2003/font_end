"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { register } from "@/app/actions/register";
import { showError, showSuccess } from "@/lib/swal";


export default function RegisterPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(userName, email, password);
      showSuccess(res.message);

      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      showError(err.message);
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
          <TextField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng ký
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
