'use client';

import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { UpdateProfileResponse } from '@/services/profileApi';

import { EmptyPlaceholder } from '@/components/shared/EmptyPlaceholder';
import { ProfilePageSkeleton } from '@/components/skeleton/ProfileSkeleton';
import { Typography } from '@/components/ui/typography';
import { Loader2Icon } from 'lucide-react';
import AddressesPage, {
  AddressesPageRef,
} from './components/AddressesPage';
import FavoritesPage from './components/FavoritesPage';
import OrdersPage from './components/OrdersPage';
import PersonalInfoPage, {
  PersonalInfoPageRef,
} from './components/PersonalInfoPage';

export default function ProfilePage() {
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const { user, fetchUser, loading, error } = useUser();
  const personalInfoRef = useRef<PersonalInfoPageRef>(null);
  const addressRef = useRef<AddressesPageRef>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [tab, setTab] = React.useState('personal');
  const commonTriggerClass =
    'data-[state=active]:after:bg-primary relative w-full p-2 justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-none cursor-pointer';

  if (loading) return <ProfilePageSkeleton />;

  if (error) {
    return (
      <div className="mx-auto max-w-3xl w-full px-4 py-6 text-center text-red-600">
        <EmptyPlaceholder />
        <p>{error}</p>
        <Link href="/auth/login">
          <Button className="mt-4 bg-primary text-white">
            Đăng nhập
          </Button>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl w-full px-4 py-6 text-center text-gray-500">
        <EmptyPlaceholder description="Không có thông tin." />
        <p>Vui lòng đăng nhập để xem hồ sơ của bạn.</p>
        <Link href="/auth/login">
          <Button className="mt-4 text-white">Đăng nhập</Button>
        </Link>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (loadingBtn) return;
    setLoadingBtn(true);
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
      if (err?.message) showError(err.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="mx-auto max-w-full md:px-4 lg:py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
      <Tabs
        value={tab}
        onValueChange={setTab}
        orientation="vertical"
        className="w-full flex-row"
      >
        <div className="grid md:grid-cols-4 gap-6 w-full max-w-[1400px] mx-auto">
          <Card className="p-6 flex flex-col dark:bg-gray-900">
            <Link href="/" className="flex items-center gap-2 mb-4">
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

            <Typography variant="h2" className="mb-6">
              {user.full_name || 'Chưa có tên'}
            </Typography>

            <TabsList className="flex-col rounded-none border-l bg-transparent p-0 space-y-4">
              <TabsTrigger
                value="personal"
                className={commonTriggerClass}
              >
                Thông tin cá nhân
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className={commonTriggerClass}
              >
                Đơn hàng của bạn
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className={commonTriggerClass}
              >
                Sản phẩm yêu thích
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className={commonTriggerClass}
              >
                Địa chỉ nhận hàng
              </TabsTrigger>
            </TabsList>
          </Card>
          <div className="md:col-span-3 space-y-4">
            <div className="rounded-md border text-start p-5 h-full">
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
                <div className="text-center flex flex-row justify-center mt-4">
                  <Button
                    ref={btnRef}
                    onClick={handleUpdate}
                    className="dark:text-accent-foreground cursor-pointer flex items-center justify-center gap-2"
                    disabled={loadingBtn}
                  >
                    {loadingBtn ? (
                      <Fragment>
                        <Loader2Icon className="animate-spin h-5 w-5" />
                        Đang cập nhật...
                      </Fragment>
                    ) : (
                      'Cập nhật thông tin'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
