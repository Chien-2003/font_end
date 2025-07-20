import { Product } from './productsApi';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug_category: string;
  description?: string;
  subcategories?: Subcategory[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  quantity: number;
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
export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:4000/categories', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Không thể lấy danh sách danh mục');
  return res.json();
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const res = await fetch(
    `http://localhost:4000/categories?slug_category=${slug}`,
    { cache: 'no-store' },
  );
  if (!res.ok) return null;
  const data: Category[] = await res.json();
  return data.length > 0 ? data[0] : null;
}

export async function getProductsByCategoryId(
  categoryId: string,
  page: number = 1,
  limit: number = 7,
): Promise<PaginatedProducts> {
  const res = await fetch(
    `http://localhost:4000/products?category_id=${categoryId}&page=${page}&limit=${limit}`,
    { cache: 'no-store' },
  );
  if (!res.ok)
    throw new Error('Không thể lấy sản phẩm theo danh mục');
  const json: PaginatedProducts = await res.json();
  return json;
}
