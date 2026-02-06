import { useState } from 'react';
import { Row, Col, Button} from 'react-bootstrap';
import { Trash, Wallet2, CreditCard, QrCodeScan } from 'react-bootstrap-icons';
import ProductGrid from '../components/POS/ProductGrid';
import CartItem from '../components/POS/cart/CartItem';

interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

const POS = () => {
    const [cart, setCart] = useState<CartItemType[]>([]);

    // Xử lý thêm vào giỏ (Double Click từ Grid)
    const handleAddToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                quantity: 1, 
                imageUrl: product.imageUrl 
            }];
        });
    };

    // Tăng giảm số lượng
    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    // Tính toán tiền
    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subTotal * 0.08; // 8% thuế như hình
    const total = subTotal + tax;

    const formatMoney = (n: number) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n).replace('₫', 'đ');

    return (
        <div className="vh-100 bg-light overflow-hidden">
            <Row className="h-100 g-0">
                {/* Cột Trái: Danh sách sản phẩm */}
                <Col md={8} lg={9} className="h-100 p-3 d-flex flex-column">
                    <ProductGrid onAddToCart={handleAddToCart} />
                </Col>

                {/* Cột Phải: Giỏ hàng & Thanh toán */}
                <Col md={4} lg={3} className="h-100 bg-white border-start d-flex flex-column shadow rounded-4">
                    {/* Header Giỏ hàng */}
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="m-0 fw-bold d-flex align-items-center gap-2">
                            <span className="text-primary"><Wallet2/></span> 
                            Giỏ hàng 
                            <span className="badge bg-primary-subtle text-primary rounded-pill">{cart.length}</span>
                        </h5>
                        <Button variant="link" className="text-danger text-decoration-none small p-0" onClick={clearCart}>
                            <Trash/>
                        </Button>
                    </div>

                    {/* Danh sách Items (Cuộn được) */}
                    <div className="flex-grow-1 overflow-auto p-3 bg-light">
                        {cart.length === 0 ? (
                            <div className="text-center text-muted mt-5">
                                <p>Chưa có sản phẩm nào</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))
                        )}
                    </div>

                    {/* Footer: Tổng tiền & Thanh toán */}
                    <div className="p-3 border-top bg-white">
                        <div className="d-flex justify-content-between mb-1 small text-muted">
                            <span>Tạm tính:</span>
                            <span>{formatMoney(subTotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 small text-muted">
                            <span>Thuế (8%):</span>
                            <span>{formatMoney(tax)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold fs-5">Tổng cộng:</span>
                            <span className="fw-bold fs-4 text-primary" style={{color: '#8b5cf6'}}>{formatMoney(total)}</span>
                        </div>

                        {/* Phương thức thanh toán */}
                        {/* <div className="mb-2">
                            <small className="text-uppercase text-secondary fw-bold" style={{fontSize: '0.7rem'}}>Phương thức thanh toán</small>
                            <div className="d-flex gap-2 mt-2">
                                <Button variant="outline-primary" className="flex-fill active d-flex flex-column align-items-center py-2">
                                    <Wallet2 size={18}/> <span style={{fontSize: '0.7rem'}}>Tiền mặt</span>
                                </Button>
                                <Button variant="outline-secondary" className="flex-fill d-flex flex-column align-items-center py-2">
                                    <CreditCard size={18}/> <span style={{fontSize: '0.7rem'}}>Chuyển khoản</span>
                                </Button>
                                <Button variant="outline-secondary" className="flex-fill d-flex flex-column align-items-center py-2">
                                    <QrCodeScan size={18}/> <span style={{fontSize: '0.7rem'}}>Ví điện tử</span>
                                </Button>
                            </div>
                        </div> */}

                        <Button className="w-100 py-3 fw-bold text-uppercase mt-2 shadow-sm" style={{backgroundColor: '#8b5cf6', borderColor: '#8b5cf6'}}>
                            <Wallet2 className="me-2"/> Thanh toán (F9)
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default POS;