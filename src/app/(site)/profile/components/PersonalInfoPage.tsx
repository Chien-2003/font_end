"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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
import dayjs, { Dayjs } from "dayjs";
import { useUser } from "@/contexts/UserContext";
import { updateProfile, UpdateProfileResponse } from "@/lib/profileApi";

export interface PersonalInfoPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const PersonalInfoPage = forwardRef<PersonalInfoPageRef>((_, ref) => {
  const { user } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setBirthDate(user.birth_date ? dayjs(user.birth_date) : null);
      setGender(user.gender ?? 0);
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        full_name: fullName,
        phone,
        address,
        birth_date: birthDate ? birthDate.format("YYYY-MM-DD") : null,
        gender,
      });
    },
  }));

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
          {fullName || "Chưa có tên"}
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Họ và tên"
            fullWidth
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Địa chỉ thường trú"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Số điện thoại"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Ngày sinh"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>Giới tính</FormLabel>
            <RadioGroup
              row
              value={String(gender)}
              onChange={(e) => setGender(Number(e.target.value) as 0 | 1 | 2)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Nam" />
              <FormControlLabel value="1" control={<Radio />} label="Nữ" />
              <FormControlLabel value="2" control={<Radio />} label="Khác" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default PersonalInfoPage;
