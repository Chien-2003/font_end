"use client";

import { useState } from "react";
import Image from "next/image";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="px-2 sm:px-6 lg:px-8 container mx-auto">
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Your Company"
              width={32}
              height={32}
            />
            <span className="text-white">Elysia Wear</span>
          </Link>
          <div className="hidden sm:block sm:ml-6">
            <NavLinks className="flex space-x-4" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
      {menuOpen && <MobileMenu />}
    </nav>
  );
}
