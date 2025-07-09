"use client";

import React, { useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonalInfoPage, {
  PersonalInfoPageRef,
} from "./components/PersonalInfoPage";
import OrdersPage from "./components/OrdersPage";
import FavoritesPage from "./components/FavoritesPage";
import AddressesPage, { AddressesPageRef } from "./components/AddressesPage";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import gsap from "gsap";
import { showError, showSuccess } from "@/lib/swal";
import { UpdateProfileResponse } from "@/lib/profileApi";

const tabLabels = [
  "Thông tin cá nhân",
  "Đơn hàng của bạn",
  "Sản phẩm yêu thích",
  "Địa chỉ nhận hàng",
];

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { user, fetchUser } = useUser();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const btnRef = useRef<HTMLButtonElement>(null);

  const personalInfoRef = useRef<PersonalInfoPageRef>(null);
  const addressRef = useRef<AddressesPageRef>(null);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <PersonalInfoPage ref={personalInfoRef} />;
      case 1:
        return <OrdersPage />;
      case 2:
        return <FavoritesPage />;
      case 3:
        return <AddressesPage ref={addressRef} />;
      default:
        return null;
    }
  };

  const handleUpdate = async () => {
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    try {
      let response: UpdateProfileResponse | undefined;

      if (selectedTab === 0 && personalInfoRef.current) {
        response = await personalInfoRef.current.handleUpdate();
      }
      if (selectedTab === 3 && addressRef.current) {
        response = await addressRef.current.handleUpdate();
      }

      await fetchUser();

      if (response?.message) {
        showSuccess(response.message);
      }
    } catch (err: any) {
      console.error("Lỗi cập nhật:", err);
      if (err?.message) showError(err.message);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Grid container spacing={4} sx={{ minHeight: "100%" }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: isMdUp ? "flex-start" : "center",
              textAlign: isMdUp ? "left" : "center",
            }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 shrink-0 mb-8"
              style={{
                justifyContent: isMdUp ? "flex-start" : "center",
                width: "100%",
              }}
            >
              <Image src="/logo.svg" alt="Elysia Wear" width={32} height={32} />
              <span className="font-semibold text-lg">Elysia Wear</span>
            </Link>

            <Typography variant="h5" sx={{ mb: 4 }}>
              {user?.full_name || "Chưa có tên"}
            </Typography>

            <Tabs
              orientation={isMdUp ? "vertical" : "horizontal"}
              variant="scrollable"
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              TabIndicatorProps={{
                style: {
                  left: isMdUp ? 0 : undefined,
                  bottom: isMdUp ? undefined : 0,
                  width: isMdUp ? "2px" : "100%",
                  height: isMdUp ? "auto" : "2px",
                  backgroundColor: "#009966",
                },
              }}
              sx={{ width: "100%" }}
            >
              {tabLabels.map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  sx={{
                    textAlign: isMdUp ? "left" : "center",
                    alignItems: isMdUp ? "flex-start" : "center",
                    justifyContent: isMdUp ? "flex-start" : "center",
                    px: 2,
                    "&.Mui-selected": { color: "primary.main" },
                  }}
                />
              ))}
            </Tabs>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, height: "100%" }}>
            {renderTabContent()}
            {(selectedTab === 0 || selectedTab === 3) && (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <button
                  ref={btnRef}
                  onClick={handleUpdate}
                  className="px-6 py-3 rounded-md shadow-md cursor-pointer"
                >
                  Cập nhật thông tin
                </button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
