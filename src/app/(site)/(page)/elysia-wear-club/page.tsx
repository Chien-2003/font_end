'use client';

import {
  ArrowRight,
  Award,
  CheckCircle,
  Crown,
  Gift,
  Heart,
  Shield,
  Sparkles,
  Star,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Fragment, JSX, useEffect, useState } from 'react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Stat {
  number: string;
  label: string;
}

interface MembershipTier {
  name: string;
  price: string;
  features: string[];
  color: string;
  popular: boolean;
}

interface VisibilityState {
  [key: string]: boolean;
}

const benefits: Benefit[] = [
  {
    icon: Crown,
    title: 'Ưu đãi độc quyền',
    description:
      'Giảm giá tới 30% cho thành viên VIP, ưu tiên mua sắm các sản phẩm limited edition',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    icon: Gift,
    title: 'Quà tặng hấp dẫn',
    description:
      'Nhận voucher, freeship và quà tặng sinh nhật đặc biệt mỗi tháng',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: Truck,
    title: 'Miễn phí vận chuyển',
    description:
      'Free ship toàn quốc cho mọi đơn hàng, giao hàng nhanh trong 24h',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Bảo hành trọn đời',
    description:
      'Chính sách đổi trả linh hoạt, bảo hành chất lượng sản phẩm',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Trải nghiệm cao cấp',
    description:
      'Dịch vụ khách hàng 24/7, tư vấn style cá nhân từ chuyên gia',
    color: 'from-purple-400 to-violet-500',
  },
  {
    icon: Users,
    title: 'Cộng đồng thời trang',
    description:
      'Kết nối với hàng ngàn fashion lover, chia sẻ outfit và nhận feedback',
    color: 'from-indigo-400 to-blue-500',
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Minh Anh',
    role: 'Fashion Blogger',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face',
    content:
      'ElysiaWearClub đã thay đổi cách tôi mua sắm! Chất lượng tuyệt vời và dịch vụ hoàn hảo.',
    rating: 5,
  },
  {
    name: 'Hoàng Nam',
    role: 'Content Creator',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content:
      'Ưu đãi VIP thật sự đáng giá! Tôi đã tiết kiệm được rất nhiều từ khi tham gia.',
    rating: 5,
  },
  {
    name: 'Thu Hương',
    role: 'Startup Founder',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content:
      'Sản phẩm chất lượng cao, phù hợp với phong cách công sở. Rất recommended!',
    rating: 5,
  },
];

const stats: Stat[] = [
  { number: '50K+', label: 'Thành viên tích cực' },
  { number: '98%', label: 'Tỷ lệ hài lòng' },
  { number: '24/7', label: 'Hỗ trợ khách hàng' },
  { number: '1M+', label: 'Sản phẩm đã bán' },
];

const membershipTiers: MembershipTier[] = [
  {
    name: 'Silver',
    price: 'Miễn phí',
    features: [
      'Giảm giá 10%',
      'Free ship đơn >500K',
      'Tích điểm thưởng',
    ],
    color: 'from-gray-400 to-gray-600',
    popular: false,
  },
  {
    name: 'Gold',
    price: '299K/năm',
    features: [
      'Giảm giá 20%',
      'Free ship toàn bộ',
      'Ưu tiên customer care',
      'Quà sinh nhật',
    ],
    color: 'from-yellow-400 to-amber-500',
    popular: true,
  },
  {
    name: 'Platinum',
    price: '599K/năm',
    features: [
      'Giảm giá 30%',
      'Early access',
      'Personal stylist',
      'VIP events',
      'Premium support',
    ],
    color: 'from-purple-400 to-indigo-500',
    popular: false,
  },
];

export default function ElysiaWearClub(): JSX.Element {
  const [currentTestimonial, setCurrentTestimonial] =
    useState<number>(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(
        (prev) => (prev + 1) % testimonials.length,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll<HTMLElement>(
      '[id^="animate-"]',
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleTestimonialChange = (index: number): void => {
    setCurrentTestimonial(index);
  };

  return (
    <Fragment>
      <div className="mx-auto max-w-full w-full h-full overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-60" />
          <div className="relative w-full py-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
                ElysiaWearClub
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trải nghiệm thời trang đẳng cấp với ưu đãi độc quyền
                dành riêng cho bạn
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://n7media.coolmate.me/uploads/January2025/mceclip0_54.png"
                alt="ElysiaWearClub"
                width={1356}
                height={376}
                className="object-cover w-full h-auto rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16">
          <div
            id="animate-why-join"
            className={`transition-all duration-1000 ${
              isVisible['animate-why-join']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="mb-16 text-center font-bold text-4xl md:text-5xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Tại sao nên tham gia ElysiaWearClub?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 ${
                      isVisible['animate-why-join']
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${benefit.color}`}
                      />
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="text-white w-8 h-8" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900">
                        {benefit.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                        {benefit.description}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute inset-0">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="w-4 h-4 opacity-30" />
              </div>
            ))}
          </div>

          <div
            id="animate-stats"
            className={`relative px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 transition-all duration-1000 ${
              isVisible['animate-stats']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl md:text-6xl font-bold mb-2 rounded-full w-24 h-24 md:w-32 md:h-32 mx-auto flex items-center justify-center backdrop-blur-sm">
                    {stat.number}
                  </div>
                  <p className="text-lg md:text-xl font-medium opacity-90">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-50">
          <div
            id="animate-testimonials"
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              isVisible['animate-testimonials']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Khách hàng nói gì về chúng tôi?
            </h2>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-purple-100"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {Array.from(
                      {
                        length:
                          testimonials[currentTestimonial].rating,
                      },
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ),
                    )}
                  </div>
                </div>

                <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-6">
                  &ldquo;{testimonials[currentTestimonial].content}
                  &rdquo;
                </blockquote>

                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleTestimonialChange(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-purple-500 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      type="button"
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div
            id="animate-membership"
            className={`max-w-7xl mx-auto transition-all duration-1000 ${
              isVisible['animate-membership']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Chọn gói thành viên phù hợp
            </h2>
            <p className="text-center text-gray-600 mb-16 text-xl">
              Trải nghiệm những đặc quyền tuyệt vời dành riêng cho bạn
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border-2 ${
                    tier.popular
                      ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                        <Crown className="w-4 h-4 mr-2" />
                        Phổ biến nhất
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-6`}
                    >
                      <Award className="text-white w-10 h-10" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {tier.name}
                    </h3>
                    <p className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {tier.price}
                    </p>

                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-gray-600"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                        tier.popular
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600'
                      }`}
                    >
                      Tham gia ngay
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              >
                <Heart className="w-6 h-6 opacity-20" />
              </div>
            ))}
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sẵn sàng trở thành thành viên VIP?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Tham gia cùng hàng ngàn khách hàng đã tin tưởng
              ElysiaWearClub
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Crown className="w-6 h-6 mr-2" />
                Đăng ký miễn phí
              </button>
              <button
                type="button"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
