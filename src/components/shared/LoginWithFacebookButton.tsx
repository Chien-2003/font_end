"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/swal";
import { FaFacebookF } from "react-icons/fa";

export default function LoginWithFacebookButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.email &&
      session?.user?.name
    ) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: session.user.email,
          full_name: session.user.name,
          avatar: session.user.image,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi đăng nhập Facebook");
          return res.json();
        })
        .then(async (data) => {
          await showSuccess(data.message);
          router.replace("/");
        })
        .catch((err) => {
          showError(err.message || "Lỗi đăng nhập Facebook");
        });
    }
  }, [status, session, router]);

  return (
    <button
      onClick={() => signIn("facebook")}
      className="w-full bg-blue-600 text-white py-2 rounded mt-4 flex items-center justify-center"
    >
      <FaFacebookF className="mr-3" /> Đăng nhập bằng Facebook
    </button>
  );
}
