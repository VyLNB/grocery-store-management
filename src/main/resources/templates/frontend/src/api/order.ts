import { apiRequest } from "./axios";

export interface OrderItemPayload {
  productId: number;
  quantity: number;
}

export interface CheckoutPayload {
  paymentMethod: string;
  items: OrderItemPayload[];
}

export async function createCheckout(payload: CheckoutPayload): Promise<any> {
  return await apiRequest("post", "/orders/checkout", payload);
}