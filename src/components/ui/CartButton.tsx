import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ShoppingCartOutlined } from "@mui/icons-material";

export default function CartPage() {
  return (
    <IconButton
      aria-label="notifications"
      sx={{
        bgcolor: "white",
        p: 1,
        color: "gray",
      }}
    >
      <Badge badgeContent={3} color="primary">
        <ShoppingCartOutlined color="warning" />
      </Badge>
    </IconButton>
  );
}
