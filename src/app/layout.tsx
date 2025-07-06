import { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Elysia Wear | Thời trang cao cấp cho phái đẹp",
  description:
    "Khám phá bộ sưu tập thời trang nữ sang trọng, tinh tế và hiện đại tại Elysia Wear. Nơi tôn vinh vẻ đẹp tự tin của bạn mỗi ngày.",
  keywords: [
    "Elysia Wear",
    "thời trang nữ",
    "đầm dạ tiệc",
    "váy công sở",
    "phong cách hiện đại",
    "thời trang cao cấp",
  ],
  openGraph: {
    title: "Elysia Wear | Thời trang cao cấp cho phái đẹp",
    description:
      "Khám phá bộ sưu tập sang trọng và hiện đại dành cho phái đẹp tại Elysia Wear.",
    url: "https://elysiawear.com",
    siteName: "Elysia Wear",
    images: [
      {
        url: "https://elysiawear.com/og-image.jpg", // ✅ thay bằng link ảnh thật nếu có
        width: 1200,
        height: 630,
        alt: "Elysia Wear - Thời trang nữ cao cấp",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
