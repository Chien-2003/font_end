import { apiFetch } from './apiClient';

export interface Variant {
  id: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  category_type: string;
  slug_category: string;
  created_at: string;
  updated_at: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  created_at: string;
  updated_at: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  image_url: string[];
  image_hover_url: string;
  created_at: string;
  updated_at: string;
  category: Category;
  subcategory: SubCategory;
  variants: Variant[];
}

export interface FavoritesResponse {
  message: string;
  data: FavoriteItem[];
  count: number;
}
export async function getFavorites() {
  return apiFetch<FavoritesResponse>('/api/favorites');
}
export async function removeFavorite(
  id: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/api/favorites/${id}`, {
    method: 'DELETE',
  });
}

export async function addFavorite(
  productId: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/api/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
}
