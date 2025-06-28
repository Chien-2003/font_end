"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  if (!user) {
    return (
      <div className="ml-3 flex space-x-2">
        <Link
          href="/login"
          className="text-white text-sm px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="text-white text-sm px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded"
      >
        <Image
          src="/logo.svg"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{user.full_name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Thông tin cá nhân
          </Link>
          {user.email === "nguyendinhchien19042003@gmail.com" && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Trang quản lý
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
