import Link from 'next/link';
import { FaCcMastercard, FaCcVisa, FaPaypal } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="mx-auto max-w-full md:px-4 lg:py-16 md:py-8 py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-white">
              Elysia Wear
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Phong cách tối giản cho cuộc sống hiện đại. Mang đến
              những thiết kế tinh tế và chất lượng vượt trội.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram text-xl"></i>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-tiktok text-xl"></i>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-youtube text-xl"></i>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">
              Cửa Hàng
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Hàng mới về
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Bán chạy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Bộ sưu tập
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">
              Chính sách
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dich-vu-60-ngay-doi-tra"
                  className="hover:text-white hover:underline"
                >
                  Chính sách đổi trả 60 ngày
                </Link>
              </li>
              <li>
                <Link
                  href="/chuong-trinh-va-chinh-sach-khuyen-mai"
                  className="hover:text-white hover:underline"
                >
                  Chính sách khuyến mãi
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-bao-mat-thong-tin-ca-nhan"
                  className="hover:text-white hover:underline"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-giao-hang"
                  className="hover:text-white hover:underline"
                >
                  Chính sách giao hàng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ Trợ & Chăm sóc khách hàng</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Hỏi đáp - FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:underline"
                >
                  Theo dõi Đơn hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-950/50">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2025 Elysia Wear. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2">
            <FaCcVisa className=" text-2xl text-gray-400" />
            <FaCcMastercard className=" text-2xl text-gray-400" />
            <FaPaypal className=" text-2xl text-gray-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
