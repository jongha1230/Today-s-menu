import { createBrowserRouter } from 'react-router-dom';
import LogInForm from '../components/auth/LogInForm';
import SignUpForm from '../components/auth/SignUpForm';
import AuthPage from '../pages/AuthPage';
import MainPage from '../pages/MainPage';
import RecipeDetail from '../pages/RecipeDetail';
import MainLayout from '../styles/MainLayout/MainLayout';
import MyPage from '../pages/MyPage/MyPage';
import MyPageForm from '../components/auth/MyPageForm';
import MyPageModify from '../components/auth/MyPageModify';
import CommitRecipe from '../pages/CommitRecipe/CommitRecipe';

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
        path: '/recipes',
        element: <RecipeDetail />
      },
      { path: '/recipe', element: <CommitRecipe /> },
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
