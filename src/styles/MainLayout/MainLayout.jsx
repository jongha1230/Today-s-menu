import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/common/Footer/Footer';
import Header from '../../components/common/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
