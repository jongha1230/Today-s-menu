import { RouterProvider } from 'react-router-dom';
import router from './routers/router';
import useUserStore from './store/useUserStore';
import { useEffect } from 'react';
import supabase from './api/supabaseAPI';

function App() {
  const { setUser } = useUserStore();
  // 로그인 상태 이벤트 리스너
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // 로그아웃시 상태 초기화
        setUser(null);
      }
    });

    return () => {
      authListener.data?.subscription?.unsubscribe();
    };
  }, [setUser]);
  return <RouterProvider router={router} />;
}

export default App;
