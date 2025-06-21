"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  TextField,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import gsap from "gsap";

export default function PersonalInfoPage() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  };
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
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
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
              {profile.full_name}
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
            <button
              ref={btnRef}
              onClick={handleClick}
              className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
            >
              Cập nhật thông tin
            </button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
