import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ProductForm, {type ProductFormData } from "../../components/Product/ProductForm";
import { getAllCategories } from "../../api/category";
// import { createProduct } from "../../api/products";
import type { CategoryItem } from "../../interface/productInterface";

const CreateProduct = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    // 1. Lấy danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setFetching(true);
                setError(null);
                
                const response: any = await getAllCategories();

                // Xử lý linh hoạt theo cấu trúc response
                if (response && response.data && Array.isArray(response.data)) {
                    // Trường hợp: { success: true, data: [...] }
                    setCategories(response.data);
                } else if (Array.isArray(response)) {
                    // Trường hợp: trả về trực tiếp array
                    setCategories(response);
                } else {
                    console.error("Không tìm thấy dữ liệu danh mục trong response");
                    setCategories([]);
                    setError("Không tìm thấy dữ liệu danh mục");
                }

            } catch (error: any) {
                console.error("Lỗi khi tải danh mục:", error);
                setError(error.response?.data?.message || "Không thể tải danh sách danh mục");
                setCategories([]);
            } finally {
                setFetching(false);
            }
        };

        fetchCategories();
    }, []);

    // 2. Xử lý tạo mới sản phẩm
    const handleSubmit = async (data: ProductFormData) => {
        try {
            setLoading(true);
            
            // Loại bỏ ID trước khi gửi
            const { id, ...payload } = data;
            
            // 🔍 DEBUG
            console.log("📤 Payload gửi đi:", payload);
            
            // const response = await createProduct(payload);
            
            // console.log("Response từ API:", response);

            alert("Tạo sản phẩm thành công!");
            navigate("/admin/products");
            
        } catch (error: any) {
            console.error("Lỗi tạo sản phẩm:", error);
            
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message
                || "Có lỗi xảy ra khi tạo sản phẩm";
            
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.")) {
            navigate("/admin/products");
        }
    };

    // Loading state
    if (fetching) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }}>
                <Spinner animation="border" variant="primary" />
                <span className="mt-3 text-muted">Đang tải danh mục...</span>
            </div>
        );
    }

    // Error state - nhưng vẫn cho phép tạo sản phẩm nếu có danh mục
    if (error && categories.length === 0) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    <h5>Lỗi tải danh mục</h5>
                    <p>{error}</p>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => window.location.reload()}
                        >
                            Thử lại
                        </button>
                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={() => navigate("/admin/categories")}
                        >
                            Đi đến Quản lý Danh mục
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Empty categories warning
    if (categories.length === 0) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">
                    <h5>Chưa có danh mục nào</h5>
                    <p>Vui lòng tạo ít nhất một danh mục trước khi thêm sản phẩm.</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate("/admin/categories")}
                    >
                        Đi đến Quản lý Danh mục
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="alert alert-warning alert-dismissible fade show mb-3">
                        <strong>Cảnh báo:</strong> {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
            )}
            <ProductForm
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={loading}
                mode="create"
            />
        </>
    );
};

export default CreateProduct;