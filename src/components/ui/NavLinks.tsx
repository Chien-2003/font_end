// components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/" },
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
            "rounded-md px-3 py-2 text-sm font-medium",
            pathname === link.href
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
