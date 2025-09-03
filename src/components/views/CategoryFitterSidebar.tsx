'use client';

import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import type { Category } from '@/services/categoryApi';
import { motion } from 'framer-motion';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiTag,
  FiTrendingUp,
} from 'react-icons/fi';

interface AppSidebarProps {
  category: Category;
}

export function AppSidebar({ category }: AppSidebarProps) {
  const subcategories = category.subcategories || [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentSubSlug = searchParams.get('sub');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = (value: string) => {
    const newSearchParams = new URLSearchParams(
      searchParams?.toString() ?? '',
    );

    if (value) newSearchParams.set('sub', value);
    else newSearchParams.delete('sub');

    newSearchParams.set('page', '1');

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  const getTotalProducts = () => {
    return subcategories.reduce(
      (total, sub) => total + (sub.product_count || 0),
      0,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Sidebar className="sticky lg:top-24 md:top-5 top-0 border-0 shadow-none overflow-hidden">
        <SidebarContent className="py-2">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <FiFilter className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Bộ lọc
                  </h3>
                  <p className="text-xs text-foreground/70 mt-0.5">
                    {getTotalProducts()} sản phẩm
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="w-4 h-4 text-gray-600" />
                </motion.div>
              </motion.button>
            </div>
          </div>

          <motion.div
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 mb-6 text-base font-semibold">
                <FiGrid className="w-4 h-4 text-primary" />
                Danh mục sản phẩm
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <RadioGroup
                  value={currentSubSlug ?? ''}
                  onValueChange={handleChange}
                  className="flex flex-col gap-1.5"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`group relative flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 cursor-pointer ${
                      !currentSubSlug
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-sm'
                        : 'border border-transparent'
                    }`}
                  >
                    <RadioGroupItem
                      value=""
                      id="all"
                      className={`w-5 h-5 border-2 transition-all duration-300 ${
                        !currentSubSlug
                          ? 'border-primary text-primary shadow-sm'
                          : 'hover:border-primary/50'
                      }`}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="all"
                        className={`cursor-pointer font-medium transition-colors duration-300 ${
                          !currentSubSlug
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <FiTrendingUp className="w-4 h-4" />
                            Tất cả sản phẩm
                          </span>
                          <span
                            className={`text-xs px-2 bg-primary py-1 rounded-full font-medium ${
                              !currentSubSlug
                                ? 'bg-primary/20 text-primary'
                                : 'text-foreground'
                            }`}
                          >
                            {getTotalProducts()}
                          </span>
                        </div>
                      </Label>
                    </div>
                    {!currentSubSlug && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-2 w-1.5 h-6 bg-gradient-to-b from-primary to-primary/60 rounded-full"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                  {subcategories.map((sub, index) => (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={{ x: 4 }}
                      className={`group relative flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                        currentSubSlug === sub.slug
                          ? 'bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-sm'
                          : 'border border-transparent'
                      }`}
                    >
                      <RadioGroupItem
                        value={sub.slug}
                        id={sub.slug}
                        className={`w-5 h-5 border-2 transition-all duration-300 ${
                          currentSubSlug === sub.slug
                            ? 'border-primary text-primary shadow-sm'
                            : 'hover:border-primary/50'
                        }`}
                      />
                      <div className="flex-1 justify-between flex items-center">
                        <Label
                          htmlFor={sub.slug}
                          className={`cursor-pointer font-medium transition-colors duration-300 ${
                            currentSubSlug === sub.slug
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <FiTag className="w-4 h-4" />
                              {sub.name}
                            </span>
                            {sub.product_count !== undefined && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                                  currentSubSlug === sub.slug
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                                }`}
                              >
                                {sub.product_count}
                              </span>
                            )}
                          </div>
                        </Label>
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-primary/20 text-primary">
                          5
                        </span>
                      </div>
                      {currentSubSlug === sub.slug && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-2 w-1.5 h-6 bg-gradient-to-b from-primary to-primary/60 rounded-full"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </RadioGroup>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-3 p-2">
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-sm cursor-pointer"
                  onClick={() => {
                    const newSearchParams = new URLSearchParams();
                    newSearchParams.set('page', '1');
                    router.push(
                      `${pathname}?${newSearchParams.toString()}`,
                      {
                        scroll: false,
                      },
                    );
                  }}
                >
                  Xóa bộ lọc
                </motion.button>
              </div>
            </div>
          </motion.div>
        </SidebarContent>
      </Sidebar>
    </motion.div>
  );
}
