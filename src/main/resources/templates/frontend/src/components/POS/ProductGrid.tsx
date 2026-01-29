import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard'; // Đường dẫn import

const ProductGrid = () => {
  // Dữ liệu giả lập giống trong hình
  const products = [
    { id: 1, category: "Đồ uống", name: "Sữa tươi TH True Milk 1L", price: 32000, stock: 124 },
    { id: 2, category: "Thực phẩm khô", name: "Mì Hảo Hảo Tôm Chua Cay", price: 4500, stock: 15 },
    { id: 3, category: "Hóa mỹ phẩm", name: "Nước giặt OMO Matic 2kg", price: 185000, stock: 0 }, // Test hết hàng
    { id: 4, category: "Đồ uống", name: "Nước khoáng Lavie 500ml", price: 6000, stock: 450 },
    { id: 5, category: "Bánh kẹo", name: "Bánh quy Cosy 250g", price: 25000, stock: 80 },
  ];

  return (
    <Container className="py-5 bg-light" fluid>
      <h3 className="mb-4">Danh sách sản phẩm</h3>
      
      {/* Grid system của Bootstrap */}
      <Row className="g-3"> {/* g-3 tạo khoảng cách giữa các card */}
        {products.map((product) => (
          // xs={12}: Mobile 1 cột
          // sm={6}: Tablet nhỏ 2 cột
          // md={4}: Tablet 3 cột
          // lg={3}: Desktop 4 cột (Giống hình)
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              category={product.category}
              name={product.name}
              price={product.price}
              stock={product.stock}
              onClick={() => console.log("Clicked:", product.name)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;