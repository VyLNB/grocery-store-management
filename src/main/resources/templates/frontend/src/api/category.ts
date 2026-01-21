import type { CategoryItem } from "../interface/productInterface";
import { apiRequest } from "./axios";

// Interface cho phản hồi danh sách (GET ALL)
export interface CategoryResponse {
    success: boolean;
    data: CategoryItem[];
    message: string;
    timestamp: Date;
}

// Interface cho phản hồi một đối tượng (CREATE / UPDATE / GET BY ID)
// Backend thường trả về chính đối tượng vừa tạo kèm ID mới sinh ra
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
 * Hàm tạo danh mục mới
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