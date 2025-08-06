const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllSubcategories(): Promise<Subcategory[]> {
  const res = await fetch(`${BASE_URL}/subcategories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Không thể lấy danh sách danh mục con');
  }

  return res.json();
}
