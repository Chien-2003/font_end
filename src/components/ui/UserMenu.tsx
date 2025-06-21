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
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="ml-3 flex space-x-2">
        <Link
          href="/login"
          className="text-white text-sm px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-800"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="text-white text-sm px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-800"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex items-center font-bold space-x-2 rounded-full text-gray-800 text-md px-3 py-2"
        id="user-menu-button"
        aria-haspopup="true"
      >
        <Image
          className="size-8 rounded-full"
          src="/logo.svg"
          alt="User avatar"
          width={32}
          height={32}
        />
        <span className="cursor-pointer">{user.full_name}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800"
          >
            Thông tin cá nhân
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-gray-800"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
