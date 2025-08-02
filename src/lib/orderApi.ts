import { apiFetch } from './apiClient';

export interface OrderItem {
  variant_id: string;
  product_id: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
}

export interface OrderResponse {
  id: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  order_address?: string;
  note?: string;
  payment_method?: string;
  payment_status?: string;
  shipping_info?: any;
}

export async function createOrder(data: {
  items: OrderItem[];
}): Promise<OrderResponse> {
  return await apiFetch<OrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getOrders(): Promise<Order[]> {
  return await apiFetch<Order[]>('/orders', {
    method: 'GET',
  });
}

export async function getOrderById(id: string): Promise<Order> {
  return await apiFetch<Order>(`/orders/${id}`, {
    method: 'GET',
  });
}

export async function updateOrderStatus(
  id: string,
  status: string,
): Promise<Order> {
  return await apiFetch<Order>(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function updateOrder(
  id: string,
  data: Partial<{
    items: OrderItem[];
    order_address?: string;
    note?: string;
    payment_method?: string;
    payment_status?: string;
    shipping_info?: any;
  }>,
): Promise<Order> {
  return await apiFetch<Order>(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  return await apiFetch<void>(`/orders/${id}`, {
    method: 'DELETE',
  });
}
