import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
