import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

const AuthPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="grid h-screen place-items-center">
      <Outlet />
    </div>
  );
};

export default AuthPage;
