'use client';
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  Gift,
  Newspaper,
  Package,
  Settings,
  Star,
  Truck,
} from 'lucide-react';
import { Fragment, useState } from 'react';
type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  isNew: boolean;
};
type TabKey = 'promotions' | 'orders' | 'news' | 'system';
type Notifications = Record<TabKey, Notification[]>;
const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('promotions');
  const [notifications, setNotifications] = useState<Notifications>({
    promotions: [
      {
        id: 1,
        title: '🎉 FLASH SALE 50% - Bộ Sưu Tập Thu Đông',
        message:
          'Giảm ngay 50% cho tất cả sản phẩm bộ sưu tập thu đông 2025. Chỉ còn 2 ngày!',
        time: '2 giờ trước',
        type: 'urgent',
        isNew: true,
      },
      {
        id: 2,
        title: '💝 Ưu đãi thành viên VIP',
        message:
          'Bạn được tặng voucher 200k cho đơn hàng từ 1.5 triệu. Mã: VIP200',
        time: '1 ngày trước',
        type: 'exclusive',
        isNew: true,
      },
      {
        id: 3,
        title: '🛍️ Freeship toàn quốc',
        message:
          'Miễn phí vận chuyển cho tất cả đơn hàng từ 500k. Áp dụng đến hết tháng.',
        time: '3 ngày trước',
        type: 'shipping',
        isNew: false,
      },
    ],
    orders: [
      {
        id: 1,
        title: '📦 Đơn hàng #DH2025001 đang được giao',
        message:
          'Đơn hàng Áo khoác dạ nữ cao cấp đang trên đường giao đến bạn.',
        time: '30 phút trước',
        type: 'shipping',
        isNew: true,
      },
      {
        id: 2,
        title: '✅ Đơn hàng #DH2025002 giao thành công',
        message:
          'Cảm ơn bạn đã mua hàng! Hãy đánh giá sản phẩm để nhận thêm ưu đãi.',
        time: '2 ngày trước',
        type: 'delivered',
        isNew: false,
      },
      {
        id: 3,
        title: '⏳ Đơn hàng #DH2025003 đang chuẩn bị',
        message:
          'Đơn hàng Set váy công sở đang được đóng gói cẩn thận.',
        time: '1 ngày trước',
        type: 'processing',
        isNew: false,
      },
    ],
    news: [
      {
        id: 1,
        title: "✨ BST Xuân Hè 2025: 'Urban Chic'",
        message:
          'Khám phá phong cách đô thị hiện đại với BST mới nhất từ thương hiệu.',
        time: '1 ngày trước',
        type: 'collection',
        isNew: true,
      },
      {
        id: 2,
        title: '📸 Lookbook: 5 cách phối đồ công sở',
        message:
          'Gợi ý phối đồ công sở thanh lịch và chuyên nghiệp cho nữ giới hiện đại.',
        time: '3 ngày trước',
        type: 'styling',
        isNew: false,
      },
      {
        id: 3,
        title: '🎬 Behind the scenes: Buổi chụp BST',
        message:
          'Cùng khám phá hậu trường buổi chụp hình BST Urban Chic đầy thú vị.',
        time: '1 tuần trước',
        type: 'video',
        isNew: false,
      },
    ],
    system: [
      {
        id: 1,
        title: '🔒 Cập nhật chính sách bảo mật',
        message:
          'Chúng tôi đã cập nhật chính sách bảo mật để bảo vệ thông tin cá nhân của bạn tốt hơn.',
        time: '1 tuần trước',
        type: 'security',
        isNew: false,
      },
      {
        id: 2,
        title: '🛠️ Bảo trì hệ thống',
        message:
          'Website sẽ bảo trì từ 2:00-4:00 sáng ngày 5/9. Xin lỗi vì sự bất tiện.',
        time: '2 tuần trước',
        type: 'maintenance',
        isNew: false,
      },
    ],
  });

  const tabs = [
    {
      id: 'promotions' as TabKey,
      label: 'Khuyến Mãi',
      icon: Gift,
      count: notifications.promotions.filter((n) => n.isNew).length,
    },
    {
      id: 'orders' as TabKey,
      label: 'Đơn Hàng',
      icon: Package,
      count: notifications.orders.filter((n) => n.isNew).length,
    },
    {
      id: 'news' as TabKey,
      label: 'Tin Tức',
      icon: Newspaper,
      count: notifications.news.filter((n) => n.isNew).length,
    },
    {
      id: 'system' as TabKey,
      label: 'Hệ Thống',
      icon: Settings,
      count: notifications.system.filter((n) => n.isNew).length,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'exclusive':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'shipping':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'exclusive':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'shipping':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
      case 'delivered':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
      case 'processing':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20';
      default:
        return 'border-l-gray-300 bg-gray-50 dark:bg-gray-800/20';
    }
  };

  return (
    <Fragment>
      <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">
              🔔 Trung Tâm Thông Báo
            </h1>
            <p className="text-muted-foreground text-lg">
              Cập nhật thông tin mới nhất về khuyến mãi, đơn hàng và
              tin tức thời trang
            </p>
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-muted/50 rounded-xl backdrop-blur-sm">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="min-h-[600px]">
            <div
              key={activeTab}
              className="space-y-4 animate-slide-in"
            >
              {notifications[activeTab]?.length > 0 ? (
                notifications[activeTab].map(
                  (notification: any, index: number) => (
                    <div
                      key={notification.id}
                      className={`relative p-6 rounded-xl border-l-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${getTypeColor(notification.type)} ${notification.isNew ? 'ring-2 ring-primary/20' : ''}`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {notification.isNew && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white animate-pulse">
                            Mới
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                            {notification.title}
                          </h3>
                          <p className="text-muted-foreground mb-3 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-sm text-muted-foreground/70 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 opacity-20">
                    <Bell className="w-full h-full text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">
                    Chưa có thông báo nào
                  </h3>
                  <p className="text-muted-foreground">
                    Thông báo mới sẽ xuất hiện tại đây
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <div
                  key={tab.id}
                  className="text-center p-4 bg-card rounded-lg border hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">
                    {notifications[tab.id]?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tab.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotificationPage;
