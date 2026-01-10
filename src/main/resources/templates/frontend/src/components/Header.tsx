import { Form, InputGroup } from 'react-bootstrap';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top">
      {/* Search Bar */}
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <InputGroup>
          <InputGroup.Text className="bg-light border-0">
            <Search size={18} className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Tìm kiếm sản phẩm, đơn hàng..."
            className="bg-light border-0 shadow-none"
          />
        </InputGroup>
      </div>

      {/* Right Icons */}
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative cursor-pointer">
          <Bell size={20} className="text-secondary" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </div>
        <HelpCircle size={20} className="text-secondary cursor-pointer" />
        
        {/* Avatar Placeholder */}
        <div 
            className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white" 
            style={{width: 32, height: 32}}
        >
            A
        </div>
      </div>
    </div>
  );
};

export default Header;