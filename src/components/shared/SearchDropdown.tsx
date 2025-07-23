'use client';

import { Fragment, useState } from 'react';
import ProductModal from './ModalSearch';

export default function SearchModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        onFocus={() => setIsOpen(true)}
        className="w-full max-w-md pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Fragment>
  );
}
