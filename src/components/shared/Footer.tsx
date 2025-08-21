'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaypal,
  FaPhoneAlt,
  FaRegPaperPlane,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

const STORE_LINKS = [
  { label: 'Tất cả sản phẩm', href: '#' },
  { label: 'Hàng mới về', href: '#' },
  { label: 'Bán chạy', href: '#' },
  { label: 'Bộ sưu tập', href: '#' },
];

const POLICY_LINKS = [
  {
    label: 'Chính sách đổi trả 60 ngày',
    href: '/dich-vu-60-ngay-doi-tra',
  },
  {
    label: 'Chính sách khuyến mãi',
    href: '/chuong-trinh-va-chinh-sach-khuyen-mai',
  },
  {
    label: 'Chính sách bảo mật',
    href: '/chinh-sach-bao-mat-thong-tin-ca-nhan',
  },
  { label: 'Chính sách giao hàng', href: '/chinh-sach-giao-hang' },
];

const SUPPORT_LINKS = [
  { label: 'Liên hệ', href: '#' },
  { label: 'Hỏi đáp - FAQs', href: '/hoi-dap-faq' },
  { label: 'Blog', href: '#' },
  { label: 'Theo dõi Đơn hàng', href: '#' },
];

const SOCIAL_ICONS = [
  { icon: <FaInstagram className="text-2xl" />, href: '#' },
  { icon: <FaFacebook className="text-2xl" />, href: '#' },
  { icon: <FaTiktok className="text-2xl" />, href: '#' },
  { icon: <FaYoutube className="text-2xl" />, href: '#' },
];

const PAYMENT_ICONS = [FaCcVisa, FaCcMastercard, FaPaypal];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-full md:px-4 lg:py-10 md:py-8 py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-center justify-center">
          <div className="lg:col-span-1 flex flex-col text-sm gap-3">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-xl flex flex-row space-x-2 font-bold mb-4 text-white"
              >
                <Image
                  src="/logo.svg"
                  alt="Elysia Wear"
                  width={32}
                  height={32}
                />{' '}
                <span>Elysia Wear</span>
              </Link>
              {[
                {
                  icon: <FaHome className="text-primary" />,
                  text: 'Công ty TNHH N.D.C',
                },
                {
                  icon: <FaMapMarkerAlt className="text-primary" />,
                  text: '172 Nguyễn Trãi, P.Bến Thành, Q1, HCM',
                },
                {
                  icon: <FaPhoneAlt className="text-primary" />,
                  text: '0834 265 606 - 0834 265 707',
                },
                {
                  icon: <MdMailOutline className="text-primary" />,
                  text: 'cskh@elysiawear.com',
                },
              ].map((item, i) => (
                <p
                  key={i}
                  className="flex flex-row gap-2 text-gray-400 max-w-xs"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </p>
              ))}
            </div>

            <div className="flex space-x-4 mt-3 items-center">
              {SOCIAL_ICONS.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Cửa Hàng" links={STORE_LINKS} />
          <FooterColumn title="Chính sách" links={POLICY_LINKS} />
          <FooterColumn
            title="Hỗ Trợ & Chăm sóc khách hàng"
            links={SUPPORT_LINKS}
          />
        </div>
        <div className="flex flex-row w-full lg:w-[24%] md:w-[70%] justify-self-end md:justify-center items-center">
          <div className="relative z-0 my-5 w-full group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 pr-10 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-background appearance-none dark:border-gray-600 dark:focus:border-primary pl-2 focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-priborder-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
              <FaRegPaperPlane />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-950/50">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2025 Elysia Wear. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2">
            {PAYMENT_ICONS.map((Icon, index) => (
              <Icon key={index} className="text-2xl text-gray-400" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-3 text-sm flex flex-col justify-center gap-2 items-start">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
