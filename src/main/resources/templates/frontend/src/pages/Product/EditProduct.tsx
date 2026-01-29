import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/Product/ProductForm";
import { getProductById, updateProduct } from "../../api/products";
import { getAllCategories } from "../../api/category";
import type { ProductItem, CategoryItem } from "../../interface/productInterface";
import type { ProductFormData } from "../../components/Product/ProductForm";
import { Spinner } from "react-bootstrap";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [productData, setProductData] = useState<ProductItem | undefined>(undefined);
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    // 1. Lấy dữ liệu sản phẩm và danh sách danh mục
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setFetching(true);

                const [productResponse, categoriesResponse]: any = await Promise.all([
                    getProductById(Number(id)),
                    getAllCategories()
                ]);

                if (productResponse && productResponse.data) {
                    setProductData(productResponse.data);
                } else if (productResponse && productResponse.id) {
                    setProductData(productResponse);
                } else {
                    console.error("Không tìm thấy dữ liệu sản phẩm trong response");
                }

                if (categoriesResponse && categoriesResponse.data) {
                    setCategories(categoriesResponse.data);
                } else if (Array.isArray(categoriesResponse)) {
                    setCategories(categoriesResponse);
                } else {
                    console.error("Không tìm thấy danh sách danh mục");
                    setCategories([]);
                }

            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
                alert("Không thể tải thông tin sản phẩm này.");
                navigate("/admin/products");
            } finally {
                setFetching(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    // 2. Xử lý lưu
    const handleSubmit = async (data: ProductFormData) => {
        if (!id) return;

        try {
            setLoading(true);

            const { id: _, categoryId, ...restData } = data;

            const payload = {
                ...restData,
                category: categoryId ? { id: categoryId } : null,

                categoryId: categoryId
            };

            await updateProduct(Number(id), payload as any);

            alert("Cập nhật sản phẩm thành công!");
            navigate("/admin/products");
        } catch (error: any) {
            console.error("Lỗi cập nhật:", error);
            alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/admin/products");
    };

    // Loading state
    if (fetching) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!productData) {
        return <div className="text-center py-5">Không tìm thấy dữ liệu sản phẩm.</div>;
    }

    return (
        <ProductForm
            initialData={productData}
            categories={categories}
            key={productData.id}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
            mode="edit"
        />
    );
};

export default EditProduct;