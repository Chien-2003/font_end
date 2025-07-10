"use client";

import { BellIcon, MailIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockNotifications = [
  {
    id: 1,
    title: "Đơn hàng của bạn đã được xác nhận",
    time: "2 giờ trước",
    icon: <MailIcon className="text-primary w-5 h-5" />,
  },
  {
    id: 2,
    title: "Sản phẩm yêu thích sắp hết hàng!",
    time: "Hôm qua",
    icon: <BellIcon className="text-secondary w-5 h-5" />,
  },
  {
    id: 3,
    title: "Bạn vừa nhận được mã giảm giá 10%",
    time: "2 ngày trước",
    icon: <BellIcon className="text-muted-foreground w-5 h-5" />,
  },
];

export default function NotificationPage() {
  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thông báo</h1>
      <Card>
        <CardContent className="p-0 divide-y">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 px-4 py-3"
            >
              <div className="mt-1">{notification.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">{notification.title}</p>
                <p className="text-muted-foreground text-xs">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
