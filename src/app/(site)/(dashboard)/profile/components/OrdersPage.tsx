'use client';

import { motion } from 'framer-motion';
import {
  Check,
  Clock,
  CreditCard,
  Home,
  Package,
  RefreshCw,
  ShoppingCart,
  Truck,
  Undo,
  XCircle,
} from 'lucide-react';

const ORDER_STATUS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  paid: 'Đã thanh toán',
  processing: 'Đang xử lý',
  shipping: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
  refunded: 'Đã hoàn tiền',
  returned: 'Đã trả hàng',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 text-white';
    case 'confirmed':
      return 'bg-blue-500 text-white';
    case 'paid':
      return 'bg-green-500 text-white';
    case 'processing':
      return 'bg-purple-500 text-white';
    case 'shipping':
      return 'bg-orange-500 text-white';
    case 'delivered':
      return 'bg-teal-500 text-white';
    case 'completed':
      return 'bg-emerald-500 text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    case 'refunded':
      return 'bg-indigo-500 text-white';
    case 'returned':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

const getBorderColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'border-yellow-300';
    case 'confirmed':
      return 'border-blue-300';
    case 'paid':
      return 'border-green-300';
    case 'processing':
      return 'border-purple-300';
    case 'shipping':
      return 'border-orange-300';
    case 'delivered':
      return 'border-teal-300';
    case 'completed':
      return 'border-emerald-300';
    case 'cancelled':
      return 'border-red-300';
    case 'refunded':
      return 'border-indigo-300';
    case 'returned':
      return 'border-gray-300';
    default:
      return 'border-gray-300';
  }
};

const getStatusIcon = (status: string) => {
  const iconProps = { size: 16, className: 'text-white' };

  switch (status) {
    case 'pending':
      return <Clock {...iconProps} />;
    case 'confirmed':
      return <Check {...iconProps} />;
    case 'paid':
      return <CreditCard {...iconProps} />;
    case 'processing':
      return <Package {...iconProps} />;
    case 'shipping':
      return <Truck {...iconProps} />;
    case 'delivered':
      return <Home {...iconProps} />;
    case 'completed':
      return <Check {...iconProps} />;
    case 'cancelled':
      return <XCircle {...iconProps} />;
    case 'refunded':
      return <RefreshCw {...iconProps} />;
    case 'returned':
      return <Undo {...iconProps} />;
    default:
      return <Clock {...iconProps} />;
  }
};

const orderItems = [
  {
    id: 1,
    date: '15 Thg 12, 2024 - 09:30',
    title: 'Đặt hàng thành công',
    status: 'pending' as keyof typeof ORDER_STATUS,
    description:
      'Đơn hàng #DH001234 đã được tạo thành công. Đang chờ xác nhận từ người bán.',
    details: 'Tổng giá trị: 2,450,000 VNĐ • 3 sản phẩm',
    completed: true,
  },
  {
    id: 2,
    date: '15 Thg 12, 2024 - 10:15',
    title: 'Xác nhận đơn hàng',
    status: 'confirmed' as keyof typeof ORDER_STATUS,
    description:
      'Người bán đã xác nhận đơn hàng và kiểm tra tình trạng hàng trong kho.',
    details: 'Thời gian xử lý dự kiến: 1-2 ngày làm việc',
    completed: true,
  },
  {
    id: 3,
    date: '15 Thg 12, 2024 - 14:20',
    title: 'Thanh toán thành công',
    status: 'paid' as keyof typeof ORDER_STATUS,
    description:
      'Thanh toán qua VNPay đã được xử lý thành công. Hóa đơn đã được gửi qua email.',
    details: 'Phương thức: VNPay • Số tiền: 2,450,000 VNĐ',
    completed: true,
  },
  {
    id: 4,
    date: '16 Thg 12, 2024 - 08:45',
    title: 'Đang chuẩn bị hàng',
    status: 'processing' as keyof typeof ORDER_STATUS,
    description:
      'Đơn hàng đang được đóng gói và chuẩn bị giao cho đơn vị vận chuyển.',
    details:
      'Kho hàng: TP. Hồ Chí Minh • Đơn vị vận chuyển: Giao Hàng Nhanh',
    completed: true,
  },
  {
    id: 5,
    date: '16 Thg 12, 2024 - 16:30',
    title: 'Đang vận chuyển',
    status: 'shipping' as keyof typeof ORDER_STATUS,
    description:
      'Đơn hàng đã được giao cho shipper và đang trên đường giao đến địa chỉ của bạn.',
    details:
      'Mã vận đơn: GHN123456789 • Shipper: Nguyễn Văn A • SĐT: 0901234567',
    completed: true,
  },
  {
    id: 6,
    date: '17 Thg 12, 2024 - 11:00',
    title: 'Giao hàng thành công',
    status: 'delivered' as keyof typeof ORDER_STATUS,
    description:
      'Đơn hàng đã được giao thành công đến địa chỉ của bạn.',
    details: 'Người nhận: Trần Thị B • Thời gian giao: 11:00 AM',
    completed: false,
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Theo dõi đơn hàng
            </h1>
            <p className="text-muted-foreground">
              Xem chi tiết tiến trình đơn hàng của bạn
            </p>
          </div>
        </div>
      </motion.div>

      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl shadow-sm border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-card-foreground">
            Đơn hàng #DH001234
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('shipping')}`}
          >
            {ORDER_STATUS.shipping}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Ngày đặt hàng
            </p>
            <p className="font-medium text-card-foreground">
              15 Tháng 12, 2024
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tổng tiền</p>
            <p className="font-medium text-lg text-primary">
              2,450,000 VNĐ
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Phương thức thanh toán
            </p>
            <p className="font-medium text-card-foreground">VNPay</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Địa chỉ giao hàng
          </p>
          <p className="font-medium text-card-foreground">
            123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl shadow-sm border border-border p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-card-foreground">
          Lịch sử đơn hàng
        </h2>

        <div className="relative">
          {orderItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="relative flex items-start gap-4 pb-8"
            >
              {/* Timeline Line */}
              {index < orderItems.length - 1 && (
                <div
                  className={`absolute left-4 top-8 w-0.5 h-full ${
                    item.completed ? 'bg-primary/30' : 'bg-border'
                  }`}
                  style={{ height: 'calc(100% + 2rem)' }}
                />
              )}

              {/* Status Icon */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(item.status)} shadow-sm`}
              >
                {getStatusIcon(item.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {ORDER_STATUS[item.status]}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {item.date}
                </p>

                <p className="text-foreground mb-3 leading-relaxed">
                  {item.description}
                </p>

                {item.details && (
                  <div
                    className={`bg-muted/50 rounded-lg p-3 border-l-4 ${getBorderColor(item.status)}`}
                  >
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next Steps Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-primary/5 border border-primary/20 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">
              Đơn hàng đang được vận chuyển
            </h3>
            <p className="text-sm text-muted-foreground">
              Đơn hàng của bạn dự kiến sẽ được giao trong vòng 1-2
              ngày tới. Bạn có thể liên hệ với shipper qua số điện
              thoại 0901234567 để biết thêm chi tiết.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
