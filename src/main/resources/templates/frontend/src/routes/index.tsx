import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashBoard from "../pages/DashBoard";
import ProductPage from "../pages/Product/ProductPage"
import AdminLayout from "../layout/AdminLayout";
import CategoryPage from "../pages/Category/Category";
import CreateProduct from "../pages/Product/CreateProduct";
import CreatCategory from "../pages/Category/CreateCategory";
import EditCategory from "../pages/Category/EditCategory";
import EditProduct from "../pages/Product/EditProduct";
import POS from "../pages/POS";

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
                path: "pos",
                element: <POS />
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
                    }, 
                    {
                        path: "edit/:id",
                        element: <EditProduct/>
                    }
                ],
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        element: <CategoryPage />,
                    },
                    {
                        path: 'add',
                        element: <CreatCategory/>,
                    }, 
                    {
                        path: 'edit/:id',
                        element: <EditCategory/>
                    }
                ],
            },
        ]
    }
]);

export default router;