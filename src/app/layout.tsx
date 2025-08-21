'use client';
import '@/app/globals.css';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import NProgressProvider from '@/components/shared/nprogress-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
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
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head> */}
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
