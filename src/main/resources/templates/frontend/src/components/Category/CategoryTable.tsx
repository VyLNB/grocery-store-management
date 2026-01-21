import { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    PencilSquare,
    Trash,
    ChevronLeft,
    ChevronRight,
    ExclamationTriangleFill,
    ArrowRepeat
} from 'react-bootstrap-icons';
import type { CategoryItem } from '../../interface/productInterface';
import { getAllCategories, deleteCategory } from '../../api/category';
import { useNavigate } from 'react-router-dom';

const CategoryTable = () => {
    const [products, setProducts] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getAllCategories();

            if (Array.isArray(result)) {
                setProducts(result);
            } else if (result && typeof result === 'object' && Array.isArray((result as any).data)) {
                setProducts((result as any).data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError(error instanceof Error ? error.message : 'Không thể kết nối đến máy chủ');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        // Hỏi xác nhận trước khi xóa
        if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.')) {
            return;
        }

        try {
            // Gọi API xóa
            await deleteCategory(id);

            // Cập nhật giao diện: Lọc bỏ item vừa xóa khỏi danh sách hiện tại
            // Cách này giúp giao diện cập nhật ngay lập tức mà không cần load lại trang
            setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));

            alert('Đã xóa danh mục thành công!');
        } catch (error: any) {
            console.error('Lỗi khi xóa:', error);
            // Hiển thị thông báo lỗi từ Backend nếu có
            alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa danh mục.');
        }
    };

    // --- 1. HÀM RENDER TRẠNG THÁI (MỚI) ---
    const renderStatus = (isActive: boolean) => {
        if (isActive) {
            return (
                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                    <span className="d-inline-block bg-success rounded-circle me-1" style={{ width: '6px', height: '6px', marginBottom: '1px' }}></span>
                    Hoạt động
                </span>
            );
        }
        return (
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill">
                <span className="d-inline-block bg-danger rounded-circle me-1" style={{ width: '6px', height: '6px', marginBottom: '1px' }}></span>
                Ngừng hoạt động
            </span>
        );
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
                    <td className="py-3"><span className="placeholder col-4 rounded-pill py-3"></span></td>
                    <td className="py-3 text-end pe-4"><span className="placeholder col-2 rounded-circle py-3 me-2"></span><span className="placeholder col-2 rounded-circle py-3"></span></td>
                </tr>
            ))}
        </>
    );

    return (
        <div className="container font-inter">
            {/*HEADER*/}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-1">Quản lý Danh mục</h2>
                <button className="btn btn-primary text-white d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => { navigate('/admin/categories/add') }}>
                    <Plus size={20} /> Thêm danh mục mới
                </button>
            </div>

            {/*FILTER BAR*/}
            <div className="bg-white p-3 rounded-4 shadow-sm mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <Search className="text-muted" />
                            </span>
                            <input type="text" className="form-control border-start-0 ps-0" placeholder="Tìm kiếm danh mục..." />
                        </div>
                    </div>
                    <div className="col-md-8 d-flex gap-3 justify-content-md-end flex-wrap">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button"><Filter /> Trạng thái</button>
                        </div>
                        <div className="dropdown"><button className="btn btn-light dropdown-toggle" type="button">Sắp xếp</button></div>
                    </div>
                </div>
            </div>

            {/*TABLE CONTAINER*/}
            <div className="bg-white rounded-4 shadow-sm overflow-hidden" style={{ minHeight: '400px' }}>
                {error && !loading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center py-5 h-100">
                        <div className="bg-danger bg-opacity-10 p-4 rounded-circle mb-3">
                            <ExclamationTriangleFill className="text-danger" size={40} />
                        </div>
                        <h5 className="text-danger fw-bold">Đã xảy ra lỗi</h5>
                        <p className="text-muted mb-4 text-center" style={{ maxWidth: '400px' }}>
                            {error}. Vui lòng kiểm tra kết nối mạng.
                        </p>
                        <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={fetchProducts}>
                            <ArrowRepeat size={18} /> Thử lại
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light text-uppercase text-muted small">
                                    <tr>
                                        <th className="py-3 ps-4" style={{ width: '40%' }}>Tên danh mục</th>
                                        <th className="py-3" style={{ width: '30%' }}>Trạng thái</th>
                                        <th className="py-3 text-end pe-4" style={{ width: '30%' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <TableSkeleton />
                                    ) : products.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="text-center py-5 text-muted">
                                                <div className="py-4">Chưa có danh mục nào</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((item) => (
                                            <tr key={item.id} className="border-bottom">
                                                {/* Cột 1: Thông tin danh mục */}
                                                <td className="ps-4 py-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="rounded-3 me-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center border border-primary-subtle"
                                                            style={{ width: '48px', height: '48px', minWidth: '48px' }}>
                                                            <span className="fw-bold fs-5">{item.name.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold text-dark">{item.name}</div>
                                                            {/* Hiển thị ID nhỏ bên dưới */}
                                                            <div className="text-muted small" style={{ fontSize: '0.8rem' }}>ID: #{item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Cột 2: Trạng thái (Đã thêm mới) */}
                                                <td className="py-3">
                                                    {renderStatus(item.isActive)}
                                                </td>

                                                {/* Cột 3: Thao tác (Đã làm đẹp) */}
                                                <td className="text-end pe-4">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        {/* Nút Sửa */}
                                                        <button
                                                            className="btn btn-light text-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                            style={{ width: '32px', height: '32px' }}
                                                            title="Chỉnh sửa"
                                                            onClick={() => navigate(`/admin/categories/edit/${item.id}`)} // Thêm hàm xử lý sau
                                                        >
                                                            <PencilSquare size={16} />
                                                        </button>

                                                        {/* Nút Xóa */}
                                                        <button
                                                            className="btn btn-light text-danger btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                            style={{ width: '32px', height: '32px' }}
                                                            title="Xóa"
                                                            onClick={() => item.id !== undefined && handleDelete(item.id)} // Thêm hàm xử lý sau
                                                        >
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination giữ nguyên */}
                        {!loading && products.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center p-4 border-top">
                                <div className="text-muted small">Hiển thị <strong>{products.length}</strong> danh mục</div>
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className="page-item disabled"><button className="page-link border-0 bg-transparent"><ChevronLeft /></button></li>
                                        <li className="page-item active"><button className="page-link bg-primary border-0">1</button></li>
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

export default CategoryTable;