import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header/Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
