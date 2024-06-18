import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/common/Header';

const MainLayout = () => {
const MainLayout = () => {
  return (
    <>
      <Header />
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
      {/* <Footer /> */}
    </>
  );
};
};

export default MainLayout;
