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

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setFetching(true);
                const response: any = await getCategoryById(Number(id));
                
                if (response && response.data) {
                    setCategoryData(response.data);
                } else if (response && response.id) {
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

    if (!categoryData) {
        return <div className="text-center py-5">Không tìm thấy dữ liệu danh mục.</div>;
    }

    return (
        <CategoryForm
            initialData={categoryData} 
            key={categoryData.id} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
            mode="edit" 
        />
    );
};

export default EditCategory;