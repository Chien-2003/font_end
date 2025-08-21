'use client';

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useDebounce } from '@/lib/useDebounce';
import { Product } from '@/services/productsApi';
import { searchProducts } from '@/services/searchApi';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Fragment } from 'react';
import { EmptyPlaceholder } from './EmptyPlaceholder';

export default function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 300);

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

  return (
    <Fragment>
      <div className="w-full max-w-md relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          onFocus={() => setOpen(true)}
          className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none transition-all dark:bg-gray-900 dark:text-white dark:border-gray-700 shadow-2xl"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary rounded-full items-center justify-center px-4 h-full cursor-pointer text-foreground hover:text-foreground/90"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Nhập để tìm kiếm sản phẩm..."
          className="bg-background"
        />
        <CommandList className="px-4 bg-background [&::-webkit-scrollbar]:hidden scrollbar-hide">
          {loading ? (
            <div className="text-center text-sm py-4">
              Đang tải...
            </div>
          ) : results.length === 0 ? (
            <EmptyPlaceholder description="Không tìm thấy sản phẩm" />
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((product, index) => (
                <li
                  key={product.id ?? `product-${index}`}
                  className="flex items-center gap-2 py-2"
                >
                  <Link
                    href={`/${product.category.slug_category}/${product.subcategory?.slug ?? ''}/${product.id}`}
                    className="hover:text-primary hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    <div className="relative w-25 h-25">
                      <Image
                        src={
                          Array.isArray(product.image_url)
                            ? product.image_url[0]
                            : product.image_url
                        }
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
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
                          className="absolute inset-0 object-cover opacity-0 hover:opacity-100 transition-opacity rounded-md"
                          sizes="100px"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="flex-1">
                    <Link
                      href={`/${product.category.slug_category}/${product.subcategory?.slug ?? ''}/${product.id}`}
                      className="hover:text-primary hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      <p className="font-medium">{product.name}</p>
                    </Link>
                    <p className="flex flex-row gap-2 items-center">
                      <Link
                        href={`/${product.category.slug_category}/${product.subcategory?.slug}`}
                        className="text-primary"
                      >
                        {product.subcategory?.name}
                      </Link>{' '}
                      thuộc{' '}
                      <Link
                        href={`/${product.category.slug_category}`}
                        className="text-primary"
                      >
                        {product.category.name}
                      </Link>
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      {product.discounted_price && (
                        <span className="line-through text-muted-foreground">
                          {product.price}₫
                        </span>
                      )}
                      {product.discount_percentage && (
                        <span className="text-red-500">
                          -{product.discount_percentage}%
                        </span>
                      )}
                      <span className="text-primary font-semibold">
                        {product.discounted_price ?? product.price}₫
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
}
