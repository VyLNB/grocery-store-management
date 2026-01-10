import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Download, Plus, DollarSign, ShoppingBag, Archive, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data cho biểu đồ
const chartData = [
  { name: 'Thứ 2', value: 4000 },
  { name: 'Thứ 3', value: 3000 },
  { name: 'Thứ 4', value: 5000 },
  { name: 'Thứ 5', value: 2780 },
  { name: 'Thứ 6', value: 1890 },
  { name: 'Thứ 7', value: 6390 },
  { name: 'CN', value: 3490 },
];

// Mock data cho danh sách đơn hàng
const recentOrders = [
    { id: 'DH-00234', user: 'Chị Lan Anh', amount: '450.000đ', status: 'Hoàn tất', color: 'success' },
    { id: 'DH-00235', user: 'Anh Minh', amount: '1.200.000đ', status: 'Chờ giao', color: 'warning' },
    { id: 'DH-00236', user: 'Cô Ba', amount: '85.000đ', status: 'Hoàn tất', color: 'success' },
    { id: 'DH-00237', user: 'Nguyễn Tuấn', amount: '2.500.000đ', status: 'Mới', color: 'primary' },
];

const DashBoard = () => {
    return (
        <div className="dashboard-content">
            {/* 1. Header Section */}
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Xin chào, Quản lý</h2>
                    <p className="text-muted mb-0">Đây là báo cáo hoạt động kinh doanh ngày hôm nay.</p>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="light" className="d-flex align-items-center gap-2 border">
                        <Download size={16} /> Xuất báo cáo
                    </Button>
                    <Button style={{ backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' }} className="d-flex align-items-center gap-2 text-white">
                        <Plus size={16} /> Tạo đơn hàng
                    </Button>
                </div>
            </div>

            {/* 2. Stats Cards */}
            <Row className="g-3 mb-4">
                <Col md={3}>
                    <StatsCard 
                        title="Doanh thu hôm nay" 
                        value="15.000.000đ" 
                        trend="+12% so với hôm qua" 
                        trendColor="text-success"
                        icon={<DollarSign size={20} className="text-success" />}
                        iconBg="bg-success-subtle"
                    />
                </Col>
                <Col md={3}>
                    <StatsCard 
                        title="Đơn hàng mới" 
                        value="45" 
                        trend="+5% so với hôm qua" 
                        trendColor="text-success"
                        icon={<ShoppingBag size={20} className="text-primary" />}
                        iconBg="bg-primary-subtle"
                    />
                </Col>
                <Col md={3}>
                    <StatsCard 
                        title="Sản phẩm tồn kho" 
                        value="1,240" 
                        subtext="Tổng số SKU đang hoạt động"
                        icon={<Archive size={20} className="text-purple" />}
                        iconBg="bg-purple-subtle" // Custom class needed or standard bootstrap
                    />
                </Col>
                <Col md={3}>
                    <StatsCard 
                        title="Cảnh báo hết hàng" 
                        value="8" 
                        subtext="Cần nhập thêm"
                        subtextColor="text-danger"
                        icon={<AlertTriangle size={20} className="text-danger" />}
                        iconBg="bg-danger-subtle"
                    />
                </Col>
            </Row>

            {/* 3. Charts & Orders */}
            <Row className="g-3">
                {/* Chart Section */}
                <Col md={8}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold">Biểu đồ doanh thu</h5>
                                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">+8.2% Tuần này</span>
                            </div>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Recent Orders Section */}
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold">Đơn hàng mới nhất</h5>
                                <a href="#" className="text-decoration-none text-primary small">Xem tất cả</a>
                            </div>
                            
                            <div className="d-flex flex-column gap-3">
                                {recentOrders.map((order, idx) => (
                                    <div key={idx} className="d-flex align-items-center justify-content-between border-bottom pb-3 last-no-border">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary fw-bold" style={{width: 40, height: 40}}>
                                                {order.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-semibold" style={{fontSize: '14px'}}>{order.user}</h6>
                                                <small className="text-muted" style={{fontSize: '12px'}}>{order.id}</small>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold" style={{fontSize: '14px'}}>{order.amount}</div>
                                            <span className={`badge bg-${order.color}-subtle text-${order.color} rounded-pill`} style={{fontSize: '10px'}}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

// Component con tái sử dụng cho thẻ thống kê
const StatsCard = ({ title, value, trend, trendColor, icon, iconBg, subtext, subtextColor }: any) => (
    <Card className="border-0 shadow-sm h-100">
        <Card.Body>
            <div className="d-flex justify-content-between mb-3">
                <span className="text-muted small">{title}</span>
                <div className={`p-2 rounded ${iconBg}`}>
                    {icon}
                </div>
            </div>
            <h3 className="fw-bold mb-2">{value}</h3>
            {trend && <small className={`${trendColor} fw-semibold`} style={{fontSize: '12px'}}>{trend}</small>}
            {subtext && <small className={`text-muted ${subtextColor}`} style={{fontSize: '12px'}}>{subtext}</small>}
        </Card.Body>
    </Card>
);

export default DashBoard;