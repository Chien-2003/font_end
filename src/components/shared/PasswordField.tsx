"use client";

import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
type PasswordFieldProps = TextFieldProps & {
  label?: string;
};
export default function PasswordField({ label = "Mật khẩu", ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      label={label}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
