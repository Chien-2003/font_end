"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/products" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Calendar", href: "/calendar" },
  ];

  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "rounded-md px-3 py-2 text-md uppercase font-bold",
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
