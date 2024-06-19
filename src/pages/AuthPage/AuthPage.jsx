import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Outlet />
    </div>
  );
};

export default AuthPage;
