import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    PencilSquare,
    Trash,
    ChevronLeft,
    ChevronRight,
    ExclamationTriangleFill, // Icon cho lỗi
    ArrowRepeat // Icon nút reload
} from 'react-bootstrap-icons';
import type { ProductItem } from '../../interface/productInterface';
import { getAllProducts } from '../../api/products';

const ProductTable = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Gọi API
            const result = await getAllProducts();

            if (Array.isArray(result)) {
                setProducts(result);
            } else if (result && typeof result === 'object' && Array.isArray((result as any).data)) {
                setProducts((result as any).data);
            } else {
                setProducts([]);
            }
            // --------------------------

        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'Không thể kết nối đến máy chủ');
            setProducts([]);
        } finally {
            ;
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Helper format
    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { text: 'Hết hàng', color: 'text-danger', bg: 'bg-danger' };
        if (stock < 20) return { text: 'Sắp hết hàng', color: 'text-warning', bg: 'bg-warning' };
        return { text: 'Còn hàng', color: 'text-success', bg: 'bg-success' };
    };

    const getCategoryClass = (category: string) => {
        const map: { [key: string]: string } = {
            'Đồ uống': 'bg-primary-subtle text-primary',
            'Thực phẩm khô': 'bg-warning-subtle text-warning-emphasis',
            'Hóa mỹ phẩm': 'bg-info-subtle text-info-emphasis',
            'Rau củ quả': 'bg-success-subtle text-success',
        };
        return map[category] || 'bg-secondary-subtle text-secondary';
    };

    const TableSkeleton = () => (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="placeholder-glow">
                    <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                            <span className="placeholder col-2 rounded-3 me-3" style={{ height: '48px', width: '48px' }}></span>
                            <div className="w-50">
                                <span className="placeholder col-12 mb-1"></span>
                                <span className="placeholder col-8"></span>
                            </div>
                        </div>
                    </td>
                    <td className="py-3"><span className="placeholder col-8 rounded-pill py-3"></span></td>
                    <td className="py-3"><span className="placeholder col-4"></span></td>
                    <td className="py-3"><span className="placeholder col-4"></span></td>
                    <td className="py-3"><span className="placeholder col-6"></span></td>
                    <td className="py-3 text-end pe-4"><span className="placeholder col-4"></span></td>
                </tr>
            ))}
        </>
    );

    return (
        <div className="container font-inter">
            {/* --- HEADER --- */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-1">Quản lý Sản phẩm</h2>
                <button className="btn btn-custom-purple text-white d-flex align-items-center gap-2">
                    <Plus size={20} /> Thêm sản phẩm mới
                </button>
            </div>

            {/* --- FILTER BAR --- */}
            <div className="bg-white p-3 rounded-4 shadow-sm mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <Search className="text-muted" />
                            </span>
                            <input type="text" className="form-control border-start-0 ps-0" placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                    {/* ... (Giữ nguyên phần filter dropdown) ... */}
                    <div className="col-md-8 d-flex gap-3 justify-content-md-end flex-wrap">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button"><Filter /> Tất cả Danh mục</button>
                        </div>
                        <div className="dropdown"><button className="btn btn-light dropdown-toggle" type="button">Trạng thái kho</button></div>
                        <div className="dropdown"><button className="btn btn-light dropdown-toggle" type="button">Sắp xếp</button></div>
                    </div>
                </div>
            </div>

            {/* --- TABLE CONTAINER --- */}
            <div className="bg-white rounded-4 shadow-sm overflow-hidden" style={{ minHeight: '400px' }}>

                {/* 1. TRƯỜNG HỢP LỖI (ERROR STATE) */}
                {error && !loading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center py-5 h-100">
                        <div className="bg-danger bg-opacity-10 p-4 rounded-circle mb-3">
                            <ExclamationTriangleFill className="text-danger" size={40} />
                        </div>
                        <h5 className="text-danger fw-bold">Đã xảy ra lỗi</h5>
                        <p className="text-muted mb-4 text-center" style={{ maxWidth: '400px' }}>
                            {error}. Vui lòng kiểm tra kết nối mạng hoặc phiên đăng nhập.
                        </p>
                        <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={fetchProducts}>
                            <ArrowRepeat size={18} /> Thử lại
                        </button>
                    </div>
                ) : (
                    /* 2. TRƯỜNG HỢP CÓ DỮ LIỆU HOẶC ĐANG LOAD */
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light text-uppercase text-muted small">
                                    <tr>
                                        <th className="py-3 ps-4">Sản phẩm</th>
                                        <th className="py-3">Danh mục</th>
                                        <th className="py-3">Giá bán</th>
                                        <th className="py-3">Tồn kho</th>
                                        <th className="py-3">Trạng thái</th>
                                        <th className="py-3 text-end pe-4">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableSkeleton />
                                    ) : products.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-5 text-muted">
                                                <div className="py-4">Chưa có sản phẩm nào trong kho</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((item) => {
                                            const status = getStockStatus(item.stock);
                                            return (
                                                <tr key={item.id} className="border-bottom">
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="rounded-3 me-3 bg-light d-flex align-items-center justify-content-center border"
                                                                style={{ width: '48px', height: '48px', minWidth: '48px' }}>
                                                                <span className="text-muted fw-bold">{item.name.charAt(0)}</span>
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold text-dark">{item.name}</div>
                                                                <div className="text-muted small">ID: {item.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span className={`badge rounded-pill fw-normal px-3 py-2 ${getCategoryClass(item.category?.name || "")}`}>
                                                        {item.category?.name || "Chưa phân loại"}
                                                    </span></td>
                                                    <td className="fw-bold">{formatPrice(item.price)}</td>
                                                    <td>{item.stock} <span className="text-muted small">{item.unit}</span></td>
                                                    <td>
                                                        <div className={`d-flex align-items-center gap-2 fw-bold ${status.color}`}>
                                                            <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: 'currentColor' }}></span>
                                                            <span className="small">{status.text}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-end pe-4">
                                                        <button className="btn btn-link text-muted p-1 hover-purple"><PencilSquare size={18} /></button>
                                                        <button className="btn btn-link text-muted p-1 hover-danger"><Trash size={18} /></button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination (Chỉ hiện khi có dữ liệu) */}
                        {!loading && products.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center p-4 border-top">
                                <div className="text-muted small">Hiển thị <strong>{products.length}</strong> sản phẩm</div>
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className="page-item disabled"><button className="page-link border-0 bg-transparent"><ChevronLeft /></button></li>
                                        <li className="page-item active"><button className="page-link bg-custom-purple border-0">1</button></li>
                                        <li className="page-item"><button className="page-link border-0 bg-transparent text-dark"><ChevronRight /></button></li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductTable;