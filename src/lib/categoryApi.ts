export interface Category {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:4000/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách danh mục");
  }

  return res.json();
}
