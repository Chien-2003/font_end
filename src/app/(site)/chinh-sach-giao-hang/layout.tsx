import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Chính Sách Giao Hàng',
  description:
    'Tìm hiểu chi tiết về chính sách giao hàng, thời gian giao hàng và các khu vực hỗ trợ từ Elysia Wear.',
  keywords: [
    'chính sách giao hàng',
    'vận chuyển',
    'giao hàng nhanh',
    'phí ship',
    'khu vực giao hàng',
  ],
  openGraph: {
    title: 'Chính Sách Giao Hàng | Elysia Wear',
    description:
      'Chi tiết các quy định và phạm vi giao hàng của chúng tôi.',
    url: 'https://www.tenwebsite.com/chinh-sach-giao-hang',
    type: 'website',
    images: [
      {
        url: 'https://www.tenwebsite.com/images/og-delivery.jpg',
        width: 1200,
        height: 630,
        alt: 'Chính sách giao hàng',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chính Sách Giao Hàng | Elysia Wear',
    description:
      'Xem thông tin vận chuyển và giao hàng từ Elysia Wear.',
    images: ['https://www.tenwebsite.com/images/og-delivery.jpg'],
  },
  alternates: {
    canonical: 'http://localhost:3000/chinh-sach-giao-hang',
  },
};
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
