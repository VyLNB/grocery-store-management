// 1. Tạo thêm Interface cho Category
export interface CategoryItem {
    id?: number;
    name: string;
    description: string;
    isActive: boolean;
}

// 2. Cập nhật ProductItem
export interface ProductItem {
    id: number;       
    name: string;

    category: CategoryItem | null; 
    
    unit: string;
    quantity: number;
    price: number;
    stock: number;
    status: boolean;
}