import type { ProductItem } from "../interface/productInterface";
import { apiRequest } from "./axios";

export interface ProductResponse {
    success: boolean;
    data: ProductItem[];
    message: string;
    timestamp: Date;
}

export async function getAllProducts(): Promise<ProductResponse> {
    return await apiRequest<ProductResponse>('get', `/products`);
}