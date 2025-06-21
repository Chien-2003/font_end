"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Áo nam", href: "/san-pham" },
    { name: "Quần nam", href: "#" },
    { name: "Phụ kiện nam", href: "#" },
    { name: "Áo nữ", href: "#" },
    { name: "Quần nữ", href: "#" },
    { name: "Phụ kiện nữ", href: "#" },
    { name: "Blog", href: "#" },
  ];

  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "rounded-md lg:px-4 py-2 text-md uppercase font-bold",
            pathname === link.href
              ? "text-[#b4282b]"
              : "text-gray-900"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
