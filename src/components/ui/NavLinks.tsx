"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    {
      name: "Thời trang nam",
      href: "#",
      submenu: [
        { name: "Áo thun", href: "/nam/ao-thun" },
        { name: "Áo sơ mi", href: "/nam/ao-so-mi" },
        { name: "Quần jean", href: "/nam/quan-jean" },
      ],
    },
    {
      name: "Thời trang nữ",
      href: "#",
      submenu: [
        { name: "Váy", href: "/nu/vay" },
        { name: "Áo kiểu", href: "/nu/ao-kieu" },
        { name: "Quần", href: "/nu/quan" },
      ],
    },
    {
      name: "Phụ kiện",
      href: "#",
      submenu: [
        { name: "Túi xách", href: "/phu-kien/tui" },
        { name: "Giày", href: "/phu-kien/giay" },
      ],
    },
    { name: "Liên hệ", href: "/lien-he" },
    { name: "Về chúng tôi", href: "/ve-chung-toi" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className={clsx("relative", className)}>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.name} className="relative group py-3">
            <Link
              href={link.href}
              className={clsx(
                "rounded-md lg:px-4 py-2 text-md uppercase font-bold",
                pathname === link.href ? "text-[#b4282b]" : "text-gray-900"
              )}
            >
              {link.name}
            </Link>

            {link.submenu && (
              <ul
                className="absolute left-0 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50"
              >
                {link.submenu.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
