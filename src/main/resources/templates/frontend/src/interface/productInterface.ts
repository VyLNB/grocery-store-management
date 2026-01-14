// 1. Tạo thêm Interface cho Category
export interface CategoryItem {
    id: number;
    name: string;
}

// 2. Cập nhật ProductItem
export interface ProductItem {
    id: number;          // Bên Java là Long, bên này nên để number
    name: string;
    
    // SỬA Ở ĐÂY: Thay vì string, giờ nó là đối tượng CategoryItem
    // Thêm | null để phòng trường hợp sản phẩm chưa có danh mục
    category: CategoryItem | null; 
    
    unit: string;
    quantity: number;
    price: number;
    stock: number;
    status: boolean;
}