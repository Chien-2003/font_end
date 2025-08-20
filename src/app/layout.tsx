'use client';
import '@/app/globals.css';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import NProgressProvider from '@/components/shared/nprogress-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { CartProvider } from '@/contexts/CartContext';
import { UserProvider } from '@/contexts/UserContext';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import 'swiper/css';
import 'swiper/css/pagination';
const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
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
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <CartProvider>
                <Suspense fallback={null}>
                  <NProgressProvider />
                </Suspense>
                <Toaster
                  richColors
                  position="top-right"
                  closeButton={true}
                  expand={false}
                />
                <div className="bg-background dark:bg-gray-900 elysia-wear">
                  {children}
                </div>
                {/* <Chat /> */}
              </CartProvider>
            </UserProvider>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
