'use client';

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useDebounce } from '@/lib/useDebounce';
import { Product } from '@/services/productsApi';
import { searchProducts } from '@/services/searchApi';
import {
  Clock,
  Loader2,
  Package,
  Search,
  Tag,
  TrendingUp,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Fragment } from 'react';
import { EmptyPlaceholder } from './EmptyPlaceholder';

export const formatCurrency = (amount: number | undefined | null) => {
  if (!amount) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
const SUGGESTED_KEYWORDS = [
  'Quần tây nam',
  'Áo thun nữ',
  'Áo Sơ Mi',
  'Áo khoác',
  'Quần Jean',
  'Đầm',
  'Chân Váy',
  'Áo Polo',
];

export default function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchHistory, setSearchHistory] = React.useState<string[]>(
    [],
  );
  const debouncedQuery = useDebounce(query, 300);
  React.useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);
  const saveSearchHistory = (newHistory: string[]) => {
    try {
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(newHistory),
      );
      setSearchHistory(newHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };
  const addToHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const newHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ].slice(0, 10);
    saveSearchHistory(newHistory);
  };
  const removeFromHistory = (index: number) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    saveSearchHistory(newHistory);
  };
  const clearHistory = () => {
    saveSearchHistory([]);
  };
  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    addToHistory(searchTerm);
  };
  React.useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const res = await searchProducts(debouncedQuery);
      setResults(res);
      setLoading(false);
    };
    fetchData();
  }, [debouncedQuery]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addToHistory(query.trim());
    }
  };
  return (
    <Fragment>
      <div className="w-full max-w-md relative group">
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              onFocus={() => setOpen(true)}
              className="w-full pl-4 pr-16 py-3 rounded-full border border-border bg-background dark:bg-gray text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md hover:border-border/80 cursor-pointer"
            />
            <button
              type="submit"
              className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-4 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="border-b border-border p-1">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Nhập để tìm kiếm sản phẩm..."
            className="bg-transparent border-0 focus:ring-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <CommandList className="bg-background max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-muted [&::-webkit-scrollbar]:hidden scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
              <p className="text-sm">Đang tìm kiếm...</p>
            </div>
          ) : results.length === 0 && debouncedQuery.trim() ? (
            <div className="py-8">
              <EmptyPlaceholder description="Không tìm thấy sản phẩm phù hợp" />
            </div>
          ) : results.length === 0 ? (
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-medium text-foreground">
                    Từ khóa gợi ý
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_KEYWORDS.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleSearch(keyword)}
                      className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full border border-border/30 hover:border-border transition-all duration-200 hover:shadow-sm cursor-pointer"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">
                        Lịch sử tìm kiếm
                      </h3>
                    </div>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.slice(0, 5).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between group px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <button
                          onClick={() => handleSearch(item)}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {item}
                          </span>
                        </button>
                        <button
                          onClick={() => removeFromHistory(index)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all cursor-pointer"
                        >
                          <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {searchHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mb-4 text-muted-foreground/50" />
                  <p className="text-sm font-medium mb-1">
                    Tìm kiếm sản phẩm
                  </p>
                  <p className="text-xs text-center px-4">
                    Nhập tên sản phẩm để bắt đầu tìm kiếm
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-2">
              {results.length > 0 && (
                <div className="px-3 py-2 mb-2 bg-muted/30 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    Tìm thấy{' '}
                    <span className="font-semibold text-foreground">
                      {results.length}
                    </span>{' '}
                    sản phẩm
                  </p>
                </div>
              )}
              <div className="space-y-1">
                {results.map((product, index) => (
                  <div
                    key={product.id ?? `product-${index}`}
                    onClick={() => {
                      setOpen(false);
                      if (query.trim()) {
                        addToHistory(query.trim());
                      }
                    }}
                    className="block group rounded-lg p-3 border border-border/30 hover:border-border bg-card hover:bg-card/80 transition-all duration-200 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <Link
                        href={`/${product.category.slug_category}/${product.subcategory?.slug ?? ''}/${product.id}`}
                        className="relative w-25 h-25 rounded-lg overflow-hidden shrink-0 bg-muted/20"
                      >
                        <Image
                          src={
                            Array.isArray(product.image_url)
                              ? product.image_url[0]
                              : product.image_url
                          }
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="100px"
                        />
                        {product.image_hover_url && (
                          <Image
                            src={
                              Array.isArray(product.image_hover_url)
                                ? product.image_hover_url[0]
                                : product.image_hover_url
                            }
                            alt={product.name}
                            fill
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            sizes="100px"
                          />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/${product.category.slug_category}/${product.subcategory?.slug ?? ''}/${product.id}`}
                        >
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Tag className="w-3 h-3" />
                            <Link
                              href={`/${product.category.slug_category}/${product.subcategory?.slug}`}
                            >
                              <span className="hover:text-primary transition-colors">
                                {product.subcategory?.name}
                              </span>
                            </Link>
                          </div>
                          <span className="text-muted-foreground">
                            •
                          </span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Package className="w-3 h-3" />
                            <Link
                              href={`/${product.category.slug_category}`}
                            >
                              <span className="hover:text-primary transition-colors">
                                {product.category.name}
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {product.discounted_price && (
                            <span className="text-sm line-through text-muted-foreground">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                          {product.discount_percentage && (
                            <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full font-medium">
                              -{product.discount_percentage}%
                            </span>
                          )}
                          <span className="font-semibold text-primary">
                            {formatCurrency(
                              product.discounted_price ??
                                product.price,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
}
