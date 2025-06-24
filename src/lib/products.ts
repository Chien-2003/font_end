export interface ProductVariant {
  id: number;
  color: string;
  size: string;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
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
