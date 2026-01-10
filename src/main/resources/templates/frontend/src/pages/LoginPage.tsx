import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { PersonFill, LockFill, ArrowRight, BoxSeam } from 'react-bootstrap-icons';
import './LoginPage.css';
import { useState } from 'react';
import { signin } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await signin({ username, password });
            console.log("Login response:", response);
            navigate('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Background Overlay */}
            <div className="login-overlay"></div>

            <div className="login-content">
                {/* Top Logo Section */}
                <div className="text-center mb-4">
                    <div className="logo-box">
                        <BoxSeam color="white" size={30} />
                    </div>
                    <h4 className="fw-bold text-dark">Quản lý Tạp hóa</h4>
                </div>

                {/* Main Card */}
                <Card className="card-login p-4">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <h3 className="fw-bold mb-1">Đăng nhập hệ thống</h3>
                            <p className="text-muted small">Vui lòng nhập thông tin của bạn để tiếp tục</p>
                        </div>

                        <Form onSubmit={handleLogin}>
                            {/* Username Field */}
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label className="fw-bold small">Tên đăng nhập</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className="input-icon">
                                        <PersonFill size={20} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email hoặc tên tài khoản"
                                        className="py-2"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label className="fw-bold small">Mật khẩu</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="input-icon">
                                        <LockFill size={18} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        className="py-2 border-end-0"
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </InputGroup>
                            </Form.Group>

                            {/* Forgot Password Link */}
                            <div className="d-flex justify-content-end mb-4">
                                <a href="#" className="text-custom-purple text-decoration-none small fw-bold">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <Button
                                variant="primary"
                                className="btn-custom-purple w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                                type="submit"
                            >
                                Đăng nhập <ArrowRight size={18} />
                            </Button>
                        </Form>
                    </Card.Body>

                    <hr className="my-2" />

                    {/* Card Footer */}
                    <div className="text-center mt-2">
                        <span className="text-muted small">
                            Chưa có tài khoản?{" "}
                            <Link
                                to="/register"
                                className="fw-semibold text-decoration-none"
                                style={{ color: "#a855f7", fontWeight: 600 }}
                            >
                                Đăng ký ngay
                            </Link>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;