import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông báo | Elysia Wear",
  description:
    "Tất cả các thông báo mới nhất từ cửa hàng thời trang Elysia Wear.",
};

export default function NotiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
