// CreateCategory.tsx
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import CategoryForm from '../../components/Category/CategoryForm';
import type { CategoryItem } from '../../interface/productInterface';
import { createCategory } from '../../api/category';

const CreatCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (data: CategoryItem) => {
    try {
      setLoading(true);

      const { id, ...payload } = data; 
      
      console.log('Dữ liệu thực tế gửi đi (Không có ID):', payload);

      // Ví dụ gọi API:
      await createCategory(payload);

      alert('Tạo danh mục thành công!');
      navigate('/admin/categories');
      
    } catch (error: any) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
      navigate('/admin/categories');
    }
  };

  return (
    <CategoryForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={loading}
      mode="create"
    />
  );
};

export default CreatCategory;