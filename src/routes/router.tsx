import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/books",
                element: <AllBooks />
            },
            {
                path: '/borrow-summary',
                element: <BorrowSummary />
            }
        ]
    }
])

export default router