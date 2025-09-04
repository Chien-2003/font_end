'use client';

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  Star,
  Truck,
  User,
} from 'lucide-react';
import { Fragment, useState } from 'react';

interface OrderStatus {
  id: string;
  status:
    | 'pending'
    | 'confirmed'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  totalAmount: number;
  timeline: {
    status: string;
    date: string;
    location?: string;
    description: string;
    completed: boolean;
  }[];
}

export default function OrderTracking() {
  const [trackingInput, setTrackingInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [orderData, setOrderData] = useState<OrderStatus | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data for demo
  const mockOrderData: OrderStatus = {
    id: 'ORD-2025-001',
    status: 'shipped',
    orderDate: '2025-09-01',
    estimatedDelivery: '2025-09-06',
    trackingNumber: 'VN123456789',
    customerInfo: {
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@email.com',
      phone: '+84 901 234 567',
      address: 'Số 123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM',
    },
    items: [
      { name: 'Áo thun nam cao cấp', quantity: 2, price: 299000 },
      { name: 'Quần jean slim fit', quantity: 1, price: 599000 },
    ],
    totalAmount: 1197000,
    timeline: [
      {
        status: 'Đặt hàng thành công',
        date: '2025-09-01 09:30',
        description: 'Đơn hàng đã được tiếp nhận và xác nhận',
        completed: true,
      },
      {
        status: 'Xác nhận đơn hàng',
        date: '2025-09-01 14:20',
        description: 'Đơn hàng đã được xác nhận và chuẩn bị',
        completed: true,
      },
      {
        status: 'Đang vận chuyển',
        date: '2025-09-03 08:15',
        location: 'Trung tâm phân loại TP.HCM',
        description: 'Đơn hàng đang trên đường vận chuyển',
        completed: true,
      },
      {
        status: 'Đang giao hàng',
        date: '2025-09-06',
        location: 'Quận 1, TP.HCM',
        description: 'Shipper đang giao hàng đến địa chỉ của bạn',
        completed: false,
      },
      {
        status: 'Đã giao hàng',
        date: '',
        description: 'Giao hàng thành công',
        completed: false,
      },
    ],
  };

  const handleTrackOrder = async () => {
    if (!trackingInput.trim() || !contactInput.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (
        trackingInput === 'ORD-2025-001' ||
        trackingInput === 'VN123456789'
      ) {
        setOrderData(mockOrderData);
      } else {
        setError(
          'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin.',
        );
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'confirmed':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'shipped':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      case 'delivered':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'confirmed':
        return CheckCircle;
      case 'shipped':
        return Truck;
      case 'delivered':
        return Package;
      case 'cancelled':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang vận chuyển';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <Fragment>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
      <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-in slide-in-from-top duration-500">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <Package className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-md animate-pulse" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Theo dõi đơn hàng
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Nhập thông tin để kiểm tra trạng thái đơn hàng của bạn
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl animate-in slide-in-from-bottom duration-500">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Mã đơn hàng hoặc mã vận đơn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: ORD-2025-001 hoặc VN123456789"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email hoặc số điện thoại
                  </label>
                  <input
                    type="text"
                    placeholder="Email hoặc số điện thoại khi đặt hàng"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none"
                  />
                </div>
              </div>
              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Theo dõi đơn hàng
                  </>
                )}
              </button>
            </div>
          </div>
          {orderData && (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Thông tin đơn hàng
                  </h2>
                  <div
                    className={`px-4 py-2 rounded-full font-medium ${getStatusColor(orderData.status)}`}
                  >
                    {getStatusText(orderData.status)}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Mã đơn hàng
                    </p>
                    <p className="font-semibold text-foreground">
                      {orderData.id}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Ngày đặt hàng
                    </p>
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(
                        orderData.orderDate,
                      ).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Mã vận đơn
                    </p>
                    <p className="font-semibold text-foreground">
                      {orderData.trackingNumber}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Dự kiến giao
                    </p>
                    <p className="font-semibold text-foreground">
                      {new Date(
                        orderData.estimatedDelivery,
                      ).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  Trạng thái vận chuyển
                </h3>
                <div className="space-y-4">
                  {orderData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.completed
                              ? 'bg-primary text-primary-foreground'
                              : index ===
                                  orderData.timeline.findIndex(
                                    (t) => !t.completed,
                                  )
                                ? 'bg-primary/20 text-primary animate-pulse'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : index ===
                            orderData.timeline.findIndex(
                              (t) => !t.completed,
                            ) ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        {index < orderData.timeline.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              item.completed
                                ? 'bg-primary'
                                : 'bg-border'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`font-semibold ${
                              item.completed
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {item.status}
                          </h4>
                          {item.date && (
                            <span className="text-sm text-muted-foreground">
                              • {item.date}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.description}
                        </p>
                        {item.location && (
                          <p className="text-sm text-primary flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    Thông tin khách hàng
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">
                        {orderData.customerInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">
                        {orderData.customerInfo.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">
                        {orderData.customerInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <span className="text-foreground">
                        {orderData.customerInfo.address}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    Chi tiết đơn hàng
                  </h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border/20 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground">
                          {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border/20">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-foreground">
                          Tổng cộng:
                        </span>
                        <span className="text-primary">
                          {orderData.totalAmount.toLocaleString(
                            'vi-VN',
                          )}
                          ₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Cần hỗ trợ thêm?
                  </h3>
                  <p className="text-muted-foreground">
                    Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc
                    nào về đơn hàng
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Gọi hotline
                    </button>
                    <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Gửi email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!orderData && (
            <div className="text-center p-6 bg-muted/30 rounded-xl border border-border/20 animate-in fade-in duration-700">
              <div className="space-y-2">
                <Star className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">
                  Demo - Để test thử
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sử dụng mã:{' '}
                  <code className="bg-muted px-2 py-1 rounded font-mono">
                    ORD-2025-001
                  </code>{' '}
                  hoặc{' '}
                  <code className="bg-muted px-2 py-1 rounded font-mono">
                    VN123456789
                  </code>
                </p>
                <p className="text-sm text-muted-foreground">
                  Email/SĐT: bất kỳ giá trị nào
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
