'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import NavLinks from '../ui/NavLinks';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import CartButton from './CartButton';
import { ModeToggle } from '@/components/shared/ModeToggle';
import SearchModalTrigger from './SearchDropdown';
import Notifications from './Notifications';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/notification');
  };

  return (
    <nav className="sticky top-0 z-50 shadow bg-white dark:bg-gray-900">
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

            <SearchModalTrigger />

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

        <div className="relative flex items-center justify-center lg:py-1">
          <div className="hidden sm:block">
            <NavLinks className="flex space-x-4" />
          </div>
        </div>
      </div>

      {menuOpen && <MobileMenu />}
    </nav>
  );
}
