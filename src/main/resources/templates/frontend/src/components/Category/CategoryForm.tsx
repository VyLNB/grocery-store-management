// CategoryForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import type { CategoryItem } from '../../interface/productInterface';

interface CategoryFormProps {
  initialData?: CategoryItem;
  // Xóa prop 'categories' vì form tạo danh mục không cần list danh mục khác
  onSubmit: (data: CategoryItem) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required, error, children }) => (
  <Form.Group className="mb-3">
    <Form.Label className="fw-bold">
      {label} {required && <span className="text-danger">*</span>}
    </Form.Label>
    {children}
    {error && <Form.Text className="text-danger d-block">{error}</Form.Text>}
  </Form.Group>
);

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  // Giá trị mặc định chuẩn cho Category
  const defaultData: CategoryItem = {
    name: '',
    description: '',
    isActive: true,
  };

  const [formData, setFormData] = useState<CategoryItem>(initialData || defaultData);
  const [errors, setErrors] = useState<Partial<Record<keyof CategoryItem, string>>>({});

  // Cập nhật state nếu initialData thay đổi (khi edit)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof CategoryItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CategoryItem, string>> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Tên danh mục là bắt buộc';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 fw-bold">
        {mode === 'create' ? 'Thêm danh mục sản phẩm mới' : 'Chỉnh sửa danh mục'}
      </h2>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Tên danh mục */}
            <FormField label="Tên danh mục" required error={errors.name}>
              <Form.Control
                type="text"
                placeholder="Ví dụ: Đồ uống, Thực phẩm khô, Hóa mỹ phẩm..."
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                isInvalid={!!errors.name}
                disabled={isLoading}
              />
            </FormField>

            {/* Mô tả */}
            <FormField label="Mô tả">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập mô tả ngắn gọn giúp phân loại sản phẩm dễ dàng hơn..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={isLoading}
                style={{ resize: 'none' }}
              />
            </FormField>

            {/* Trạng thái hoạt động (Radio Buttons) */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Trạng thái hoạt động</Form.Label>
              <div className="d-flex gap-4 mt-1">
                <Form.Check
                  type="radio"
                  id="status-active"
                  label="Hoạt động"
                  name="status"
                  checked={formData.isActive === true}
                  onChange={() => handleChange('isActive', true)}
                  disabled={isLoading}
                  className="fw-medium"
                />
                <Form.Check
                  type="radio"
                  id="status-inactive"
                  label="Ngừng hoạt động"
                  name="status"
                  checked={formData.isActive === false}
                  onChange={() => handleChange('isActive', false)}
                  disabled={isLoading}
                  className="fw-medium"
                />
              </div>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              {onCancel && (
                <Button variant="light" onClick={onCancel} disabled={isLoading}>
                  Hủy bỏ
                </Button>
              )}
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Đang lưu...' : mode === 'create' ? 'Tạo danh mục' : 'Lưu thay đổi'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CategoryForm;