import React from 'react';

const Header = () => {
  return (
    <div className="bg-blue-50">
      <header className="flex items-center justify-between p-5">
        <h1 className="text-xl font-medium"> 오늘 뭐먹지? </h1>
        <div className="flex items-center space-x-4">
          <span> 사용자 님 </span>
          <span className="cursor-pointer"> 마이페이지 </span>
          <a href="#" className="bg-black text-white px-4 py-2 rounded">
            {' '}
            로그인{' '}
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
