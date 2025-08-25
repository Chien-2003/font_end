import Footer from '@/components/views/Footer';
import Navbar from '@/components/views/Header';
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
