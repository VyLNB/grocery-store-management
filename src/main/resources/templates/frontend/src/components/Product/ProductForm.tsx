// ProductForm.tsx
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

// ============= TYPES =============
interface Category {
  id: number;
  name: string;
}

export interface ProductFormData {
  name: string;
  sku: string;
  categoryId: number | null;
  description: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
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

// ============= REUSABLE COMPONENTS =============

// Form Field Wrapper - Tái sử dụng cho mọi input
const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required, 
  error, 
  children 
}) => (
  <Form.Group className="mb-3">
    <Form.Label>
      {label} {required && <span className="text-danger">*</span>}
    </Form.Label>
    {children}
    {error && <Form.Text className="text-danger d-block">{error}</Form.Text>}
  </Form.Group>
);

// Section Header - Tái sử dụng cho các section khác nhau
const SectionHeader: React.FC<{ icon?: string; title: string }> = ({ 
  icon = 'ℹ️', 
  title 
}) => (
  <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
    <span className="me-2 fs-5">{icon}</span>
    <h5 className="mb-0 fw-semibold">{title}</h5>
  </div>
);

// ============= MAIN FORM COMPONENT =============
const ProductForm: React.FC<ProductFormProps> = ({
  initialData = {
    name: '',
    sku: '',
    categoryId: null,
    description: '',
  },
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  // Handle field changes
  const handleChange = (
    field: keyof ProductFormData,
    value: string | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validation logic
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên sản phẩm là bắt buộc';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'Mã sản phẩm (SKU) là bắt buộc';
    } else if (!/^[A-Z0-9-]+$/i.test(formData.sku)) {
      newErrors.sku = 'SKU chỉ được chứa chữ, số và dấu gạch ngang';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Vui lòng chọn danh mục';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      {/* Page Header */}
      <h2 className="mb-2">
        {mode === 'create' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
      </h2>
      <p className="text-muted mb-4">
        Nhập các chi tiết sản phẩm để cập nhật danh mục hàng hóa của bạn.
      </p>

      {/* Form */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <SectionHeader icon="ℹ️" title="Thông tin cơ bản" />

          <Form onSubmit={handleSubmit}>
            {/* Product Name */}
            <FormField
              label="Tên sản phẩm"
              required
              error={errors.name}
            >
              <Form.Control
                type="text"
                placeholder="VD: Sữa tươi TH True Milk 1L"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                isInvalid={!!errors.name}
                disabled={isLoading}
              />
            </FormField>

            {/* SKU and Category Row */}
            <Row>
              <Col md={6}>
                <FormField
                  label="Mã sản phẩm (SKU)"
                  required
                  error={errors.sku}
                >
                  <Form.Control
                    type="text"
                    placeholder="VD: SKU-12345"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value.toUpperCase())}
                    isInvalid={!!errors.sku}
                    disabled={isLoading}
                  />
                </FormField>
              </Col>
              <Col md={6}>
                <FormField
                  label="Danh mục"
                  error={errors.categoryId as string}
                >
                  <Form.Select
                    value={formData.categoryId || ''}
                    onChange={(e) =>
                      handleChange(
                        'categoryId',
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    isInvalid={!!errors.categoryId}
                    disabled={isLoading}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormField>
              </Col>
            </Row>

            {/* Description */}
            <FormField label="Mô tả sản phẩm">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập mô tả ngắn gọn về sản phẩm..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={isLoading}
                style={{ resize: 'none' }}
              />
            </FormField>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              {onCancel && (
                <Button
                  variant="outline-secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Hủy
                </Button>
              )}
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Đang lưu...' : mode === 'create' ? 'Tạo sản phẩm' : 'Cập nhật'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductForm;

// ============= USAGE EXAMPLES =============

/*
// Example 1: Create new product
import ProductForm from './ProductForm';

const CreateProductPage = () => {
  const categories = [
    { id: 1, name: 'Sữa & Đồ uống' },
    { id: 2, name: 'Thực phẩm tươi sống' },
  ];

  const handleSubmit = (data: ProductFormData) => {
    console.log('Creating product:', data);
    // Call API here
  };

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleSubmit}
      onCancel={() => window.history.back()}
    />
  );
};

// Example 2: Edit existing product
const EditProductPage = () => {
  const existingProduct = {
    name: 'Sữa TH True Milk',
    sku: 'SKU-001',
    categoryId: 1,
    description: 'Sữa tươi thanh trùng',
  };

  const categories = [
    { id: 1, name: 'Sữa & Đồ uống' },
    { id: 2, name: 'Thực phẩm tươi sống' },
  ];

  const handleSubmit = (data: ProductFormData) => {
    console.log('Updating product:', data);
    // Call API here
  };

  return (
    <ProductForm
      mode="edit"
      initialData={existingProduct}
      categories={categories}
      onSubmit={handleSubmit}
      isLoading={false}
    />
  );
};
*/