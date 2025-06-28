"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "../ui/NavLinks";
import UserMenu from "../ui/UserMenu";
import MobileMenu from "../ui/MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow">
      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="relative w-full mx-auto py-2">
          <div className="flex items-center gap-4 w-full px-4 py-2 justify-between">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Image src="/logo.svg" alt="Elysia Wear" width={32} height={32} />
              <span className="text-gray-900 font-semibold text-lg">
                Elysia Wear
              </span>
            </Link>
            <div className="relative flex-grow max-w-md w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none transition-all"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
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
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-600 hover:text-black focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>
              <UserMenu />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="hidden sm:block">
            <NavLinks className="flex space-x-4 text-gray-900" />
          </div>
        </div>
      </div>
      {menuOpen && <MobileMenu />}
    </nav>
  );
}
