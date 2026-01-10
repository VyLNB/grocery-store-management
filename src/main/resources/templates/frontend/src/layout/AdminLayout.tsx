import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"; // Import Header mới tạo

export default function AdminLayout() {
  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      {/* Sidebar cố định */}
      <Sidebar />

      {/* Khu vực chính bên phải */}
      <div className="d-flex flex-column flex-grow-1 min-w-0">
        {/* Header cố định */}
        <Header />

        {/* Nội dung thay đổi (Scrollable) */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}