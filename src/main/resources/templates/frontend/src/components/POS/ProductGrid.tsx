import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProduct';

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const { products } = useProducts();

  const categories = [
    "Tất cả",
    "Đồ uống",
    "Thực phẩm khô",
    "Hóa mỹ phẩm",
    "Bánh kẹo",
    "Gia vị"
  ];

  return (
    <Container fluid className="h-100 d-flex flex-column">

      {/* Header */}
      <div className="bg-white p-3 rounded-4 mb-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0 fw-bold">Bán hàng tại quầy</h4>
          <span className="text-muted small">24 Tháng 5, 2024</span>
        </div>

        {/* Search */}
        {/* <InputGroup className="mb-3">
          <InputGroup.Text className="bg-light border-0">
            <Search />
          </InputGroup.Text>
          <Form.Control
            placeholder="Quét mã vạch hoặc tìm theo tên sản phẩm..."
            className="bg-light border-0 shadow-none"
          />
        </InputGroup> */}

        {/* Category filter */}
        <div
          className="d-flex gap-2 overflow-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat, idx) => (
            <Button
              key={idx}
              variant={idx === 0 ? 'primary' : 'light'}
              className={`rounded-pill px-3 fw-bold border-0 ${
                idx === 0
                  ? 'bg-primary text-white'
                  : 'bg-white text-dark shadow-sm'
              }`}
              style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-grow-1 overflow-auto pe-1">
        <Row className="g-3">
          {products.map((product: any) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <ProductCard
                category={product.category?.name || 'Khác'}
                name={product.name}
                price={product.price}
                stock={product.stock}
                onDoubleClick={() => onAddToCart(product)}
              />
            </Col>
          ))}
        </Row>
      </div>

    </Container>
  );
};

export default ProductGrid;
