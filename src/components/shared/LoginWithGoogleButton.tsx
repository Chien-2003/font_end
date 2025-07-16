'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showSuccess, showError } from '@/lib/swal';
import { FaGoogle } from 'react-icons/fa';
import { useUser } from '@/contexts/UserContext';

export default function LoginWithGoogleButton() {
  const { data: session, status } = useSession();
  const { fetchUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (
      session?.provider === 'google' &&
      status === 'authenticated' &&
      session.user?.email &&
      session.user?.name
    ) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: session.user.email,
          full_name: session.user.name,
          avatar: session.user.image,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Lỗi đăng nhập Google');
          return res.json();
        })
        .then(async (data) => {
          await fetchUser();
          await showSuccess(data.message);
          router.replace('/');
        })
        .catch((err) => {
          showError(err.message || 'Lỗi đăng nhập Google');
        });
    }
  }, [status, session, router]);

  return (
    <button
      onClick={() => signIn('google')}
      className="w-full bg-blue-600 text-white py-2 rounded mt-4 flex items-center justify-center"
    >
      <FaGoogle className="mr-3" />
      Google
    </button>
  );
}
