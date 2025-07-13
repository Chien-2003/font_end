'use client';

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useUser } from '@/contexts/UserContext';
import {
  updateProfile,
  UpdateProfileResponse,
} from '@/lib/profileApi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface AddressesPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const AddressesPage = forwardRef<AddressesPageRef>((_, ref) => {
  const { user } = useUser();
  const [orderAddress, setOrderAddress] = useState('');

  useEffect(() => {
    if (user?.order_address) {
      setOrderAddress(user.order_address);
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        order_address: orderAddress,
        full_name: '',
      });
    },
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Địa chỉ nhận hàng</h2>
      <div className="space-y-2">
        <Label htmlFor="order_address">Địa chỉ nhận hàng</Label>
        <Input
          id="order_address"
          value={orderAddress}
          onChange={(e) => setOrderAddress(e.target.value)}
          placeholder="Nhập địa chỉ nhận hàng"
        />
      </div>
    </div>
  );
});

export default AddressesPage;
