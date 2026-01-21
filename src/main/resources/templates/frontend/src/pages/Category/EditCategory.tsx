import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import { getCategoryById, updateCategory } from "../../api/category"; 
import type { CategoryItem } from "../../interface/productInterface";
import { Spinner } from "react-bootstrap";

const EditCategory = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); 
    const [categoryData, setCategoryData] = useState<CategoryItem | undefined>(undefined);

    // 1. Lấy dữ liệu danh mục cũ
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setFetching(true);
                const response: any = await getCategoryById(Number(id));
                
                // --- DEBUG: In log để kiểm tra cấu trúc API trả về ---
                console.log("API Chi tiết danh mục trả về:", response);

                // --- XỬ LÝ LINH HOẠT ---
                if (response && response.data) {
                    // Trường hợp chuẩn: { success: true, data: { ... } }
                    setCategoryData(response.data);
                } else if (response && response.id) {
                    // Trường hợp API trả về thẳng object: { id: 1, name: ... }
                    setCategoryData(response);
                } else {
                    console.error("Không tìm thấy dữ liệu trong response");
                }

            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
                alert("Không thể tải thông tin danh mục này.");
                navigate("/admin/categories");
            } finally {
                setFetching(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    // 2. Xử lý lưu
    const handleSubmit = async (data: CategoryItem) => {
        if (!id) return;

        try {
            setLoading(true);
            
            const { id: _, ...payload } = data; 
            
            await updateCategory(Number(id), payload);

            alert("Cập nhật danh mục thành công!");
            navigate("/admin/categories");
        } catch (error: any) {
            console.error("Lỗi cập nhật:", error);
            alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/categories");
    };

    if (fetching) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    // Nếu không có dữ liệu sau khi fetch xong
    if (!categoryData) {
        return <div className="text-center py-5">Không tìm thấy dữ liệu danh mục.</div>;
    }

    return (
        <CategoryForm
            // Truyền dữ liệu vào form
            initialData={categoryData} 
            // Thêm key để React reset form khi ID thay đổi (quan trọng)
            key={categoryData.id} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
            mode="edit" 
        />
    );
};

export default EditCategory;