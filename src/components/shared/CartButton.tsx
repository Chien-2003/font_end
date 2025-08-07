'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { BsCart3 } from 'react-icons/bs';

export default function CartButton() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const controls = useAnimation();

  useEffect(() => {
    if (totalCount > 0) {
      controls.start({
        scale: [1, 1.2, 0.95, 1.05, 1],
        transition: { duration: 0.4 },
      });
    }
  }, [totalCount, controls]);

  return (
    <motion.div animate={controls}>
      <Button
        variant="ghost"
        className="relative p-2"
        aria-label="Giỏ hàng"
      >
        <BsCart3 className="text-orange-500" size={20} />
        {totalCount > 0 && (
          <Badge
            className="absolute top-1 right-1 w-5 h-5 translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] rounded-full bg-primary text-white"
            variant="default"
          >
            {totalCount}
          </Badge>
        )}
      </Button>
    </motion.div>
  );
}
