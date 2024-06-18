import { createBrowserRouter } from 'react-router-dom';
import RecipeDetail from '../pages/RecipeDetail';

const router = createBrowserRouter([
  {
    // path: '/recipe-detail',
    path: '/',
    element: <RecipeDetail />
  }
]);

export default router;
