import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../styles/MainLayout";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      }
    ]
  }
]);

export default router;


