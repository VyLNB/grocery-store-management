import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashBoard from "../pages/DashBoard";
import ProductPage from "../pages/Product/ProductPage";
import AdminLayout from "../layout/AdminLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/admin",
        element: (<AdminLayout/>),
        children: [
            {
                path: "dashboard",
                element: <DashBoard/>
            },
            {
                path: "products",
                element: <ProductPage/>
            }
        ]
    }
]);

export default router;