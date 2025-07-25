import Navbar from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full mx-auto">{children}</main>
      <Footer />
    </>
  );
}
