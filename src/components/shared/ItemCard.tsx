"use client";

import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  imageUrl: string;
}

export default function ProductCard({
  name,
  description,
  price,
  oldPrice,
  discountPercent,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3 mb-6 pro-loop">
      <div className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={imageUrl}
            alt={name}
          />
          {discountPercent && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {discountPercent}%
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              aria-label="Thêm vào giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553L16.5 4H5.129L5 3H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
