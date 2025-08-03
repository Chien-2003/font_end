import Navbar from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Fragment } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />
      <main className="w-full mx-auto">{children}</main>
      <Footer />
    </Fragment>
  );
}
