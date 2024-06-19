import React from 'react';
import { Outlet } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="h-full pb-16 flex flex-col place-items-center">
      <div className="text-3xl my-16 ">My Page</div>
      <Outlet />
    </div>
  );
};

export default MyPage;
