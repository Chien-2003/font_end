'use client';

import {
  initialNotifications,
  Notification,
} from '@/data/notifications';
import {
  Bell,
  Check,
  Clock,
  GitPullRequest,
  MessageSquare,
  Share2,
  User,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';

interface NotificationIconProps {
  type: string;
  className?: string;
}

function NotificationIcon({
  type,
  className,
}: NotificationIconProps) {
  const iconProps = { size: 14, className };

  switch (type) {
    case 'review':
      return <GitPullRequest {...iconProps} />;
    case 'share':
      return <Share2 {...iconProps} />;
    case 'assign':
      return <UserPlus {...iconProps} />;
    case 'comment':
      return <MessageSquare {...iconProps} />;
    case 'mention':
      return <User {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
}

interface AvatarProps {
  initials: string;
  isOnline?: boolean;
}

function Avatar({ initials, isOnline = false }: AvatarProps) {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-emerald-500 to-emerald-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-rose-500 to-rose-600',
    'bg-gradient-to-br from-amber-500 to-amber-600',
    'bg-gradient-to-br from-cyan-500 to-cyan-600',
  ];

  const colorIndex = initials.charCodeAt(0) % colors.length;

  return (
    <div className="relative">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm ${colors[colorIndex]}`}
      >
        {initials}
      </div>
      {isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-popover rounded-full"></div>
      )}
    </div>
  );
}

interface DotProps {
  className?: string;
}

function Dot({ className }: DotProps) {
  return (
    <div
      className={`w-2 h-2 bg-primary rounded-full animate-pulse ${className || ''}`}
    ></div>
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = (): void => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const handleNotificationClick = (id: number): void => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-2 hover:bg-accent rounded-full transition-all duration-300 transform hover:scale-105"
        aria-label="Open notifications"
      >
        <Bell
          size={20}
          className={`text-foreground transition-all duration-300 ${
            isOpen ? 'rotate-12' : 'group-hover:rotate-6'
          }`}
          aria-hidden="true"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {unreadCount > 0 && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        )}
      </Button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-96 z-50 bg-popover/95 backdrop-blur-sm border border-border shadow-2xl rounded-2xl overflow-hidden transform origin-top transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-primary px-6 py-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Thông báo</h3>
                <p className="text-primary-foreground/80 text-sm">
                  {unreadCount > 0
                    ? `${unreadCount} thông báo mới`
                    : 'Tất cả đã đọc'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full text-xs px-3 py-1 flex items-center gap-1 transition-colors"
                onClick={handleMarkAllAsRead}
              >
                <Check size={14} />
                Đánh dấu đã đọc
              </button>
            )}
          </div>
        </div>
        <div
          className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide
"
        >
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell size={48} className="mb-4 opacity-50" />
              <p className="text-sm font-medium">
                Không có thông báo nào
              </p>
              <p className="text-xs opacity-70 mt-1">
                Bạn sẽ thấy thông báo tại đây
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`group relative px-6 py-4 hover:bg-accent/50 transition-all duration-300 cursor-pointer ${
                    notification.unread ? 'bg-primary/5' : ''
                  }`}
                  onClick={() =>
                    handleNotificationClick(notification.id)
                  }
                >
                  <div className="flex items-start gap-3">
                    <Avatar
                      initials={notification.avatar}
                      isOnline={index < 2}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold hover:text-primary transition-colors">
                            {notification.user}
                          </span>
                          <span className="text-muted-foreground mx-1">
                            {notification.action}
                          </span>
                          <span className="font-semibold hover:text-primary transition-colors">
                            {notification.target}
                          </span>
                        </p>
                        {notification.unread && <Dot />}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <NotificationIcon
                          type={notification.type}
                          className="opacity-60"
                        />
                        <Clock size={12} />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/80 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                </div>
              ))}
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="border-t border-border p-4 bg-muted/50">
            <Link
              href="/thong-bao"
              className="block w-full text-center text-sm font-medium text-primary hover:text-primary/80 hover:bg-accent py-2 rounded-lg transition-all duration-200"
            >
              Xem tất cả thông báo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

<!-- ////////////////////////////////////// -->





'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import { items } from '@/data/policy';
import { PlusIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { Fragment, useState } from 'react';

export default function Page() {
  const [openItem, setOpenItem] = useState<string | undefined>('');

  return (
    <Fragment>
      <div className="mt-6 px-3">
        <Breadcrumbs />
      </div>
      <div className="mx-auto max-w-6xl w-full h-full py-8 px-2 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center">
          Chương trình và chính sách khuyến mãi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5">
            <div className="space-y-2 sticky top-5">
              {items.map((item) => (
                <h2
                  key={item.id}
                  onClick={() => setOpenItem(item.id)}
                  className={`text-base font-semibold uppercase cursor-pointer transition-colors duration-200 hover:text-primary ${
                    openItem === item.id
                      ? 'text-primary'
                      : 'text-black dark:text-white'
                  }`}
                >
                  {item.title}
                </h2>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-2">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
              value={openItem}
              onValueChange={(value) =>
                setOpenItem(value || undefined)
              }
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={`rounded border px-4 py-1 outline-none last:border-b transition-colors duration-200 cursor-pointer
                    hover:border-primary focus-within:border-primary
                    has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[1px]
                    ${openItem === item.id ? 'border-primary' : 'border'}
                  `}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={`flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold uppercase transition-all outline-none focus-visible:ring-0
                        cursor-pointer
                        [&>svg>path:last-child]:origin-center
                        [&>svg>path:last-child]:transition-all
                        [&>svg>path:last-child]:duration-200
                        [&[data-state=open]>svg]:rotate-180
                        [&[data-state=open]>svg>path:last-child]:rotate-90
                        [&[data-state=open]>svg>path:last-child]:opacity-0
                      `}
                    >
                      {item.title}
                      <PlusIcon
                        size={22}
                        className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-sm text-muted-foreground pb-2 space-y-2">
                    {Array.isArray(item.content) ? (
                      item.content.map((section, index) => (
                        <div
                          key={index}
                          className="text-black dark:text-white"
                        >
                          <strong className="text-black dark:text-white">
                            {section.label}
                          </strong>{' '}
                          {section.value}
                        </div>
                      ))
                    ) : (
                      <div className="text-black dark:text-white">
                        {item.content}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

