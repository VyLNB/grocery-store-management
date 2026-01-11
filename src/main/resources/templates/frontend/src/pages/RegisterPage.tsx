import HeaderRegister from "../components/HeaderRegister.jsx";
import { signup } from "../api/auth.js";
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaStore, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    // 1. Khai báo state cho các trường input
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const brandColor = '#A855F7';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await signup({
                username, // Gửi username
                email,
                password
            });

            console.log("Register successful:", response);
            
            navigate('/');

        } catch (err: any) {
            console.error("Register Error:", err);
            if (err?.issues) {
                setError(err.issues[0]?.message);
            } else if (err?.message) {
                 setError(err.message);
            } else {
                setError('Đăng ký thất bại.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column" style={{ backgroundColor: '#F3F4F6', height: '100vh', overflow: 'hidden' }}>
            <div style={{ flex: '0 0 auto' }}>
                <HeaderRegister />
            </div>

            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <Container>
                    <Card className="border-0 shadow-lg overflow-hidden mx-auto" style={{ borderRadius: '20px', maxWidth: '1100px' }}>
                        <Row className="g-0">
                            {/* === CỘT TRÁI: FORM ĐĂNG KÝ === */}
                            <Col lg={6} className="p-4 bg-white d-flex flex-column justify-content-center">
                                <div className="mb-3 text-center text-lg-start">
                                    <h3 className="fw-bold text-dark mb-1">Đăng ký tài khoản</h3>
                                    <p className="text-muted small mb-0">Quản lý cửa hàng dễ dàng hơn ngay hôm nay.</p>
                                </div>

                                {/* Hiển thị thông báo lỗi nếu có */}
                                {error && (
                                    <Alert variant="danger" className="py-2 small text-center">
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleRegister}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="fw-bold text-secondary" style={{ fontSize: '12px' }}>Tên đăng nhập (Tên cửa hàng/Chủ shop)</Form.Label>
                                        <InputGroup size="sm">
                                            <InputGroup.Text className="bg-light border-end-0 text-secondary">
                                                <FaStore />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ví dụ: Tạp hóa Cô Ba"
                                                className="bg-light border-start-0 shadow-none py-2"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                minLength={2}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label className="fw-bold text-secondary" style={{ fontSize: '12px' }}>Email</Form.Label>
                                        <InputGroup size="sm">
                                            <InputGroup.Text className="bg-light border-end-0 text-secondary">
                                                <FaEnvelope />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                className="bg-light border-start-0 shadow-none py-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold text-secondary" style={{ fontSize: '12px' }}>Mật khẩu</Form.Label>
                                        <InputGroup size="sm">
                                            <InputGroup.Text className="bg-light border-end-0 text-secondary">
                                                <FaLock />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Ít nhất 6 ký tự"
                                                className="bg-light border-start-0 border-end-0 shadow-none py-2"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength={6}
                                            />
                                            <InputGroup.Text
                                                className="bg-light border-start-0 text-secondary"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="w-100 fw-bold py-2 border-0 mt-2"
                                        style={{ backgroundColor: brandColor }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                                    </Button>

                                    <div className="text-center mt-3 small">
                                        <span className="text-muted">Đã có tài khoản? </span>
                                        <Link to="/" style={{ color: brandColor, textDecoration: 'none', fontWeight: 'bold' }}>
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </Form>
                            </Col>

                            {/* === CỘT PHẢI: PROMO / BANNER (Giữ nguyên) === */}
                            <Col lg={6} className="d-none d-lg-block position-relative">
                                <div
                                    className="h-100 w-100 p-4 d-flex flex-column justify-content-center text-white"
                                    style={{
                                        background: `linear-gradient(135deg, #E9D5FF 0%, #D8B4FE 100%)`,
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ zIndex: 2 }}>
                                        <span className="badge bg-white text-primary mb-2 px-3 py-1 rounded-pill shadow-sm small" style={{ color: brandColor + '!important' }}>
                                            ✨ Quản lý thông minh
                                        </span>
                                        <h2 className="fw-bold mb-2 text-dark">
                                            Kiểm soát hàng tồn kho,<br /> doanh thu mọi lúc.
                                        </h2>
                                        <p className="text-secondary mb-4 small" style={{ fontSize: '0.9rem' }}>
                                            Tham gia cùng hơn 10.000 chủ cửa hàng tạp hóa đang sử dụng nền tảng của chúng tôi.
                                        </p>

                                        <div className="bg-white p-2 rounded-4 shadow-lg opacity-75 mx-auto" style={{ maxWidth: '80%' }}>
                                            <div className="d-flex gap-2 mb-2">
                                                <div className="bg-secondary bg-opacity-10 rounded p-2 flex-grow-1"></div>
                                                <div className="bg-primary bg-opacity-25 rounded p-2 px-3"></div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <div className="bg-secondary bg-opacity-10 rounded p-3 w-25"></div>
                                                <div className="flex-grow-1 d-flex flex-column gap-2">
                                                    <div className="bg-info bg-opacity-10 rounded p-2"></div>
                                                    <div className="bg-purple bg-opacity-10 rounded p-2"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mt-4 justify-content-center justify-content-lg-start">
                                            <div className="d-flex ms-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="rounded-circle border border-2 border-white bg-secondary"
                                                        style={{ width: '30px', height: '30px', marginLeft: '-10px', backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }}>
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="small text-secondary fw-bold" style={{ fontSize: '11px' }}>Được tin dùng bởi các chủ tiệm</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </div>
    )
};

export default RegisterPage;