'use client';

import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/button';

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
    <Button
      variant="outline"
      onClick={() => signIn('google')}
      className="w-full py-2 rounded mt-4 flex items-center justify-center"
    >
      <FaGoogle className="mr-3" />
      Google
    </Button>
  );
}
