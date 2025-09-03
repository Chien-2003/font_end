'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { alertError, alertSuccess } from '@/lib/alerts';
import type { FavoriteItem } from '@/services/favoritesApi';
import {
  getFavorites,
  removeFavorite,
} from '@/services/favoritesApi';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Filter,
  Grid,
  Heart,
  List,
  Search,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    FavoriteItem[]
  >([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>(
    'date',
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Tất cả');
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>('Tất cả');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Tất cả',
    ...Array.from(
      new Set(favorites.map((p) => p.category?.name || '')),
    ).filter(Boolean),
  ];
  const subCategories = [
    'Tất cả',
    ...Array.from(
      new Set(
        favorites
          .filter(
            (p) =>
              selectedCategory === 'Tất cả' ||
              p.category?.name === selectedCategory,
          )
          .map((p) => p.subcategory?.name || ''),
      ),
    ).filter(Boolean),
  ];

  useEffect(() => {
    setSelectedSubCategory('Tất cả');
  }, [selectedCategory]);

  useEffect(() => {
    setIsLoading(true);
    getFavorites()
      .then((res) => {
        setFavorites(res.data);
        setFilteredProducts(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = favorites.filter((product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (product.category?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ??
            false);
        const matchesCategory =
          selectedCategory === 'Tất cả' ||
          product.category?.name === selectedCategory;
        const matchesSubCategory =
          selectedSubCategory === 'Tất cả' ||
          product.subcategory?.name === selectedSubCategory;
        return matchesSearch && matchesCategory && matchesSubCategory;
      });
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return Number(a.price) - Number(b.price);
          case 'date':
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          default:
            return 0;
        }
      });
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    favorites,
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    sortBy,
  ]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(Number(price));
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const res = await removeFavorite(productId);
      alertSuccess(
        res.message || 'Đã xóa sản phẩm khỏi danh sách yêu thích!',
      );
      setFavorites((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      alertError('Xóa sản phẩm yêu thích thất bại!');
    }
  };

  const addToCart = (product: FavoriteItem) => {
    alertSuccess(`Đã thêm ${product.name} vào giỏ hàng!`);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const getDiscountPercent = (price: string, discounted: string) => {
    const p = Number(price);
    const d = Number(discounted);
    if (!p || !d || d >= p) return 0;
    return Math.round(((p - d) / p) * 100);
  };

  const ProductCard = ({ product }: { product: FavoriteItem }) => {
    const discount = getDiscountPercent(
      product.price,
      product.discounted_price,
    );
    return (
      <motion.div
        variants={itemVariants}
        whileHover="hover"
        className="bg-card border border-border rounded-none overflow-hidden shadow group cursor-pointer"
      >
        <motion.div
          variants={cardHoverVariants}
          className="relative overflow-hidden"
        >
          <motion.img
            src={product.image_url[0]}
            alt={product.name}
            className="w-full h-85 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {discount > 0 && (
            <motion.span
              className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              }}
            >
              -{discount}%
            </motion.span>
          )}
          <motion.button
            onClick={() => removeFromFavorites(product.id)}
            className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{
              opacity: 1,
              scale: 1.1,
              rotate: 360,
              backgroundColor: 'rgb(239 68 68)',
              color: 'white',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Trash2 size={16} />
          </motion.button>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <div className="p-4 space-y-3">
          <div>
            <motion.h3
              className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {product.name}
            </motion.h3>
            <p className="text-sm text-muted-foreground">
              {product.category?.name} • {product.subcategory?.name}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-lg font-bold text-primary"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {formatPrice(
                  product.discounted_price &&
                    Number(product.discounted_price) <
                      Number(product.price)
                    ? product.discounted_price
                    : product.price,
                )}
              </motion.span>
              {product.discounted_price &&
                Number(product.discounted_price) <
                  Number(product.price) && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={() => removeFromFavorites(product.id)}
              className="p-2 rounded-md transition-colors"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                backgroundColor: 'rgb(239 68 68)',
                color: 'white',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={16} />
            </motion.button>
            <motion.button
              onClick={() => addToCart(product)}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.div
                whileHover={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <ShoppingCart size={16} />
              </motion.div>
              Thêm vào giỏ
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };
  const ProductListItem = ({
    product,
  }: {
    product: FavoriteItem;
  }) => {
    const discount = getDiscountPercent(
      product.price,
      product.discounted_price,
    );
    return (
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-lg p-4 flex gap-4 group"
        whileHover={{
          scale: 1.02,
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="relative overflow-hidden rounded-md">
          <motion.img
            src={product.image_url[0]}
            alt={product.name}
            className="w-24 h-24 object-cover"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.5 }}
          />
          {discount > 0 && (
            <motion.span
              className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded text-xs font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              -{discount}%
            </motion.span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <motion.h3
              className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {product.name}
            </motion.h3>
            <p className="text-sm text-muted-foreground">
              {product.category?.name} • {product.subcategory?.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-lg font-bold text-primary"
                whileHover={{ scale: 1.1, x: 5 }}
              >
                {formatPrice(
                  product.discounted_price &&
                    Number(product.discounted_price) <
                      Number(product.price)
                    ? product.discounted_price
                    : product.price,
                )}
              </motion.span>
              {product.discounted_price &&
                Number(product.discounted_price) <
                  Number(product.price) && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => removeFromFavorites(product.id)}
                className="p-2 rounded-md transition-colors"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  backgroundColor: 'rgb(239 68 68)',
                  color: 'white',
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={16} />
              </motion.button>
              <motion.button
                onClick={() => addToCart(product)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ShoppingCart size={16} />
                </motion.div>
                Thêm vào giỏ
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-full">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              }}
            >
              <Heart className="text-primary" size={32} />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Sản phẩm yêu thích
            </motion.h1>
          </div>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Bạn có{' '}
            <motion.span
              className="font-semibold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {favorites.length}
            </motion.span>{' '}
            sản phẩm trong danh sách yêu thích
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 mb-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{
            backgroundColor: 'rgba(var(--card), 1)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md group">
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                whileHover={{
                  scale: 1.2,
                }}
              >
                <Search size={18} className="text-muted-foreground" />
              </motion.div>
              <motion.input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground transition-all duration-300"
                whileFocus={{
                  scale: 1.02,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
                whileHover={{
                  scale: 1.1,
                  rotate: viewMode === 'grid' ? 0 : 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
                whileHover={{
                  scale: 1.1,
                  rotate: viewMode === 'list' ? 0 : 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
              >
                <Filter size={16} className="text-muted-foreground" />
              </motion.div>
              <span className="text-sm font-medium">Lọc:</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Select
                onValueChange={setSelectedCategory}
                value={selectedCategory}
              >
                <SelectTrigger className="w-[180px] px-3 py-2 bg-input text-foreground">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Select
                onValueChange={setSelectedSubCategory}
                value={selectedSubCategory}
              >
                <SelectTrigger className="w-[180px] px-3 py-2 bg-input text-foreground">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as any)}
              >
                <SelectTrigger className="w-[185px] px-3 py-2 bg-input text-foreground">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Ngày thêm</SelectItem>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                  <SelectItem value="price">
                    Giá thấp đến cao
                  </SelectItem>
                  <SelectItem value="rating">
                    Đánh giá cao nhất
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="flex justify-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="rounded-full h-12 w-12 border-b-2 border-primary"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: 'linear',
                }}
              />
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
              >
                <Heart
                  size={64}
                  className="text-muted-foreground mx-auto mb-4"
                />
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {searchQuery || selectedCategory !== 'Tất cả'
                  ? 'Không tìm thấy sản phẩm nào'
                  : 'Chưa có sản phẩm yêu thích'}
              </motion.h3>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {searchQuery || selectedCategory !== 'Tất cả'
                  ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                  : 'Hãy thêm những sản phẩm bạn thích vào danh sách này'}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${viewMode}-${searchQuery}-${selectedCategory}-${selectedSubCategory}-${sortBy}`}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <ProductListItem product={product} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 && (
          <motion.div
            className="mt-8 bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              backgroundImage:
                'linear-gradient(to right, rgba(var(--muted), 0.4), rgba(var(--muted), 0.6))',
            }}
          >
            <p className="text-muted-foreground">
              Hiển thị{' '}
              <motion.span
                className="font-semibold text-primary"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {filteredProducts.length}
              </motion.span>{' '}
              trong tổng số{' '}
              <span className="font-semibold text-primary">
                {favorites.length}
              </span>{' '}
              sản phẩm yêu thích
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
