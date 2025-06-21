import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { UserProvider } from "@/contexts/UserContext";
import Navbar from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { APP_DESCRIPTION, APP_TITLE } from "@/constants/metadata";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
