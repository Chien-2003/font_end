'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import NProgress from '@/lib/nprogress';

export default function NProgressProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  useEffect(() => {
    NProgress.done();
  }, [pathname]);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.button !== 0) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      if (!target) return;

      const anchor = target as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        anchor.target === '_blank'
      ) {
        return;
      }

      e.preventDefault();

      NProgress.start();

      setTimeout(() => {
        startTransition(() => {
          router.push(href);
        });
      }, 600);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router, startTransition]);

  return null;
}
