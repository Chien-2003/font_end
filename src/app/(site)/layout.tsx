import Navbar from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";
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
        url: "https://elysiawear.com/og-image.jpg",
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
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen mx-auto">{children}</main>
      <Footer />
    </>
  );
}
