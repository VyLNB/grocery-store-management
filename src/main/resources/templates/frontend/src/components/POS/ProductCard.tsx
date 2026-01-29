import React from 'react';
import { Card } from 'react-bootstrap';

interface ProductCardProps {
  category: string;
  name: string;
  price: number;
  stock: number;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  category, 
  name, 
  price, 
  stock,
  onClick 
}) => {
  
  // Hàm format tiền tệ (32.000đ)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(value).replace(/\s/g, ''); // Xóa khoảng trắng thừa nếu có
  };

  return (
    <Card 
      className="h-100 border-0 shadow-sm rounded-4" 
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      // Hiệu ứng hover nhẹ
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Card.Body className="d-flex flex-column p-3">
        {/* Phần nội dung chính */}
        <div className="mb-2">
          {/* Tên danh mục: Xanh, In hoa, Đậm, Font nhỏ */}
          <small className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
            {category}
          </small>
        </div>

        {/* Tên sản phẩm */}
        <Card.Title className="fw-bold text-dark mb-3" style={{ fontSize: '1rem', minHeight: '3rem' }}>
          {name}
        </Card.Title>

        {/* Footer của card: Giá và Kho/Trạng thái */}
        <div className="mt-auto d-flex justify-content-between align-items-end">
          {/* Giá tiền: Màu tím */}
          <span 
            className="fw-bold" 
            style={{ color: '#a855f7', fontSize: '1.25rem' }}
          >
            {formatCurrency(price).replace('₫', 'đ')}
          </span>

          {/* Logic hiển thị kho giống hình 2 (Hết hàng màu đỏ) */}
          {stock > 0 ? (
            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
              Kho: {stock}
            </span>
          ) : (
            <span className="text-danger fw-bold" style={{ fontSize: '0.85rem' }}>
              Hết hàng
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;