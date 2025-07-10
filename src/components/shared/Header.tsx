"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "../ui/NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { NotificationsOutlined } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import CartButton from "./CartButton";
import { ModeToggle } from "@/components/shared/ModeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/notification");
  };

  return (
    <nav className="sticky top-0 z-50 shadow bg-white dark:bg-gray-900">
      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="relative w-full mx-auto py-2">
          <div className="flex items-center flex-wrap gap-4 w-full px-4 py-2 justify-between">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Image src="/logo.svg" alt="Elysia Wear" width={32} height={32} />
              <span className="text-gray-900 dark:text-white font-semibold text-lg">
                Elysia Wear
              </span>
            </Link>
            <div className="relative flex-grow max-w-md w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <UserMenu />
              <IconButton
                aria-label="notifications"
                sx={{
                  p: 1,
                }}
                onClick={handleClick}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsOutlined color="primary" />
                </Badge>
              </IconButton>
              <Link href="/cart">
                <CartButton />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center lg:py-1">
          <div className="hidden sm:block">
            <NavLinks className="flex space-x-4" />
          </div>
        </div>
      </div>
      {menuOpen && <MobileMenu />}
    </nav>
  );
}
