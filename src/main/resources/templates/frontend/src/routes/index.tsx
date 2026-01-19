import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashBoard from "../pages/DashBoard";
import ProductPage from "../pages/Product/ProductPage";
import AdminLayout from "../layout/AdminLayout";
import CategoryPage from "../pages/Category";
import CreateProduct from "../pages/Product/CreateProduct";

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
        element: (<AdminLayout />),
        children: [
            {
                path: "dashboard",
                element: <DashBoard />
            },
            {
                path: "products",
                children: [
                    {
                        index: true,
                        element: <ProductPage />,
                    },
                    {
                        path: "add",
                        element: <CreateProduct/>,
                    }
                ],
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        element: <CategoryPage />,
                    }
                ],
            },
        ]
    }
]);

export default router;