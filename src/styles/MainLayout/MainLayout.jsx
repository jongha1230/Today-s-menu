import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/common/Header';

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
