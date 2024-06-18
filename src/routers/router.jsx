import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MainLayout from '../styles/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      }
    ]
  }
]);

export default router;
