"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useUser } from "@/contexts/UserContext";
import {
  Avatar,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function PersonalInfoPage() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { user } = useUser();
  const [gender, setGender] = useState<boolean>(user?.gender ?? true);
  const [birthDate, setBirthDate] = useState(
    user?.birth_date ? dayjs(user.birth_date) : null
  );

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

  return (
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
          {user?.full_name || "Chưa có tên"}
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Họ và tên"
            fullWidth
            variant="outlined"
            value={user?.full_name || ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Địa chỉ"
            fullWidth
            variant="outlined"
            value={user?.address || ""}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={user?.email || ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Số điện thoại"
            fullWidth
            variant="outlined"
            value={user?.phone || ""}
          />
        </Grid>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Ngày sinh"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel>Giới tính</FormLabel>
              <RadioGroup
                row
                value={gender ? "male" : "female"}
                onChange={(e) => setGender(e.target.value === "male")}
              >
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </LocalizationProvider>

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
  );
}
