"use client";
import { Inter } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
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
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <CartProvider>
                <div className="dark:bg-gray-900">{children}</div>
              </CartProvider>
            </UserProvider>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
