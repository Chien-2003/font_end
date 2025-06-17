"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  TextField,
  Paper,
  Button,
  Grid,
} from "@mui/material";

export default function PersonalInfoPage() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/profile/get-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        if (res.ok && result.data) {
          setProfile({
            full_name: result.data.full_name,
            email: result.data.email,
            phone: result.data.phone,
            address: result.data.address,
          });
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      }
    };

    fetchProfile();
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Grid
          gap={2}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Grid sx={{ textAlign: "center" }}>
            <Avatar
              alt="User Avatar"
              src="/image.webp"
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {profile.full_name || "Thông tin cá nhân"}
            </Typography>
          </Grid>

          <TextField
            label="Họ và tên"
            fullWidth
            variant="outlined"
            value={profile.full_name}
          />

          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={profile.email}
          />

          <TextField
            label="Số điện thoại"
            fullWidth
            variant="outlined"
            value={profile.phone}
          />

          <TextField
            label="Địa chỉ"
            fullWidth
            variant="outlined"
            value={profile.address}
          />

          <Grid sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="contained" color="primary">
              Cập nhật thông tin
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
