"use client";

import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  IconButton,
  Button,
  Paper,
  Checkbox,
  Dialog,
  IconButton as MuiIconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { deleteCartItem } from "@/lib/cartApi";
import { showError, showSuccess } from "@/lib/swal";

function formatVND(value: number) {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
export default function CartPage() {
  const { cartItems, refreshCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [openImage, setOpenImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isAllSelected = selectedItems.length === cartItems.length;

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(isAllSelected ? [] : cartItems.map((item) => item.id));
  };

  const removeItem = async (id: number) => {
    try {
      const res = await deleteCartItem(id);
      await refreshCart();
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
      showSuccess(res.message);
    } catch (err: any) {
      console.error("Lỗi khi xoá sản phẩm:", err);

      const message = err.response?.data?.message || err.message;

      showError(message);
    }
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => {
      const price = Number(item.variant?.product?.price || 0);
      return sum + price * item.quantity;
    }, 0);

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Giỏ hàng của bạn
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: "gray" }} />
          <Typography variant="h6" color="text.secondary" mt={2}>
            Giỏ hàng đang trống
          </Typography>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
              <Typography variant="body1">Chọn tất cả</Typography>
            </Box>
            {selectedItems.length > 0 && (
              <Button
                onClick={() => setSelectedItems([])}
                size="small"
                color="secondary"
              >
                Bỏ chọn tất cả
              </Button>
            )}
          </Box>

          <List>
            {cartItems.map((item) => {
              const product = item.variant?.product;
              if (!product) return null;

              return (
                <Box key={item.id}>
                  <ListItem alignItems="center" disableGutters sx={{ mb: 1 }}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                    />

                    <ListItemAvatar>
                      <div
                        className="w-full h-full mr-2 rounded overflow-hidden shrink-0 cursor-pointer"
                        onClick={() => {
                          setPreviewImage(product.image_url);
                          setOpenImage(true);
                        }}
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </ListItemAvatar>

                    <Box ml={2} flexGrow={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {product.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {item.quantity}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Size: {item.variant?.size}
                      </Typography>

                      <Box display="flex" alignItems="center" mt={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          Màu sắc
                        </Typography>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            bgcolor: item.variant?.color,
                            ml: 1,
                            border: "1px solid #ccc",
                          }}
                        />
                      </Box>

                      <Box display="flex" alignItems="center" mt={0.5}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mr={1}
                        >
                          Giá:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          fontWeight="bold"
                        >
                          {formatVND(Number(product.price))}
                        </Typography>
                      </Box>
                    </Box>

                    <IconButton
                      onClick={() => removeItem(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Tổng cộng:</Typography>
            <Typography variant="h6" color="primary">
              {formatVND(totalPrice)}
            </Typography>
          </Box>

          <Box textAlign="right" mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedItems.length === 0}
            >
              Thanh toán ({selectedItems.length} sản phẩm)
            </Button>
          </Box>
        </Paper>
      )}
      <Dialog
        open={openImage}
        onClose={() => setOpenImage(false)}
        fullScreen
        BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "none", m: 0 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <MuiIconButton
            onClick={() => setOpenImage(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "#fff",
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </MuiIconButton>
          {previewImage && (
            <Image
              src={previewImage}
              alt="Xem ảnh sản phẩm"
              width={1000}
              height={1000}
              className="object-contain w-full h-full"
            />
          )}
        </Box>
      </Dialog>
    </Container>
  );
}
