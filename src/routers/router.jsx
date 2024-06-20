import { createBrowserRouter } from 'react-router-dom';
import LogInForm from '../components/auth/LogInForm';
import MyPageForm from '../components/auth/MyPageForm';
import MyPageModify from '../components/auth/MyPageModify';
import SignUpForm from '../components/auth/SignUpForm';
import AuthPage from '../pages/AuthPage';
import CommitRecipe from '../pages/RecipePage/RecipePage';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage/MyPage';
import RecipeDetail from '../pages/RecipeDetail';
import MainLayout from '../styles/MainLayout/MainLayout';
import RecipePage from '../pages/RecipePage/RecipePage';
import RecipeForm from '../components/recipe/recipeForm';

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
        path: '/recipe/:recipeId',
        element: <RecipeDetail />
      },
      { path: '/', element: <RecipePage />, children: [{ path: '/recipe', element: <RecipeForm /> }] },
      {
        path: '/',
        element: <MyPage />,
        children: [
          { path: '/myPage', element: <MyPageForm /> },
          { path: '/modify', element: <MyPageModify /> }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <AuthPage />,
    children: [
      { path: '/logIn', element: <LogInForm /> },
      { path: '/signUp', element: <SignUpForm /> }
    ]
  }
]);

export default router;
