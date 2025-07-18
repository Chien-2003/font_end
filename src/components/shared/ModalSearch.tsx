'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/productsApi';
import { useDebounce } from '@/lib/useDebounce';
import ProductCard from './ItemCard';
import { MdOutlineClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  isOpen,
  onClose,
}: ModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(
      `http://localhost:4000/search?q=${encodeURIComponent(debouncedQuery)}`,
    )
      .then((res) => res.json())
      .then((data) => setResults(data.hits || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-900/90 z-50"
      />
      <div className="fixed inset-0 z-50 bg-gray/20 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            autoFocus
            type="text"
            placeholder="Nhập để tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-xl px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={onClose}
            className="ml-4 text-red-500 cursor-pointer w-5 h-5"
          >
            <MdOutlineClose />
          </button>
        </div>

        {loading ? (
          <div className="text-center text-sm">Đang tải...</div>
        ) : results.length === 0 ? (
          <div className="text-center text-sm text-gray-500">
            Không tìm thấy sản phẩm
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((product, index) => (
              <ProductCard
                key={product.id ?? `product-${index}`}
                index={index}
                name={product.name}
                description={product.description}
                price={product.discounted_price ?? product.price}
                oldPrice={
                  product.discounted_price ? product.price : undefined
                }
                discountPercent={product.discount_percentage}
                image_url={product.image_url}
                image_hover_url={product.image_hover_url}
                variants={product.variants ?? []}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
