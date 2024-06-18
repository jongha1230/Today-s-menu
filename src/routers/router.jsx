import { createBrowserRouter } from 'react-router-dom';
import CommitRecipe from '../components/pages/CommitRecipe/CommitRecipe';

const router = createBrowserRouter([
  {
    path: '/CommitRecipe',
    element: <CommitRecipe />
  }
]);

export default router;
