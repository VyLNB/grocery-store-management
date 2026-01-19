// CreateProduct.tsx - Version with API Integration
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import type { ProductFormData } from '../../components/Product/ProductForm';
import { getAllCategories } from '../../api/category';

interface Category {
  id: number;
  name: string;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories từ backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetchingCategories(true);
        setError(null);

        // Gọi API lấy categories
        const response = await getAllCategories();
        
        // Xử lý response
        if (response.data) {
          // Nếu response có dạng { success: true, data: [...] }
          if (response.data && Array.isArray(response.data)) {
            setCategories(response.data);
          } 
          // Nếu response trả về trực tiếp array
          else if (Array.isArray(response.data)) {
            setCategories(response.data);
          }
          // Fallback
          else {
            setCategories([]);
          }
        }
      } catch (error: any) {
        console.error('Error fetching categories:', error);
        setError(error.response?.data?.message || 'Không thể tải danh mục');
        
        // Sử dụng mock data nếu API lỗi (để test)
        setCategories([
          { id: 1, name: 'Sữa & Đồ uống' },
          { id: 2, name: 'Thực phẩm tươi sống' },
          { id: 3, name: 'Đồ ăn vặt' },
          { id: 4, name: 'Gia vị' },
          { id: 5, name: 'Đồ dùng gia đình' },
        ]);
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);

      // Chuẩn bị payload gửi lên backend
      const payload = {
        name: data.name,
        sku: data.sku,
        categoryId: data.categoryId,
        description: data.description,
        // Thêm các field khác nếu cần
        price: 0, // Có thể thêm vào form sau
        stock: 0, // Có thể thêm vào form sau
        unit: 'cái', // Có thể thêm vào form sau
      };

      console.log('Sending to backend:', payload);

      // Gọi API tạo sản phẩm
      console.log (payload)

      // Thành công
      alert('Tạo sản phẩm thành công!');
      
      // Chuyển về trang danh sách sản phẩm
      navigate('/admin/products');
      
    } catch (error: any) {
      console.error('Error creating product:', error);
      
      // Hiển thị lỗi cụ thể từ backend
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || 'Có lỗi xảy ra khi tạo sản phẩm. Vui lòng thử lại!';
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Confirm trước khi hủy
    if (window.confirm('Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
      navigate('/admin/products');
    }
  };

  // Loading state khi đang fetch categories
  if (fetchingCategories) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải dữ liệu danh mục...</p>
      </div>
    );
  }

  // Error state (vẫn hiển thị form với mock data)
  if (error && categories.length > 0) {
    return (
      <div>
        <div className="alert alert-warning mx-auto" style={{ maxWidth: '800px' }}>
          <strong>⚠️ Cảnh báo:</strong> {error}. Đang sử dụng dữ liệu mẫu.
        </div>
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={loading}
        />
      </div>
    );
  }

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={loading}
      mode="create"
    />
  );
};

export default CreateProduct;

// ============================================
// BONUS: EditProduct.tsx (để chỉnh sửa sản phẩm)
// ============================================
/*
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import type { ProductFormData } from '../../components/Product/ProductForm';
import axios from '../../utils/axios';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        
        // Fetch cả categories và product detail
        const [categoriesRes, productRes] = await Promise.all([
          axios.get('/categories'),
          axios.get(`/products/${id}`)
        ]);

        setCategories(categoriesRes.data.data || categoriesRes.data);
        
        // Set initial data cho form
        const product = productRes.data.data || productRes.data;
        setInitialData({
          name: product.name,
          sku: product.sku,
          categoryId: product.categoryId || product.category?.id,
          description: product.description || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Không thể tải thông tin sản phẩm');
        navigate('/admin/products');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      await axios.put(`/products/${id}`, data);
      alert('Cập nhật sản phẩm thành công!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Có lỗi xảy ra khi cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <ProductForm
      mode="edit"
      initialData={initialData}
      categories={categories}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/products')}
      isLoading={loading}
    />
  );
};

export default EditProduct;
*/