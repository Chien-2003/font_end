"use client";

import { Badge, IconButton } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useCart } from "@/contexts/CartContext";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function CartButton() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
      <IconButton aria-label="cart" sx={{ p: 1 }}>
        <Badge badgeContent={totalCount} color="primary">
          <ShoppingCartOutlined color="warning" />
        </Badge>
      </IconButton>
    </motion.div>
  );
}
