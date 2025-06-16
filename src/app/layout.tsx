// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers"; // đường dẫn đúng nếu bạn để file ở app/

export const metadata: Metadata = {
  title: "My App",
  description: "App with Shadcn UI and Theme support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
