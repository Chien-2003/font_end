import { PaginatedResponse, ProductVariant } from '@/types/products';
import { Category } from './categoryApi';
import { Subcategory } from './subcategoryApi';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  discount_percentage?: number;
  image_url: string[];
  image_hover_url?: string;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
  category: Category;
  subcategory?: Subcategory;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  image_url: string[];
  image_hover_url?: string;
  category_id: string;
  subcategory_id?: string;
  variants: Omit<ProductVariant, 'id'>[];
}

export async function getProducts(params?: {
  category_id?: string;
  subcategory_slug?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams();

  if (params?.category_id)
    query.set('category_id', params.category_id);
  if (params?.subcategory_slug)
    query.set('subcategory_slug', params.subcategory_slug);
  if (params?.sort) query.set('sort', params.sort);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const res = await fetch(
    `http://localhost:4000/products?${query.toString()}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) throw new Error('Không thể lấy sản phẩm');

  return res.json();
}

export async function createProduct(
  data: CreateProductData,
): Promise<Product> {
  const res = await fetch('http://localhost:4000/products/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Tạo sản phẩm thất bại');

  return res.json();
}

export async function updateProduct(
  id: string,
  data: CreateProductData,
): Promise<Product> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Cập nhật sản phẩm thất bại');

  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Xoá sản phẩm thất bại');
}

export async function getProductDetail(
  slug: string,
): Promise<Product> {
  const id = slug.replace('ew-', '');
  const res = await fetch(`http://localhost:4000/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Không tìm thấy sản phẩm');

  return res.json();
}
