"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useUser } from "@/contexts/UserContext";
import { Typography, Box, TextField } from "@mui/material";
import { updateProfile, UpdateProfileResponse } from "@/lib/profileApi";

export interface AddressesPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const AddressesPage = forwardRef<AddressesPageRef>((_, ref) => {
  const { user } = useUser();
  const [orderAddress, setOrderAddress] = useState("");

  useEffect(() => {
    if (user?.order_address) {
      setOrderAddress(user.order_address);
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        order_address: orderAddress,
        full_name: "",
      });
    },
  }));

  return (
    <Box sx={{ p: { xs: 0, md: 4 } }}>
      <Typography variant="h5" gutterBottom>
        Địa chỉ nhận hàng
      </Typography>
      <TextField
        label="Địa chỉ nhận hàng"
        fullWidth
        variant="outlined"
        sx={{ mt: 3 }}
        value={orderAddress}
        onChange={(e) => setOrderAddress(e.target.value)}
      />
    </Box>
  );
});

export default AddressesPage;
