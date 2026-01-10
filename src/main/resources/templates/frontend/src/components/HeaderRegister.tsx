import { FaStore } from 'react-icons/fa';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeaderRegister = () => {
    // Màu tím chủ đạo lấy từ ảnh của bạn
    const brandColor = '#A855F7';
    const navigate = useNavigate();

    return (
        <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
            <Container>
                {/* === PHẦN LOGO === */}
                <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
                    {/* Box icon màu tím */}
                    <div
                        className="d-flex align-items-center justify-content-center rounded"
                        style={{
                            width: '35px',
                            height: '35px',
                            backgroundColor: brandColor,
                            color: 'white'
                        }}
                    >
                        <FaStore size={18} />
                    </div>
                    <span className="fw-bold text-dark">Tạp Hóa Manager</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="d-flex align-items-end gap-3 mt-3 mt-lg-0 ms-auto">
                        <Nav.Link className="text-dark fw-bold" 
                                    style={{ fontSize: '17px', }}
                                    onClick={() => { navigate('/') }}>
                            <span style={{color: "#a855f7"}}>Đăng nhập</span>
                        </Nav.Link>

                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderRegister;