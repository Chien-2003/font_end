'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { logoutApi } from '@/services/authApi';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();
      await signOut({ redirect: false });
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  if (!user) {
    return (
      <div className="ml-3 flex space-x-2">
        <Button
          variant="outline"
          className="text-sm cursor-pointer"
          onClick={() => router.push('/auth/login')}
        >
          Đăng nhập
        </Button>
        <Button
          variant="outline"
          className="text-sm cursor-pointer"
          onClick={() => router.push('/auth/register')}
        >
          Đăng ký
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded
            focus:outline-none border-none shadow-none cursor-pointer"
        >
          <Image
            src={user.avatar || '/image.webp'}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{user.full_name}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 dark:bg-gray-900 bg-background"
      >
        <DropdownMenuItem asChild>
          <Link href="/profile">Thông tin cá nhân</Link>
        </DropdownMenuItem>

        {user.email === 'nguyendinhchien19042003@gmail.com' && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Trang quản lý</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
