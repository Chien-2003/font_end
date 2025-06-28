import Navbar from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "@/app/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
