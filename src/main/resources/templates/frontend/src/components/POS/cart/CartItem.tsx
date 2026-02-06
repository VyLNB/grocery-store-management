import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value).replace('₫', 'đ');
  };

  return (
    <div className="d-flex align-items-center bg-white p-2 mb-2 rounded-3 shadow-sm">

      {/* Tên + giá */}
      <div className="flex-grow-1 pe-2" style={{ minWidth: 0 }}>
        <div className="fw-bold text-truncate text-dark" style={{ fontSize: '0.9rem' }}>
          {item.name}
        </div>
        <div className="text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>

      {/* Điều khiển số lượng */}
      <div className="d-flex align-items-center bg-light rounded-pill px-1 py-1 me-2">
        <Button
          variant="link"
          className="p-0 text-dark text-decoration-none"
          style={{ width: '24px', height: '24px', lineHeight: '1' }}
          onClick={() => onUpdateQuantity(item.id, -1)}
        >
          -
        </Button>

        <Form.Control
          type="text"
          value={item.quantity}
          readOnly
          className="border-0 bg-transparent text-center p-0 fw-bold"
          style={{ width: '30px', fontSize: '0.9rem', boxShadow: 'none' }}
        />

        <Button
          variant="link"
          className="p-0 text-dark text-decoration-none"
          style={{ width: '24px', height: '24px', lineHeight: '1' }}
          onClick={() => onUpdateQuantity(item.id, 1)}
        >
          +
        </Button>
      </div>

      {/* Nút xoá */}
      <Button
        variant="link"
        className="p-0 text-danger"
        onClick={() => onRemove(item.id)}
        title="Xóa khỏi giỏ"
      >
        <Trash size={16} />
      </Button>

    </div>
  );
};

export default CartItem;
