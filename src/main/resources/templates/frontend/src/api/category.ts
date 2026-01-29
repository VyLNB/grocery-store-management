import type { CategoryItem } from "../interface/productInterface";
import { apiRequest } from "./axios";

export interface CategoryResponse {
    success: boolean;
    data: CategoryItem[];
    message: string;
    timestamp: Date;
}

export interface CategorySingleResponse {
    success: boolean;
    data: CategoryItem; 
    message: string;
    timestamp: Date;
}

export async function getAllCategories(): Promise<CategoryResponse> {
    return await apiRequest<CategoryResponse>('get', `/category`);
}

/**
 * Sử dụng Omit<CategoryItem, 'id'> để loại bỏ trường id khỏi dữ liệu gửi đi
 */
export async function createCategory(category: Omit<CategoryItem, 'id'>): Promise<CategorySingleResponse> {
    return await apiRequest<CategorySingleResponse>('post', `/category`, category);
}

export async function getCategoryById(id: number): Promise<CategorySingleResponse> {
    return await apiRequest<CategorySingleResponse>('get', `/category/${id}`);
}

export async function updateCategory(id: number, category: Omit<CategoryItem, 'id'>): Promise<CategorySingleResponse> {
    return await apiRequest<CategorySingleResponse>('put', `/category/${id}`, category);
}

export async function deleteCategory(id: number): Promise<any> {
    return await apiRequest('delete', `/category/${id}`);
}