'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import * as React from 'react'

export default function NavLinks({ className = '' }: { className?: string }) {
  const pathname = usePathname()

  const links = [
    { name: 'Home', href: '/' },
    {
      name: 'Thời trang nam',
      submenu: [
        { name: 'Áo thun', href: '/nam/ao-thun', description: 'Áo thun nam đa dạng phong cách.' },
        { name: 'Áo sơ mi', href: '/nam/ao-so-mi', description: 'Sơ mi cho môi trường công sở.' },
        { name: 'Quần jean', href: '/nam/quan-jean', description: 'Quần jean bền đẹp cho nam.' },
      ],
    },
    {
      name: 'Thời trang nữ',
      submenu: [
        { name: 'Váy', href: '/nu/vay', description: 'Váy đẹp, nữ tính, hợp thời trang.' },
        { name: 'Áo kiểu', href: '/nu/ao-kieu', description: 'Áo kiểu đa dạng phong cách.' },
        { name: 'Quần', href: '/nu/quan', description: 'Quần nữ năng động, hiện đại.' },
      ],
    },
    {
      name: 'Phụ kiện',
      submenu: [
        { name: 'Túi xách', href: '/phu-kien/tui', description: 'Túi xách sành điệu cho mọi dịp.' },
        { name: 'Giày', href: '/phu-kien/giay', description: 'Giày thời trang và thoải mái.' },
      ],
    },
    { name: 'Liên hệ', href: '/lien-he' },
    { name: 'Về chúng tôi', href: '/ve-chung-toi' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.name}>
            {link.submenu ? (
              <>
                <NavigationMenuTrigger className="uppercase text-sm font-medium">
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px]">
                    {link.submenu.map((sub) => (
                      <ListItem
                        key={sub.name}
                        title={sub.name}
                        href={sub.href}
                        active={pathname === sub.href}
                      >
                        {sub.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className={`${navigationMenuTriggerStyle()} uppercase text-base font-medium ${
                    pathname === link.href ? 'text-[#b4282b]' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  active = false,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string; active?: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className={`text-sm font-medium leading-none ${active ? 'text-[#b4282b]' : ''}`}>
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
