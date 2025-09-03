'use client';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/views/Breadcrumbs';
import {
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Share2,
  Star,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'Xu hướng thời trang Thu Đông 2024',
    excerpt:
      'Khám phá những xu hướng thời trang hot nhất mùa Thu Đông với tông màu earth tone và chất liệu len mềm mại...',
    author: 'Minh Anh',
    date: '2 giờ trước',
    readTime: '5 phút',
    category: 'Xu hướng',
    image:
      'https://images.unsplash.com/photo-1601260320216-08a6c5379426?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 245,
    views: 3200,
    featured: true,
  },
  {
    id: 2,
    title: 'Cách phối đồ công sở thanh lịch và chuyên nghiệp',
    excerpt:
      'Hướng dẫn chi tiết cách mix-match trang phục công sở để luôn tự tin và nổi bật tại nơi làm việc...',
    author: 'Thu Hà',
    date: '1 ngày trước',
    readTime: '8 phút',
    category: 'Công sở',
    image:
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=250&fit=crop',
    likes: 167,
    views: 2890,
  },
  {
    id: 3,
    title: 'Street Style: Thời trang đường phố cá tính',
    excerpt:
      'Tạo nên phong cách riêng với những outfit street style độc đáo và trendy nhất hiện nay...',
    author: 'Khánh Ly',
    date: '3 ngày trước',
    readTime: '6 phút',
    category: 'Street Style',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=250&fit=crop',
    likes: 189,
    views: 1567,
  },
  {
    id: 4,
    title: 'Chọn váy cưới phù hợp với từng dáng người',
    excerpt:
      'Bí quyết chọn váy cưới hoàn hảo để tôn lên vẻ đẹp tự nhiên và phong cách của cô dâu...',
    author: 'Hương Giang',
    date: '5 ngày trước',
    readTime: '12 phút',
    category: 'Cưới hỏi',
    image:
      'https://images.unsplash.com/photo-1651935655362-05627ba0116f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 323,
    views: 4340,
  },
  {
    id: 5,
    title: 'Phụ kiện thời trang: Điểm nhấn hoàn hảo',
    excerpt:
      'Cách sử dụng phụ kiện một cách khéo léo để biến trang phục đơn giản thành outfit ấn tượng...',
    author: 'Lan Phương',
    date: '1 tuần trước',
    readTime: '7 phút',
    category: 'Phụ kiện',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop',
    likes: 78,
    views: 1456,
  },
  {
    id: 6,
    title: 'Thời trang bền vững: Xu hướng tương lai',
    excerpt:
      'Tìm hiểu về phong trào sustainable fashion và cách xây dựng tủ đồ thân thiện với môi trường...',
    author: 'Mai Anh',
    date: '2 tuần trước',
    readTime: '10 phút',
    category: 'Bền vững',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    likes: 92,
    views: 1890,
  },
];

const categories = [
  'Tất cả',
  'Xu hướng',
  'Công sở',
  'Street Style',
  'Cưới hỏi',
  'Phụ kiện',
  'Bền vững',
];

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleLike = (postId: any) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };
  const filteredPosts = blogPosts.filter(
    (post) =>
      selectedCategory === 'Tất cả' ||
      post.category === selectedCategory,
  );
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, hsl(221, 83%, 53%) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(280, 100%, 70%) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative text-center flex flex-col items-center pt-3">
          <div className="mb-3 flex justify-center items-center mx-auto">
            <Breadcrumbs />
          </div>
          <div
            className={`transform py-12 transition-all duration-1000 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, hsl(221, 83%, 53%), hsl(280, 100%, 70%), hsl(330, 100%, 70%))',
                }}
              >
                Khám phá thế giới
                <br />
                <span className="relative inline-block">
                  thời trang
                  <div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse opacity-60"
                    style={{ animationDelay: '1s' }}
                  />
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Chia sẻ xu hướng, bí quyết phối đồ và những cảm hứng
              thời trang mới nhất từ cộng đồng fashionista Việt Nam
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 hover:bg-pink-700">
                <Zap className="w-5 h-5" />
                Khám phá ngay
              </button>
              <button className="px-8 py-4 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-400 dark:hover:text-white rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Xu hướng hot
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-pink-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-12 h-12 bg-purple-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-32 right-20 w-8 h-8 bg-rose-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        />
      </section>
      <section className="py-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-pink-600 text-white shadow-lg dark:bg-pink-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
              style={{
                transform: isVisible
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 transform ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              {post.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                    <Star className="w-3 h-3" />
                    Nổi bật
                  </div>
                </div>
              )}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray/70 text-gray dark:text-white backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-3 h-3" />
                  {post.views}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold line-clamp-2 text-gray dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="font-medium">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 text-sm transition-all duration-300 hover:scale-110 ${
                        likedPosts.has(post.id)
                          ? 'text-red-500'
                          : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`}
                      />
                      <span className="font-medium">
                        {post.likes +
                          (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </button>

                    <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-110">
                      <Share2 className="w-4 h-4" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>

                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {post.date}
                  </span>
                </div>
                <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:animate-pulse">
                  Đọc tiếp
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2 text-gray dark:text-white">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thử chọn danh mục khác để xem thêm bài viết
            </p>
          </div>
        )}
      </section>
      <section className="py-12 bg-gray-50 dark:bg-gray/50 rounded-2xl border border-gray-200 dark:border-gray/70">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray dark:text-white">
            Thống kê Fashion Blog
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Bài viết', value: '200+', icon: '👗' },
              { label: 'Lượt đọc', value: '120K+', icon: '👀' },
              { label: 'Fashionista', value: '2.5K+', icon: '💃' },
              { label: 'Thương hiệu', value: '50+', icon: '✨' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-500 hover:scale-110 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray dark:text-white">
            Đăng ký nhận tin
          </h2>
          <p className="text-gray/60 dark:text-gray/30 mb-8">
            Nhận thông báo về những bài viết mới nhất và xu hướng công
            nghệ hot nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 rounded-full border border-border bg-white dark:bg-gray/80 text-gray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue transition-all duration-300"
            />
            <Button
              size="xxl"
              className="px-6 py-3 bg-blue hover:bg-blue/90 dark:bg-blue dark:hover:bg-blue/80 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
