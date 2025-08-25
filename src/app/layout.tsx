'use client';
import '@/app/globals.css';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import { ThemeProvider } from '@/components/theme/theme-provider';
import NProgressProvider from '@/components/views/nprogress-provider';
import { CartProvider } from '@/contexts/CartContext';
import { UserProvider } from '@/contexts/UserContext';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
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
      <body
        className={cn(
          // 'text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]',
          fontSans,
        )}
      >
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* <ActiveThemeProvider> */}
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
            {/* </ActiveThemeProvider> */}
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
