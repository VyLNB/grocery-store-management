import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    Warehouse,
    Settings,
    LayoutGrid
} from "lucide-react";

const Sidebar: React.FC = () => {
    const menuItems = [
        { id: "dashboard", title: "Tổng quan", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
        { id: "products", title: "Sản phẩm", path: "/admin/products", icon: <Package size={18} /> },
        { id: "category", title: "Danh mục", path: "/admin/categories", icon: <LayoutGrid size={18}/>},
        { id: "orders", title: "Đơn hàng", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
        { id: "revenue", title: "Doanh thu", path: "/admin/revenue", icon: <BarChart3 size={18} /> },
        { id: "inventory", title: "Kho hàng", path: "/admin/inventory", icon: <Warehouse size={18} /> },
    ];

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white border-end" style={{ width: "250px", height: "100vh" }}>
            <div className="d-flex align-items-center mb-4 px-2">
                <div className="bg-purple-100 p-2 rounded me-2">
                    {/* Icon Logo giả lập */}
                    <div style={{width: 20, height: 20, background: '#8b5cf6', borderRadius: 4}}></div>
                </div>
                <div>
                    <h6 className="fw-bold mb-0">Tạp Hóa Store</h6>
                    <small className="text-muted" style={{fontSize: '12px'}}>Admin Dashboard</small>
                </div>
            </div>

            <Nav className="flex-column mb-auto gap-1 ">
                {menuItems.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.id}
                        className={({ isActive }) => `d-flex align-items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-purple-100' : 'text-secondary'}`}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? '#f3f0ff' : 'transparent',
                            color: isActive ? '#8b5cf6' : '#6c757d',
                            fontWeight: isActive ? '600' : '400',
                            textDecoration: 'none',
                        })}
                    >
                        {item.icon}
                        {item.title}
                    </NavLink>
                ))}
            </Nav>
            
            <hr />
            
            <Nav.Link href="#" className="d-flex align-items-center gap-3 px-3 py-2 text-secondary">
                <Settings size={18} />
                Cài đặt
            </Nav.Link>
        </div>
    );
};

export default Sidebar;