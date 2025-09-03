'use client';

import NProgress from '@/services/nprogress';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';

export default function NProgressProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const fullUrl = pathname + '?' + searchParams.toString();
  const previousUrlRef = useRef(fullUrl);

  useEffect(() => {
    NProgress.done();
    previousUrlRef.current = fullUrl;
  }, [fullUrl]);

  useEffect(() => {
    if (!isPending) {
      NProgress.done();
    }
  }, [isPending]);

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
      const newUrl = href.startsWith('/') ? href : '/' + href;
      const currentUrl =
        pathname +
        (searchParams.toString()
          ? '?' + searchParams.toString()
          : '');

      NProgress.start();

      startTransition(() => {
        if (newUrl === currentUrl || newUrl === pathname) {
          return;
        }
        router.push(href);
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router, startTransition, pathname, searchParams]);

  return null;
}
