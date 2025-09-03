import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'ElysiaWearPrint - Dịch vụ in ấn theo yêu cầu',
  description:
    'ElysiaWearPrint - Dịch vụ in ấn theo yêu cầu của ElysiaWear. Tùy chỉnh sản phẩm theo ý thích, từ in logo công ty đến thiết kế cá nhân. Giao hàng 24h, bảo hành 60 ngày.',
};

export default function ElysiaWearPrintPage() {
  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Cam kết chất lượng',
      description:
        'Sản phẩm được sản xuất theo tiêu chuẩn ElysiaWear',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: 'Dịch vụ tận tâm',
      description: 'Bảo hành in ấn lên đến 60 ngày',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Không giới hạn số lượng',
      description: 'Nhận in từ 1 sản phẩm',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Xử lý nhanh',
      description: 'Giao hàng trong 24 giờ cho đơn hàng số lượng ít',
    },
  ];
  const processSteps = [
    {
      step: '01',
      title: 'Nhận yêu cầu',
      description: 'Tiếp nhận thông tin qua các kênh liên hệ',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Tư vấn thiết kế',
      description: 'Hỗ trợ lên ý tưởng và thiết kế',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Báo giá',
      description: 'Cung cấp báo giá chi tiết',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Giao hàng',
      description: 'Giao sản phẩm đến tận tay khách hàng',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];
  const products = [
    { name: 'Áo thun', image: '👕', popular: true },
    { name: 'Áo Polo', image: '👔', popular: true },
    { name: 'Áo khoác', image: '🧥', popular: false },
    { name: 'Áo hoodie', image: '👗', popular: true },
    { name: 'Áo dài tay', image: '👘', popular: false },
    { name: 'Nón', image: '🧢', popular: true },
    { name: 'Túi', image: '🎒', popular: false },
    { name: 'Phụ kiện khác', image: '🎁', popular: false },
  ];
  const testimonials = [
    {
      name: 'Nguyễn Văn A',
      company: 'ABC Company',
      content:
        'Chất lượng sản phẩm rất tốt, giao hàng nhanh chóng. Sẽ tiếp tục sử dụng dịch vụ.',
      rating: 5,
    },
    {
      name: 'Trần Thị B',
      company: 'XYZ Corp',
      content:
        'Đội ngũ tư vấn nhiệt tình, thiết kế đẹp. Rất hài lòng với dịch vụ.',
      rating: 5,
    },
    {
      name: 'Lê Minh C',
      company: 'DEF Ltd',
      content:
        'Giá cả hợp lý, chất lượng đảm bảo. Đã đặt nhiều đơn hàng và luôn hài lòng.',
      rating: 5,
    },
  ];
  return (
    <Fragment>
      <div className="min-h-screen bg-background text-foreground">
        <section className="relative py-10 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Mô hình đặt sản xuất theo yêu cầu
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  ElysiaWearxPrint
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Dịch vụ in ấn theo yêu cầu của ElysiaWear, nơi bạn có
                thể tùy chỉnh sản phẩm theo ý thích, từ in logo công
                ty đến thiết kế cá nhân.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="##"
                  className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Bắt đầu thiết kế
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="##"
                  className="group inline-flex items-center gap-2 border border-border hover:border-primary/50 text-foreground hover:text-primary px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  Xem mẫu thiết kế
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-chart-3/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
        </section>
        <section className="py-10 px-6 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                Tại sao nên chọn ElysiaWearxPrint?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến cho bạn trải nghiệm in ấn
                tốt nhất với chất lượng và dịch vụ hàng đầu
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quy trình đặt hàng
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Quy trình đơn giản và minh bạch, giúp bạn dễ dàng tạo
                ra sản phẩm theo ý muốn
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2 z-0"></div>
                  )}
                  <div className="relative z-10 text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                    <div className="absolute -top-3 right-25 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 px-6 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
                Sản phẩm in ấn
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                ElysiaWearxPrint cung cấp dịch vụ in ấn trên nhiều
                loại sản phẩm chất lượng cao
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="relative group p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
                >
                  {product.popular && (
                    <div className="absolute -top-2 -right-2 bg-chart-2 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Phổ biến
                    </div>
                  )}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="##"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Xem tất cả sản phẩm
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Khách hàng nói gì về chúng tôi
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hàng nghìn khách hàng đã tin tưởng và hài lòng với
                dịch vụ của ElysiaWearxPrint
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div>
                    <p className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 px-6 bg-gradient-to-r from-primary/10 to-chart-2/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Bắt đầu dự án in ấn của bạn ngay hôm nay
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Liên hệ với chúng tôi để được tư vấn miễn phí và nhận
              báo giá chi tiết cho dự án của bạn
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Liên hệ ngay
              </Link>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Tư vấn 24/7
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Báo giá miễn phí
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
