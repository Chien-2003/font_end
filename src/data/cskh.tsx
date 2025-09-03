import {
  Award,
  BookOpen,
  Clock,
  Gift,
  Heart,
  HelpCircle,
  Star,
} from 'lucide-react';
export const items = [
  {
    href: '##',
    imgSrc: '/policy/1.png',
    title: 'Tra cứu đơn hàng',
    desc: 'Hành trình đơn hàng của bạn',
  },
  {
    href: '##',
    imgSrc: '/policy/2.png',
    title: 'Thành viên ElysiaWearClub',
    desc: 'Ưu đãi khách hàng thân thiết',
  },
  {
    href: '##',
    imgSrc: '/policy/3.png',
    title: 'ElysiaWearNews',
    desc: 'Điểm chạm mỗi tuần',
  },
  {
    href: '##',
    imgSrc: '/policy/4.png',
    title: 'ElysiaWearWOW',
    desc: 'Câu chuyện hay',
  },
  {
    href: '##',
    imgSrc: '/policy/5.png',
    title: 'ElysiaWearMoments',
    desc: 'Life at CS',
  },
  {
    href: '##',
    imgSrc: '/policy/6.png',
    title: '11 Cam kết của ElysiaWearmate',
    desc: 'Mang đến trải nghiệm hài lòng',
  },
  {
    href: '/hoi-dap-faq',
    imgSrc: '/policy/7.png',
    title: 'Thư viện Hỏi & Đáp',
    desc: 'Bạn hỏi - CSKH trả lời',
  },
];

export const getModalContent = (title: string) => {
  const contentMap: Record<string, any> = {
    'Tra cứu đơn hàng': {
      icon: <Clock className="w-8 h-8 text-blue-900" />,
      content:
        'Tính năng tra cứu đơn hàng đang được phát triển. Bạn có thể liên hệ hotline 0834 265 606 để được hỗ trợ tra cứu trạng thái đơn hàng.',
      features: [
        'Theo dõi realtime',
        'Lịch sử đơn hàng',
        'Thông báo giao hàng',
      ],
    },
    'Thành viên ElysiaWearClub': {
      icon: <Star className="w-8 h-8 text-yellow-900" />,
      content:
        'Chương trình thành viên ElysiaWearClub mang đến nhiều ưu đãi độc quyền cho khách hàng thân thiết.',
      features: [
        'Tích điểm mỗi đơn hàng',
        'Ưu đãi sinh nhật',
        'Sale riêng cho thành viên',
      ],
    },
    ElysiaWearNews: {
      icon: <BookOpen className="w-8 h-8 text-green-900" />,
      content:
        'Cập nhật những tin tức mới nhất về thời trang và lifestyle từ ElysiaWear.',
      features: [
        'Xu hướng thời trang',
        'Tips phối đồ',
        'Lifestyle blog',
      ],
    },
    ElysiaWearWOW: {
      icon: <Gift className="w-8 h-8 text-purple-900" />,
      content:
        'Khám phá những câu chuyện thú vị và trải nghiệm tuyệt vời từ cộng đồng ElysiaWear.',
      features: [
        'Customer stories',
        'Behind the scenes',
        'Brand journey',
      ],
    },
    ElysiaWearMoments: {
      icon: <Heart className="w-8 h-8 text-red-900" />,
      content:
        'Chia sẻ những khoảnh khắc đẹp trong cuộc sống cùng ElysiaWear.',
      features: [
        'Photo contest',
        'User generated content',
        'Community highlights',
      ],
    },
    '11 Cam kết của ElysiaWearmate': {
      icon: <Award className="w-8 h-8 text-indigo-900" />,
      content:
        'ElysiaWear cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.',
      features: [
        'Chất lượng đảm bảo',
        'Dịch vụ tận tâm',
        'Giá cả hợp lý',
      ],
    },
  };
  return (
    contentMap[title] || {
      icon: <HelpCircle className="w-8 h-8 text-gray" />,
      content: 'Thông tin chi tiết đang được cập nhật.',
      features: [],
    }
  );
};
