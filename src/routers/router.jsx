import { createBrowserRouter } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import RecipeDetail from '../pages/RecipeDetail';
import { MainLayout } from '../styles/MainLayout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/recipe',
        element: <RecipeDetail />
      }
    ]
  }
]);

export default router;
