import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    // {
    //     path: "/register",
    //     element: <RegisterPage />,
    // }
]);

export default router;