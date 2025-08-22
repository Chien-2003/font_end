import { apiFetch } from './apiClient';

export interface OrderItem {
  variant_id: string;
  product_id: string;
  product_name: string;
  image: string;
  price: string;
  color: string;
  size: string;
  quantity: number;
}

export interface OrderResponse {
  id: string;
}
export interface OrdersResponse {
  common: {
    status: string;
    order_address?: {
      province_code: string;
      district_code: string;
      ward_code: string;
      detail: string;
    };
    note?: string | null;
    payment_method?: string;
    payment_status?: string | null;
    shipping_info?: any;
    user: {
      id: string;
      user_name: string;
      email: string;
    };
  };
  orders: Order[];
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
export async function getOrders(): Promise<OrdersResponse> {
  return await apiFetch<OrdersResponse>('/orders', {
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
