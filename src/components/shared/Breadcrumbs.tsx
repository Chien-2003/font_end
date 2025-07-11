"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");
  const items = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const label = decodeURIComponent(part.replace(/-/g, " "));

    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: index === pathParts.length - 1 ? undefined : href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="dark:text-accent-foreground text-gray-900"
          >
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="px-1">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink
                    asChild
                    className="dark:text-accent-foreground text-gray-900"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
