import { apiFetch } from './apiClient';

export interface OrderResponse {
  id: string;
}

export async function createOrder(data: {
  items: {
    variant_id: string;
    product_id: string;
    product_name: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  address?: string;
  note?: string;
  payment_method?: string;
  payment_status?: string;
  shipping_info?: any;
}): Promise<OrderResponse> {
  return await apiFetch<OrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
