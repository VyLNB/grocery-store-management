// src/components/Product/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// 1. Import Interface chuẩn từ file chung
import type { CategoryItem } from '../../interface/productInterface';

// Xóa interface Category cục bộ cũ để tránh xung đột
/* interface Category {
  id: number;
  name: string;
  isActive: boolean;
} 
*/

export interface ProductFormData {
  id?: number;
  name: string;
  sku: string;
  categoryId: number | null;
  price: number;
  quantity: number;
  stock: number;
  unit: string;
  description: string;
  isActive: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  categories: CategoryItem[];
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

const FormField: React.FC<FormFieldProps> = ({ label, required, error, children }) => (
  <Form.Group className="mb-3">
    <Form.Label className="fw-bold">
      {label} {required && <span className="text-danger">*</span>}
    </Form.Label>
    {children}
    {error && <Form.Text className="text-danger d-block">{error}</Form.Text>}
  </Form.Group>
);

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  // Giá trị mặc định chuẩn cho Product
  const defaultData: ProductFormData = {
    name: '',
    sku: '',
    categoryId: null,
    price: 0,
    quantity: 0,
    stock: 0,
    unit: '',
    description: '',
    isActive: true,
  };

  const [formData, setFormData] = useState<ProductFormData>(initialData || defaultData);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  // Cập nhật state nếu initialData thay đổi (khi edit)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof ProductFormData, value: any) => {
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

    if (formData.price <= 0) {
      newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Số lượng không được âm';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Tồn kho không được âm';
    }

    if (!formData.unit.trim()) {
      newErrors.unit = 'Đơn vị tính là bắt buộc';
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

  // 3. Lọc danh mục đang hoạt động (isActive === true)
  const activeCategories = categories.filter(cat => cat.isActive === true);

  return (
    <div className="container py-4" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4 fw-bold">
        {mode === 'create' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
      </h2>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Thông tin cơ bản */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 pb-2 border-bottom">Thông tin cơ bản</h5>
              
              {/* Tên sản phẩm */}
              <FormField label="Tên sản phẩm" required error={errors.name}>
                <Form.Control
                  type="text"
                  placeholder="Ví dụ: Sữa tươi TH True Milk 1L"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  isInvalid={!!errors.name}
                  disabled={isLoading}
                />
              </FormField>

              {/* SKU và Danh mục */}
              <Row>
                <Col md={6}>
                  <FormField label="Mã sản phẩm (SKU)" required error={errors.sku}>
                    <Form.Control
                      type="text"
                      placeholder="Ví dụ: SKU-12345"
                      value={formData.sku}
                      onChange={(e) => handleChange('sku', e.target.value.toUpperCase())}
                      isInvalid={!!errors.sku}
                      disabled={isLoading}
                    />
                  </FormField>
                </Col>
                <Col md={6}>
                  {/* Select Danh mục đã được cập nhật logic hiển thị */}
                  <FormField label="Danh mục" required error={errors.categoryId as string}>
                    <Form.Select
                      value={formData.categoryId || ''}
                      onChange={(e) => handleChange('categoryId', e.target.value ? Number(e.target.value) : null)}
                      isInvalid={!!errors.categoryId}
                      disabled={isLoading}
                    >
                      <option value="">Chọn danh mục</option>
                      {activeCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormField>
                </Col>
              </Row>

              {/* Mô tả */}
              <FormField label="Mô tả">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nhập mô tả ngắn gọn về sản phẩm..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={isLoading}
                  style={{ resize: 'none' }}
                />
              </FormField>
            </div>

            {/* Giá và Kho hàng */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 pb-2 border-bottom">Giá và Kho hàng</h5>
              
              <Row>
                <Col md={6}>
                  <FormField label="Giá bán (VNĐ)" required error={errors.price}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => handleChange('price', Number(e.target.value))}
                      isInvalid={!!errors.price}
                      disabled={isLoading}
                      min="0"
                      step="1000"
                    />
                  </FormField>
                </Col>
                <Col md={6}>
                  <FormField label="Đơn vị tính" required error={errors.unit}>
                    <Form.Control
                      type="text"
                      placeholder="Ví dụ: Chai, Hộp, Kg..."
                      value={formData.unit}
                      onChange={(e) => handleChange('unit', e.target.value)}
                      isInvalid={!!errors.unit}
                      disabled={isLoading}
                    />
                  </FormField>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormField label="Số lượng" required error={errors.quantity}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', Number(e.target.value))}
                      isInvalid={!!errors.quantity}
                      disabled={isLoading}
                      min="0"
                    />
                  </FormField>
                </Col>
                <Col md={6}>
                  <FormField label="Tồn kho" required error={errors.stock}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) => handleChange('stock', Number(e.target.value))}
                      isInvalid={!!errors.stock}
                      disabled={isLoading}
                      min="0"
                    />
                  </FormField>
                </Col>
              </Row>
            </div>

            {/* Trạng thái hoạt động */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 pb-2 border-bottom">Cài đặt</h5>
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Trạng thái hoạt động</Form.Label>
                <div className="d-flex gap-4 mt-2">
                  <Form.Check
                    type="radio"
                    id="product-status-active"
                    label="Hoạt động"
                    name="productStatus"
                    checked={formData.isActive === true}
                    onChange={() => handleChange('isActive', true)}
                    disabled={isLoading}
                    className="fw-medium"
                  />
                  <Form.Check
                    type="radio"
                    id="product-status-inactive"
                    label="Ngừng hoạt động"
                    name="productStatus"
                    checked={formData.isActive === false}
                    onChange={() => handleChange('isActive', false)}
                    disabled={isLoading}
                    className="fw-medium"
                  />
                </div>
              </Form.Group>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              {onCancel && (
                <Button variant="light" onClick={onCancel} disabled={isLoading}>
                  Hủy bỏ
                </Button>
              )}
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Đang lưu...' : mode === 'create' ? 'Tạo sản phẩm' : 'Lưu thay đổi'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductForm;