import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../components/pages/MainPage/Homepage";
import { MainLayout } from "../styles/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            }
        ]
    }
]);

export default router;


