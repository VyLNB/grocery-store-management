import { useState } from 'react';
import { Row, Col, Button} from 'react-bootstrap';
import { Trash, Wallet2 } from 'react-bootstrap-icons';
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

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeItem = (id: number) => setCart(prev => prev.filter(item => item.id !== id));
    const clearCart = () => setCart([]);

    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subTotal * 0.08; 
    const total = subTotal + tax;

    const formatMoney = (n: number) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n).replace('₫', 'đ');

    return (
        <div className="bg-light overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <Row className="h-100 g-0">
                
                {/* Cột Trái */}
                <Col md={8} lg={9} className="h-100 p-2 d-flex flex-column">
                    <ProductGrid onAddToCart={handleAddToCart} />
                </Col>

                {/* Cột Phải */}
                <Col md={4} lg={3} className="h-100 bg-white border-start d-flex flex-column shadow">
                    
                    <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="m-0 fw-bold d-flex align-items-center gap-2" style={{ fontSize: '1.1rem' }}>
                            <span className="text-primary"><Wallet2/></span> 
                            Giỏ hàng 
                            <span className="badge bg-primary-subtle text-primary rounded-pill">{cart.length}</span>
                        </h5>
                        <Button variant="link" className="text-danger text-decoration-none small p-0" onClick={clearCart}>
                            <Trash/>
                        </Button>
                    </div>

                    <div className="flex-grow-1 overflow-auto p-2 bg-light">
                        {cart.length === 0 ? (
                            <div className="text-center text-muted mt-5">
                                <p>Chưa có sản phẩm nào</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                            ))
                        )}
                    </div>

                    <div className="p-2 border-top bg-white">
                        <div className="d-flex justify-content-between mb-1 small text-muted">
                            <span>Tạm tính:</span>
                            <span>{formatMoney(subTotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1 small text-muted">
                            <span>Thuế (8%):</span>
                            <span>{formatMoney(tax)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold fs-6">Tổng cộng:</span>
                            <span className="fw-bold fs-5 text-primary" style={{color: '#8b5cf6'}}>{formatMoney(total)}</span>
                        </div>

                        <Button className="w-100 py-2 fw-bold text-uppercase shadow-sm" style={{backgroundColor: '#8b5cf6', borderColor: '#8b5cf6'}}>
                            <Wallet2 className="me-2"/> Thanh toán (F9)
                        </Button>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default POS;