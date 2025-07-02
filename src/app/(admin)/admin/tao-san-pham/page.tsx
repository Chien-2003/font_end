"use client";

import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { createProduct, CreateProductData } from "@/lib/products";
import { Category, getAllCategories } from "@/lib/categoryApi";
import { showError, showSuccess } from "@/lib/swal";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  image_url: string;
  image_hover_url: string;
  category_id: string;
}

interface Variant {
  color: string;
  size: string;
  quantity: number;
}

export default function CreateProductPage() {
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    image_url: "",
    image_hover_url: "",
    category_id: "",
  });

  const [variants, setVariants] = useState<Variant[]>([
    { color: "", size: "", quantity: 0 },
  ]);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Lỗi lấy danh mục:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? { ...v, [field]: field === "quantity" ? Number(value) : value }
          : v
      )
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { color: "", size: "", quantity: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload: CreateProductData = {
      ...product,
      price: parseFloat(product.price),
      category_id: Number(product.category_id),
      variants,
    };
    if (!product.name || !product.price || !product.category_id) {
      showError("Vui lòng điền đầy đủ tên, giá và danh mục.");
      return;
    }
    try {
      await createProduct(payload);
      showSuccess("Tạo sản phẩm thành công!");
      setProduct({
        name: "",
        description: "",
        price: "",
        image_url: "",
        image_hover_url: "",
        category_id: "",
      });
      setVariants([{ color: "", size: "", quantity: 0 }]);
    } catch (error) {
      showError("Tạo sản phẩm thất bại!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Tạo sản phẩm mới
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên sản phẩm"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Mô tả"
            name="description"
            multiline
            rows={3}
            value={product.description}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Giá"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            select
            label="Danh mục"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            fullWidth
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Ảnh chính"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Ảnh hover"
            name="image_hover_url"
            value={product.image_hover_url}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Biến thể sản phẩm
          </Typography>

          {variants.map((variant, index) => (
            <Grid
              container
              spacing={1}
              key={index}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Grid item xs={4}>
                <TextField
                  label="Màu"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Kích cỡ"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Số lượng"
                  type="number"
                  value={variant.quantity}
                  onChange={(e) =>
                    handleVariantChange(index, "quantity", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="error"
                  onClick={() => removeVariant(index)}
                  disabled={variants.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={addVariant}
            sx={{ mt: 1 }}
            size="small"
          >
            Thêm biến thể
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo sản phẩm
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
