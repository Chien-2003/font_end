"use client";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user.email !== "nguyendinhchien19042003@gmail.com") {
      router.replace("/");
    }
  }, [user]);

  if (!user || user.email !== "nguyendinhchien19042003@gmail.com") {
    return null;
  }

  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full">
      <h1 className="text-2xl font-bold text-center">Quản lý hệ thống</h1>
    </div>
  );
}
