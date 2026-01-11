import {
    Search,
    Filter,
    Download,
    Plus,
    PencilSquare,
    Trash,
    ChevronLeft,
    ChevronRight
} from 'react-bootstrap-icons'

const ProductTable = () => {
    // Dữ liệu giả lập giống trong hình
    const products = [
        {
            id: 1,
            name: 'Sữa tươi TH True Milk',
            sku: 'TH-12345',
            category: 'Đồ uống',
            categoryClass: 'bg-primary-subtle text-primary',
            price: '32.000đ',
            stock: 124,
            unit: 'thùng',
            status: 'Còn hàng',
            statusColor: 'text-success',
            image: 'https://placehold.co/50x50/e9ecef/6c757d?text=TH'
        },
        {
            id: 2,
            name: 'Mì Hảo Hảo Tôm Chua Cay',
            sku: 'HH-9876',
            category: 'Thực phẩm khô',
            categoryClass: 'bg-warning-subtle text-warning-emphasis',
            price: '4.500đ',
            stock: 15,
            unit: 'gói',
            status: 'Sắp hết hàng',
            statusColor: 'text-warning',
            image: 'https://placehold.co/50x50/e9ecef/6c757d?text=HH'
        },
        {
            id: 3,
            name: 'Nước giặt OMO Matic 2kg',
            sku: 'OM-1122',
            category: 'Hóa mỹ phẩm',
            categoryClass: 'bg-purple-subtle text-purple', // Custom class
            price: '185.000đ',
            stock: 0,
            unit: 'túi',
            status: 'Hết hàng',
            statusColor: 'text-danger',
            image: 'https://placehold.co/50x50/e9ecef/6c757d?text=OMO'
        },
        {
            id: 4,
            name: 'Nước khoáng Lavie 500ml',
            sku: 'LV-4433',
            category: 'Đồ uống',
            categoryClass: 'bg-primary-subtle text-primary',
            price: '6.000đ',
            stock: 450,
            unit: 'chai',
            status: 'Còn hàng',
            statusColor: 'text-success',
            image: 'https://placehold.co/50x50/e9ecef/6c757d?text=La'
        },
    ];
    return (
        <div className="container font-inter">
            {/* --- HEADER --- */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Quản lý Sản phẩm</h2>
                </div>
                <div className="d-flex gap-2">
                    {/* <button className="btn btn-outline-dark d-flex align-items-center gap-2">
                        <Download /> Xuất báo cáo
                    </button> */}
                    <button className="btn btn-custom-purple text-white d-flex align-items-center gap-2">
                        <Plus size={20} /> Thêm sản phẩm mới
                    </button>
                </div>
            </div>

            {/* --- FILTER BAR --- */}
            <div className="bg-white p-3 rounded-4 shadow-sm mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <Search className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Tìm kiếm theo tên sản phẩm, mã SKU..."
                            />
                        </div>
                    </div>
                    <div className="col-md-8 d-flex gap-3 justify-content-md-end flex-wrap">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button">
                                <Filter /> Tất cả Danh mục
                            </button>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button">
                                Trạng thái kho
                            </button>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button">
                                Sắp xếp
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TABLE LIST --- */}
            <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-uppercase text-muted small">
                            <tr>
                                <th scope="col" className="py-3 ps-4">Sản phẩm</th>
                                <th scope="col" className="py-3">Danh mục</th>
                                <th scope="col" className="py-3">Giá bán</th>
                                <th scope="col" className="py-3">Tồn kho</th>
                                <th scope="col" className="py-3">Trạng thái</th>
                                <th scope="col" className="py-3 text-end pe-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id} className="border-bottom">
                                    {/* Cột Sản Phẩm */}
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="rounded-3 me-3"
                                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div className="fw-bold text-dark">{item.name}</div>
                                                <div className="text-muted small">Mã: {item.sku}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Cột Danh Mục */}
                                    <td>
                                        <span className={`badge rounded-pill fw-normal px-3 py-2 ${item.categoryClass}`}>
                                            {item.category}
                                        </span>
                                    </td>

                                    {/* Cột Giá */}
                                    <td className="fw-bold">{item.price}</td>

                                    {/* Cột Tồn Kho */}
                                    <td>
                                        {item.stock > 0 ? (
                                            <span>{item.stock} <span className="text-muted small">{item.unit}</span></span>
                                        ) : (
                                            <span className="text-danger fw-bold">0 <span className="text-muted small fw-normal">{item.unit}</span></span>
                                        )}
                                    </td>

                                    {/* Cột Trạng Thái */}
                                    <td>
                                        <div className={`d-flex align-items-center gap-2 fw-bold ${item.statusColor}`}>
                                            <span className="dot-indicator" style={{ backgroundColor: 'currentColor' }}></span>
                                            <span style={{ fontSize: '0.9rem' }}>{item.status}</span>
                                        </div>
                                    </td>

                                    {/* Cột Thao Tác */}
                                    <td className="text-end pe-4">
                                        <button className="btn btn-link text-muted p-1"><PencilSquare size={18} /></button>
                                        <button className="btn btn-link text-muted p-1"><Trash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- PAGINATION --- */}
                <div className="d-flex justify-content-between align-items-center p-4 border-top">
                    <div className="text-muted small">
                        Hiển thị <strong>1-4</strong> trong số <strong>156</strong> sản phẩm
                    </div>
                    <nav>
                        <ul className="pagination mb-0">
                            <li className="page-item disabled">
                                <button className="page-link border-0 bg-transparent"><ChevronLeft /></button>
                            </li>
                            <li className="page-item active"><button className="page-link bg-custom-purple border-0">1</button></li>
                            <li className="page-item"><button className="page-link border-0 text-dark">2</button></li>
                            <li className="page-item"><button className="page-link border-0 text-dark">3</button></li>
                            <li className="page-item">
                                <button className="page-link border-0 bg-transparent text-dark"><ChevronRight /></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default ProductTable;