import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: '404 - Không tìm thấy trang',
  description:
    'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
};

export default function NotFound() {
  return (
    <Fragment>
      <section className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold text-primary/10 select-none animate-pulse">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-7xl font-bold text-primary animate-bounce">
                404
              </span>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Oops! Trang không tồn tại
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc
              không bao giờ tồn tại.
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-chart-1 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-chart-2 animate-bounce delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-chart-3 animate-bounce delay-200"></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-lg shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Về trang chủ
            </Link>

            <Link
              href="/lien-he"
              className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 rounded-lg transition-all duration-200"
            >
              Liên hệ
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="mt-12 p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">
              Gợi ý cho bạn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Link
                href="/"
                className="flex items-center p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-chart-4 mr-3"></div>
                Sản phẩm
              </Link>
              <Link
                href="/cham-soc-khach-hang"
                className="flex items-center p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-chart-5 mr-3"></div>
                Chăm sóc khách hàng
              </Link>
              <Link
                href="/blog"
                className="flex items-center p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-chart-1 mr-3"></div>
                Blog
              </Link>
              <Link
                href="/ve-chung-toi"
                className="flex items-center p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-chart-2 mr-3"></div>
                Về chúng tôi
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-chart-2/5 blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-chart-3/5 blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
