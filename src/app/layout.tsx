import { UserProvider } from "@/contexts/UserContext";
import "swiper/css";
import "swiper/css/pagination";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
