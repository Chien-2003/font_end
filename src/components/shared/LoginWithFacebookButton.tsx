'use client';

import { useUser } from '@/contexts/UserContext';
import { showError, showSuccess } from '@/lib/swal';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { Button } from '../ui/button';

export default function LoginWithFacebookButton() {
  const { data: session, status } = useSession();
  const { fetchUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (
      session?.provider === 'facebook' &&
      status === 'authenticated' &&
      session.user?.email &&
      session.user?.name
    ) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login-facebook`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: session.user.email,
            full_name: session.user.name,
            avatar: session.user.image,
          }),
        },
      )
        .then((res) => {
          if (!res.ok) throw new Error('Lỗi đăng nhập Facebook');
          return res.json();
        })
        .then(async (data) => {
          await fetchUser();
          await showSuccess(data.message);
          router.replace('/');
        })
        .catch((err) => {
          showError(err.message || 'Lỗi đăng nhập Facebook');
        });
    }
  }, [status, session, router]);

  return (
    <Button
      variant="outline"
      onClick={() => signIn('facebook')}
      className="w-full py-2 rounded mt-4 flex items-center justify-center"
    >
      <FaFacebookF className="mr-3" />
      Facebook
    </Button>
  );
}
