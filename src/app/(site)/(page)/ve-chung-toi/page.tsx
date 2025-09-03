'use client';

import Breadcrumbs from '@/components/views/Breadcrumbs';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  FaAward,
  FaFacebook,
  FaGlobe,
  FaHeart,
  FaInstagram,
  FaLeaf,
  FaPalette,
  FaRecycle,
  FaTiktok,
  FaUsers,
  FaYoutube,
} from 'react-icons/fa';
const AnimatedCounter = ({
  target,
  suffix = '',
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};
const TeamMemberCard = ({
  member,
  index,
}: {
  member: any;
  index: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-80 w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-bold text-xl mb-1">
                {member.name}
              </h3>
              <p className="text-white/90 text-sm">{member.role}</p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 flex flex-col justify-center text-primary-foreground"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <blockquote className="text-center italic mb-4">
            "{member.quote}"
          </blockquote>
          <div className="flex justify-center gap-3">
            {member.social?.map((social: any, i: number) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const TimelineItem = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`flex items-center mb-10 ${isEven ? '' : 'flex-row-reverse'}`}
    >
      <div className="w-5/12">
        <div className="bg-card rounded-2xl p-6 shadow-xl border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-primary font-bold text-lg">
              {item.year}
            </span>
          </div>
          <h3 className="font-bold text-foreground mb-2">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {item.description}
          </p>
        </div>
      </div>
      <div className="w-2/12 flex justify-center">
        <div className="w-4 h-4 bg-primary rounded-full border-4 border-card shadow-lg relative">
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      <div className="w-5/12"></div>
    </motion.div>
  );
};
export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const teamMembers = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Creative Director & Founder',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face',
      quote:
        'Thời trang là ngôn ngữ không lời để thể hiện cá tính của bạn',
      social: [
        { icon: <FaInstagram />, href: '#' },
        { icon: <FaFacebook />, href: '#' },
      ],
    },
    {
      name: 'Trần Thị Lan',
      role: 'Lead Designer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
      quote:
        'Mỗi thiết kế là một câu chuyện, mỗi chi tiết là một cảm xúc',
      social: [
        { icon: <FaInstagram />, href: '#' },
        { icon: <FaPalette />, href: '#' },
      ],
    },
    {
      name: 'Lê Văn Đức',
      role: 'Sustainability Manager',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
      quote:
        'Thời trang bền vững không chỉ là xu hướng, mà là trách nhiệm',
      social: [
        { icon: <FaLeaf />, href: '#' },
        { icon: <FaGlobe />, href: '#' },
      ],
    },
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Khởi đầu hành trình',
      description:
        'Elysia Wear được thành lập với sứ mệnh mang đến thời trang bền vững và phong cách hiện đại.',
      icon: <FaHeart className="text-primary" />,
    },
    {
      year: '2020',
      title: 'Bộ sưu tập đầu tiên',
      description:
        "Ra mắt BST 'Urban Essence' với 100% chất liệu tái chế, tạo tiếng vang lớn trong cộng đồng thời trang.",
      icon: <FaPalette className="text-primary" />,
    },
    {
      year: '2021',
      title: 'Mở rộng thị trường',
      description:
        'Khai trương cửa hàng flagship đầu tiên tại Quận 1 và mở rộng ra các tỉnh thành khác.',
      icon: <FaGlobe className="text-primary" />,
    },
    {
      year: '2022',
      title: 'Giải thưởng danh giá',
      description:
        "Nhận giải 'Thương hiệu thời trang bền vững của năm' từ Hiệp hội Thời trang Việt Nam.",
      icon: <FaAward className="text-primary" />,
    },
    {
      year: '2023',
      title: 'Cộng đồng 100K+',
      description:
        'Đạt mốc 100,000+ khách hàng trung thành và ra mắt chương trình loyalty đầu tiên.',
      icon: <FaUsers className="text-primary" />,
    },
  ];

  const sustainabilityStats = [
    { number: 95, suffix: '%', label: 'Chất liệu tái chế' },
    { number: 50000, suffix: '+', label: 'Sản phẩm bán ra' },
    { number: 15, suffix: 'T', label: 'CO₂ đã tiết kiệm' },
    { number: 4.8, suffix: '/5', label: 'Đánh giá khách hàng' },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-gray text-foreground">
      <Fragment>
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y, opacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050"
              alt="Elysia Wear Studio"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent"
            >
              Nơi Mỗi Trang Phục
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent"
              >
                Kể Một Câu Chuyện
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed text-primary-foreground/90"
            >
              Chúng tôi tin rằng thời trang không chỉ là trang phức,
              mà là cách thể hiện cá tính và giá trị của bạn
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <button className="bg-primary-foreground text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl">
                Khám Phá Câu Chuyện
              </button>
            </motion.div>
          </div>
        </section>
        <div className="mx-auto max-w-full md:px-14 xl:px-15 2xl:px-16 px-4 sm:px-6 lg:px-15 w-full h-full">
          <div className="mt-6">
            <Breadcrumbs />
          </div>
          <section ref={storyRef} className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Từ một ý tưởng nhỏ về thời trang bền vững đến thương
                hiệu được yêu thích bởi hàng nghìn khách hàng
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-primary to-primary/30"></div>
              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </section>
          <section className="py-20 bg-gradient-to-r from-muted/50 to-muted/30 rounded-3xl my-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Đội Ngũ Sáng Tạo
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Những con người đam mê và tài năng đang tạo nên sự
                  khác biệt của Elysia Wear
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Cam Kết Bền Vững
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chúng tôi tin rằng thời trang đẹp không nên có cái giá
                của môi trường
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {sustainabilityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-card rounded-2xl p-6 shadow-xl border border-border">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      <AnimatedCounter
                        target={stat.number}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <FaRecycle className="text-4xl text-primary" />
                  ),
                  title: 'Chất Liệu Tái Chế',
                  description:
                    '95% sản phẩm được làm từ chất liệu tái chế và hữu cơ',
                },
                {
                  icon: <FaLeaf className="text-4xl text-primary" />,
                  title: 'Sản Xuất Xanh',
                  description:
                    'Quy trình sản xuất thân thiện môi trường, tiết kiệm nước và năng lượng',
                },
                {
                  icon: <FaHeart className="text-4xl text-primary" />,
                  title: 'Trách Nhiệm Xã Hội',
                  description:
                    'Hỗ trợ cộng đồng địa phương và tạo việc làm bền vững',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-8 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Không Gian Sáng Tạo
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Khám phá studio thiết kế nơi những ý tưởng trở thành
                hiện thực
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=400&fit=crop&crop=center',
                  alt: 'Studio Design Space',
                },
                {
                  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center',
                  alt: 'Creative Workshop',
                },
                {
                  src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center',
                  alt: 'Fashion Sketching',
                },
                {
                  src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=400&fit=crop&crop=center',
                  alt: 'Sustainable Materials',
                },
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </section>
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tham Gia Hành Trình Cùng Chúng Tôi
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Hãy trở thành một phần của cộng đồng Elysia Wear và
                cùng chúng tôi tạo nên sự thay đổi tích cực cho thời
                trang
              </p>

              <div className="flex justify-center gap-4 mb-8">
                {[
                  {
                    icon: <FaInstagram />,
                    href: '#',
                    label: 'Instagram',
                  },
                  {
                    icon: <FaFacebook />,
                    href: '#',
                    label: 'Facebook',
                  },
                  { icon: <FaTiktok />, href: '#', label: 'TikTok' },
                  {
                    icon: <FaYoutube />,
                    href: '#',
                    label: 'YouTube',
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-foreground text-primary px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
              >
                Khám Phá Bộ Sưu Tập
              </motion.button>
            </motion.div>
          </section>
        </div>
      </Fragment>
    </div>
  );
}
