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
  category_type: string;
  subcategories?: Subcategory[];
  created_at?: string;
  updated_at?: string;
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
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) return null;
  const data: Category[] = await res.json();
  return data.length > 0 ? data[0] : null;
}
export async function updateCategory(
  id: string,
  data: Partial<Category>,
): Promise<Category> {
  const res = await fetch(`http://localhost:4000/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Cập nhật danh mục thất bại');
  return res.json();
}
