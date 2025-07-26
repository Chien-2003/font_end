export interface CreateDiscountPayload {
  code: string;
  type: 'percentage' | 'fixed' | 'freeship';
  value: number | null;
  min_order_value: number;
  description: string;
  image_url: string | null;
  category_ids?: string[];
  subcategory_ids?: string[];
}

export async function createDiscount(payload: CreateDiscountPayload) {
  const res = await fetch('http://localhost:4000/discounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Tạo mã giảm giá thất bại');
  }

  return res.json();
}
