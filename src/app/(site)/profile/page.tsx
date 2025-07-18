'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { UpdateProfileResponse } from '@/lib/profileApi';

import PersonalInfoPage, {
  PersonalInfoPageRef,
} from './components/PersonalInfoPage';
import OrdersPage from './components/OrdersPage';
import FavoritesPage from './components/FavoritesPage';
import AddressesPage, {
  AddressesPageRef,
} from './components/AddressesPage';
import { Typography } from '@/components/ui/typography';
import { ProfilePageSkeleton } from '@/components/skeleton/ProfileSkeleton';

export default function ProfilePage() {
  const { user, fetchUser, loading, error } = useUser();
  const personalInfoRef = useRef<PersonalInfoPageRef>(null);
  const addressRef = useRef<AddressesPageRef>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = React.useState('personal');

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl w-full px-4 py-6 text-center text-red-600">
        <p>{error}</p>
        <Button onClick={fetchUser} className="mt-4">
          Thử lại
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl w-full px-4 py-6 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">
          Không tìm thấy thông tin người dùng
        </h1>
        <p>Vui lòng đăng nhập để xem hồ sơ của bạn.</p>
        <Link href="/auth/login" passHref>
          <Button className="mt-4">Đăng nhập</Button>
        </Link>
      </div>
    );
  }

  const handleUpdate = async () => {
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    try {
      let response: UpdateProfileResponse | undefined;
      if (tab === 'personal' && personalInfoRef.current) {
        response = await personalInfoRef.current.handleUpdate();
      }
      if (tab === 'addresses' && addressRef.current) {
        response = await addressRef.current.handleUpdate();
      }
      await fetchUser();
      if (response?.message) showSuccess(response.message);
    } catch (err: any) {
      console.error('Lỗi cập nhật:', err);
      if (err?.message) showError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-full md:px-4 lg:py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 flex flex-col">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Elysia Wear"
                width={32}
                height={32}
              />
              <span className="font-semibold text-lg">
                Elysia Wear
              </span>
            </Link>
            <Typography variant="h2">
              {user.full_name || 'Chưa có tên'}
            </Typography>
            <TabsList className="flex flex-col w-full items-start space-y-4">
              <TabsTrigger value="personal">
                Thông tin cá nhân
              </TabsTrigger>
              <TabsTrigger value="orders">
                Đơn hàng của bạn
              </TabsTrigger>
              <TabsTrigger value="favorites">
                Sản phẩm yêu thích
              </TabsTrigger>
              <TabsTrigger value="addresses">
                Địa chỉ nhận hàng
              </TabsTrigger>
            </TabsList>
          </Card>

          <div className="md:col-span-3 space-y-4">
            <Card className="p-4">
              <TabsContent value="personal">
                <PersonalInfoPage ref={personalInfoRef} />
              </TabsContent>
              <TabsContent value="orders">
                <OrdersPage />
              </TabsContent>
              <TabsContent value="favorites">
                <FavoritesPage />
              </TabsContent>
              <TabsContent value="addresses">
                <AddressesPage ref={addressRef} />
              </TabsContent>

              {(tab === 'personal' || tab === 'addresses') && (
                <div className="text-center mt-4">
                  <Button ref={btnRef} onClick={handleUpdate}>
                    Cập nhật thông tin
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
