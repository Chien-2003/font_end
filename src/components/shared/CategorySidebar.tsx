import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logout } from '@mui/icons-material';
const items = [
  {
    title: 'Home',
    url: '',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '',
    icon: Settings,
  },
  {
    title: 'Logout',
    url: '',
    icon: Logout,
  },
  {
    title: 'Profile',
    url: '',
    icon: Settings,
  },
  {
    title: 'Help',
    url: '',
    icon: Settings,
  },
  {
    title: 'Contact',
    url: '',
    icon: Settings,
  },
  {
    title: 'About',
    url: '',
    icon: Settings,
  },

  {
    title: 'Terms',
    url: '',
    icon: Settings,
  },
  {
    title: 'Privacy',
    url: '',
    icon: Settings,
  },
  {
    title: 'Feedback',
    url: '',
    icon: Settings,
  },
  {
    title: 'Support',
    url: '',
    icon: Settings,
  },
  {
    title: 'Documentation',
    url: '',
    icon: Settings,
  },
  {
    title: 'API',
    url: '',
    icon: Settings,
  },
  {
    title: 'Changelog',
    url: '',
    icon: Settings,
  },
  {
    title: 'Roadmap',
    url: '',
    icon: Settings,
  },
  {
    title: 'Community',
    url: '',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <h2 className="font-criteria text-base font-medium leading-6">
              Bộ lọc
            </h2>
            <div className="font-sans text-base leading-4.5 text-neutral-500">
              200 kết quả
            </div>
          </div>
          <div className="relative h-[1px] w-full bg-neutral-900/20 my-3 mb-0"></div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
