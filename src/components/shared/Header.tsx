'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { ModeToggle } from '@/components/shared/ModeToggle';
import { mainMenu, topMenu } from '@/data/top-bar';
import CartButton from './CartButton';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import Notifications from './Notifications';
import SearchCommand from './SearchDropdown';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [menuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Fragment>
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isSticky ? 'm-0 h-0 scale-y-95 p-0' : 'h-8'
        }`}
      >
        <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full flex h-8    items-center justify-center bg-neutral-500 lg:justify-between">
          <ul className="flex h-full items-center justify-evenly max-lg:flex-1 md:justify-between uppercase">
            {topMenu.map((item, idx) => (
              <li
                key={idx}
                className="relative flex h-full flex-1 items-center lg:flex-none"
              >
                <Link
                  href={item.href}
                  className="block h-full flex-1 whitespace-nowrap px-2 py-2 pt-2.5 text-center font-criteria text-xs font-medium leading-3.5 text-neutral-200 transition-colors hover:bg-neutral-600"
                >
                  {item.label}
                </Link>
                {idx !== topMenu.length - 1 && (
                  <span className="absolute right-0 z-10 my-2 block h-4.5 w-[1px] bg-neutral-300/20"></span>
                )}
              </li>
            ))}
          </ul>
          <ul className="hidden h-full items-center justify-evenly max-lg:flex-1 md:justify-between lg:flex">
            {mainMenu.map((item, idx) => (
              <li
                key={idx}
                className="relative flex h-full flex-1 items-center lg:flex-none"
              >
                <Link
                  href={item.href}
                  className="flex h-full flex-1 items-center gap-0.5 whitespace-nowrap px-2 py-2 pt-2.5 text-center font-criteria text-xs font-medium leading-3.5 text-neutral-200 transition-colors hover:bg-neutral-600"
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 fill-neutral-200 stroke-neutral-200" />
                  )}
                  {item.label}
                </Link>
                {idx !== mainMenu.length - 1 && (
                  <span className="absolute right-0 z-10 my-2 block h-4.5 w-[1px] bg-neutral-300/20"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav
        className={`${isSticky ? 'sticky top-0 z-50 shadow-lg backdrop-blur-md bg-background/90 dark:bg-gray-900/90' : 'bg-background dark:bg-gray-900'} transition-all duration-300 ease-in-out`}
      >
        <div
          data-label="container"
          className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full"
        >
          <div className="relative w-full mx-auto py-2">
            <div className="flex items-center flex-wrap gap-4 w-full px-4 py-2 justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 shrink-0"
              >
                <Image
                  src="/logo.svg"
                  alt="Elysia Wear"
                  width={32}
                  height={32}
                />
                <span className="text-gray-900 dark:text-white font-semibold text-lg">
                  Elysia Wear
                </span>
              </Link>
              <SearchCommand />
              <div className="flex items-center gap-3 shrink-0">
                <UserMenu />
                <Notifications />
                <Link href="/cart">
                  <CartButton />
                </Link>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:py-0.5">
            <div className="hidden sm:block">
              <NavLinks className="flex space-x-4" />
            </div>
          </div>
        </div>

        {menuOpen && <MobileMenu />}
      </nav>
    </Fragment>
  );
}
