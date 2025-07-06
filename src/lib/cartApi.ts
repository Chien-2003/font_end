export interface CartItem {
  id: number;
  variant_id: number;
  quantity: number;
  variant?: {
    id: number;
    color: string;
    size: string;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: string;
      image_url: string;
    };
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function addToCart(variant_id: number, quantity: number = 1) {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ variant_id, quantity }),
  });

  if (!res.ok) {
    throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
  }

  return res.json();
}

export async function getUserCart(): Promise<CartItem[]> {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Không thể lấy giỏ hàng");
  }

  return res.json();
}
export async function deleteCartItem(id: number) {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Xoá sản phẩm khỏi giỏ hàng thất bại");
  }
  return res.json();
}
