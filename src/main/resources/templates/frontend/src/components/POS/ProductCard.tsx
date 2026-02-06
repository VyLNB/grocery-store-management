import React from 'react';
import { Card } from 'react-bootstrap';

interface ProductCardProps {
  category: string;
  name: string;
  price: number;
  stock: number;
  onDoubleClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  category, 
  name, 
  price, 
  stock,
  onDoubleClick 
}) => {

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(value).replace(/\s/g, '');
  };

  return (
    <Card 
      className="h-100 border-0 shadow-sm rounded-4 user-select-none"
      onDoubleClick={onDoubleClick}
      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Card.Body className="d-flex flex-column p-3">

        <div className="mb-1">
          <small
            className="text-primary fw-bold text-uppercase"
            style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}
          >
            {category}
          </small>
        </div>

        <Card.Title
          className="fw-bold text-dark mb-2 text-truncate"
          style={{ fontSize: '0.95rem' }}
        >
          {name}
        </Card.Title>

        <div className="mt-auto d-flex justify-content-between align-items-end">
          <span
            className="fw-bold"
            style={{ color: '#a855f7', fontSize: '1.1rem' }}
          >
            {formatCurrency(price).replace('₫', 'đ')}
          </span>

          {stock > 0 ? (
            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>
              Kho: {stock}
            </span>
          ) : (
            <span className="text-danger fw-bold" style={{ fontSize: '0.8rem' }}>
              Hết hàng
            </span>
          )}
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;
