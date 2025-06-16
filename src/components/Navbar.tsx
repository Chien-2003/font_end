"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <>
          <span>Xin chào {session.user?.user_name}</span>
          <button onClick={() => signOut()}>Đăng xuất</button>
        </>
      ) : (
        <span>Chưa đăng nhập</span>
      )}
    </nav>
  );
}
