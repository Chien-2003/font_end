import { Category } from "./categoryApi";

export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  image_hover_url?: string;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
  category: Category;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:4000/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image_url: string;
  image_hover_url?: string;
  category_id: number;
  variants: Omit<ProductVariant, "id">[];
}
export async function createProduct(data: CreateProductData): Promise<Product> {
  const res = await fetch("http://localhost:4000/products/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Tạo sản phẩm thất bại");
  }

  return res.json();
}
export async function updateProduct(id: number, data: CreateProductData): Promise<Product> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Cập nhật sản phẩm thất bại");
  }

  return res.json();
}
export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Xoá sản phẩm thất bại");
  }
}
