import { createBrowserRouter } from 'react-router-dom';
import LogInForm from '../components/auth/LogInForm';
import SignUpForm from '../components/auth/SignUpForm';
import AuthPage from '../pages/AuthPage';
import MainPage from '../pages/MainPage';
import RecipeDetail from '../pages/RecipeDetail';
import MainLayout from '../styles/MainLayout/MainLayout';

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
