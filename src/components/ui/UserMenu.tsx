"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 Trạng thái đăng nhập
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔁 Giả lập trạng thái login
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true nếu có token
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="ml-3 flex space-x-2">
        <Link
          href="/login"
          className="text-white text-sm px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="text-white text-sm px-3 py-2 rounded-md hover:bg-gray-700"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative ml-3" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
        id="user-menu-button"
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="size-8 rounded-full"
          src="/logo.svg"
          alt="User avatar"
          width={32}
          height={32}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700">
            Your Profile
          </Link>
          <Link href="#" className="block px-4 py-2 text-sm text-gray-700">
            Settings
          </Link>
          <Link
            href="#"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700"
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}
