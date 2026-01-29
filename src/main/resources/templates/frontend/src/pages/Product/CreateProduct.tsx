import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ProductForm, { type ProductFormData } from "../../components/Product/ProductForm";
import type { CategoryItem } from "../../interface/productInterface";
import { getAllCategories } from "../../api/category";
import { createProduct } from "../../api/products";

const CreateProduct = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    // --- Lấy danh sách danh mục ---
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setFetching(true);
                setError(null);
                const response: any = await getAllCategories();

                if (response && response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else if (Array.isArray(response)) {
                    setCategories(response);
                } else {
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

    // --- Xử lý Submit Form ---
    const handleSubmit = async (data: ProductFormData) => {
        try {
            setLoading(true);

            const { id, categoryId, ...rest } = data; 

            const payload = {
                ...rest,
                category: {
                    id: Number(data.categoryId)
                },

                // Ép kiểu các trường số còn lại
                price: Number(rest.price),
                quantity: Number(rest.quantity),
                stock: Number(rest.stock),
                status: rest.status
            };

            await createProduct(payload);

            alert("Tạo sản phẩm thành công!");
            navigate("/admin/products");

        } catch (error: any) {
            console.error("Lỗi tạo sản phẩm:", error);

            const errorMessage = error.response?.data?.message
                || error.response?.data?.error
                || (typeof error === 'string' ? error : "Có lỗi xảy ra khi tạo sản phẩm");

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


    if (fetching) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }}>
                <Spinner animation="border" variant="primary" />
                <span className="mt-3 text-muted">Đang tải danh mục...</span>
            </div>
        );
    }

    if (categories.length === 0 && !fetching) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning shadow-sm">
                    <h5 className="alert-heading">Chưa có danh mục sản phẩm</h5>
                    <p>
                        Bạn cần tạo ít nhất một danh mục trước khi thêm sản phẩm.
                        {error && <><br /><small className="text-danger">Chi tiết lỗi: {error}</small></>}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/admin/categories")}
                        >
                            Đi đến Quản lý Danh mục
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="container mt-3" style={{ maxWidth: '900px' }}>
                    <div className="alert alert-danger alert-dismissible fade show">
                        <strong>Lỗi:</strong> {error}
                        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
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