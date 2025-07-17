import { Category } from './categoryApi';
import { Subcategory } from './subcategoryApi';

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
  price: number;
  discounted_price?: number;
  discount_percentage?: number;
  image_url: string;
  image_hover_url?: string;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
  category: Category;
  subcategory?: Subcategory;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  data: Product[];
  pagination: Pagination;
}

export async function getAllProducts(params?: {
  category_id?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();

  if (params?.category_id)
    query.append('category_id', params.category_id.toString());
  if (params?.sort) query.append('sort', params.sort);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const res = await fetch(
    `http://localhost:4000/products?${query.toString()}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const json: PaginatedProducts = await res.json();
  return json;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  image_url: string;
  image_hover_url?: string;
  category_id: number;
  subcategory_id?: number;
  variants: Omit<ProductVariant, 'id'>[];
}

export async function createProduct(
  data: CreateProductData,
): Promise<Product> {
  const res = await fetch('http://localhost:4000/products/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Tạo sản phẩm thất bại');
  }

  return res.json();
}

export async function updateProduct(
  id: number,
  data: CreateProductData,
): Promise<Product> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Cập nhật sản phẩm thất bại');
  }

  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Xoá sản phẩm thất bại');
  }
}
