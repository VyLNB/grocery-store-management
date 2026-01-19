import type { CategoryItem} from "../interface/productInterface";
import { apiRequest } from "./axios";

export interface CategoryResponse {
    success: boolean;
    data: CategoryItem[];
    message: string;
    timestamp: Date;
}

export async function getAllCategories(): Promise<CategoryResponse> {
    return await apiRequest<CategoryResponse>('get', `/category`);
}