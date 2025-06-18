// components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
}

const links: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Product",
    children: [
      { name: "All Products", href: "/products" },
      {
        name: "Categories",
        children: [
          { name: "Men", href: "/products/men" },
          { name: "Women", href: "/products/women" },
        ],
      },
    ],
  },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/projects" },
  { name: "Calendar", href: "/calendar" },
];

function MenuItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative group">
      {item.href ? (
        <Link
          href={item.href}
          className={clsx(
            "block px-4 py-2 font-bold uppercase text-sm transition-transform duration-300",
            pathname === item.href ? "text-[#b4282b]" : "text-gray-900"
          )}
        >
          {item.name}
        </Link>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className="block w-full text-left px-4 py-2 font-bold uppercase text-sm text-gray-900"
        >
          {item.name}
        </button>
      )}
      {hasChildren && (
        <div
          className={clsx(
            "absolute left-full top-0 ml-1 mt-0 origin-left transform transition-transform duration-500 ease-in-out",
            open ? "scale-x-100" : "scale-x-0",
            "bg-white shadow-lg rounded-md z-50"
          )}
        >
          {item.children!.map((child, i) => (
            <MenuItem key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavLinks({ className = "" }: { className?: string }) {
  return (
    <div className={clsx("flex space-x-4", className)}>
      {links.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
}
