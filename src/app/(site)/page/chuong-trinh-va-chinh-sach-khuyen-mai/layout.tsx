import { Fragment } from 'react';

export const metadata = {
  title: 'Chương Trình và Chính Sách Khuyến Mãi',
  description:
    'Khám phá các chương trình khuyến mãi, ưu đãi hấp dẫn và chính sách dành riêng cho khách hàng tại Elysia Wear. Cập nhật liên tục, mua sắm tiết kiệm hơn!',
  openGraph: {
    title: 'Chương Trình và Chính Sách Khuyến Mãi',
    description:
      'Cập nhật các chương trình ưu đãi, giảm giá mới nhất. Chính sách khuyến mãi hấp dẫn dành cho bạn.',
    url: 'http://localhost:3000/chuong-trinh-va-chinh-sach-khuyen-mai',
    siteName: 'Elysia Wear',
    images: [
      {
        url: 'http://localhost:3000/images/promotion-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Chương trình khuyến mãi',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chương Trình và Chính Sách Khuyến Mãi | Elysia Wear',
    description:
      'Xem ngay chương trình ưu đãi & khuyến mãi đặc biệt từ Elysia Wear!',
    images: ['http://localhost:3000/images/promotion-banner.jpg'],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
