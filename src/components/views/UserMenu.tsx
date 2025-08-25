'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { logoutApi } from '@/services/authApi';
import {
  CircleUserRoundIcon,
  LayoutDashboardIcon,
  ListTodo,
  LogOutIcon,
} from 'lucide-react';
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
          className="text-sm"
          onClick={() => router.push('/auth/login')}
        >
          Đăng nhập
        </Button>
        <Button
          variant="outline"
          className="text-sm"
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
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={user.avatar || '/image.webp'}
            alt="User Avatar"
            className="cursor-pointer"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="max-w-60 bg-background dark:bg-gray-900"
      >
        <DropdownMenuLabel className="flex items-start gap-3">
          <Image
            src={user.avatar || '/image.webp'}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full shrink-0"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">
              {user.full_name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <CircleUserRoundIcon size={16} className="opacity-60" />
              <span>Thông tin cá nhân</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <ListTodo size={16} className="opacity-60" />
              <span>Danh sách đơn hàng</span>
            </Link>
          </DropdownMenuItem>
          {user.email === 'nguyendinhchien19042003@gmail.com' && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <LayoutDashboardIcon
                  size={16}
                  className="opacity-60"
                />
                <span>Trang quản lý</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOutIcon size={16} className="opacity-60" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
