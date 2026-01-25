import type { ProductItem } from "../interface/productInterface";
import { apiRequest } from "./axios";

export interface ProductResponse {
    success: boolean;
    data: ProductItem[];
    message: string;
    timestamp: Date;
}

export interface ProductSingleResponse {
    success: boolean;
    data: ProductItem;
    message: string;
    timestamp: Date;
}

export async function getAllProducts(): Promise<ProductResponse> {
    return await apiRequest<ProductResponse>('get', `/products`);
}

export async function createProduct(product: Omit<ProductItem, 'id'>): Promise<ProductSingleResponse> {
    return await apiRequest<ProductSingleResponse>('post', `/products`, product);
}

export async function getProductById(id: number): Promise<ProductSingleResponse>{
    return await apiRequest<ProductSingleResponse>('get', `/products/${id}`);
}