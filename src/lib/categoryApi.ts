export interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug_category: string;
  description?: string;
  subcategories?: Subcategory[];
  created_at?: string;
  updated_at?: string;
}

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
  image_url: string;
  image_hover_url?: string;
  created_at?: string;
  updated_at?: string;
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
export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:4000/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Không thể lấy danh sách danh mục");
  return res.json();
}
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const res = await fetch(
    `http://localhost:4000/categories?slug_category=${slug}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data: Category[] = await res.json();
  return data.length > 0 ? data[0] : null;
}
export async function getProductsByCategoryId(
  categoryId: number,
  page: number = 1,
  limit: number = 7,
): Promise<PaginatedProducts> {
  const res = await fetch(
    `http://localhost:4000/products?category_id=${categoryId}&page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Không thể lấy sản phẩm theo danh mục");
  const json: PaginatedProducts = await res.json();
  return json;
}
