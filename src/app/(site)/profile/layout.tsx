import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_TITLE } from "@/constants/metadata";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
