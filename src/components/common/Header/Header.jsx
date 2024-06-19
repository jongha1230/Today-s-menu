import React from 'react';
import useUserStore from '../../../store/useUserStore';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-theme-color">
      <header className="flex items-center justify-between p-5">
        <h1 className="text-xl font-medium"> 오늘 뭐먹지? </h1>
        <div className="flex items-center space-x-4">
          <span> {user ? `안녕하세요, ${user.nickname}님` : '로그인이 필요합니다'} </span>
          <span className="cursor-pointer"> 마이페이지 </span>
          {user ? (
            <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded">
              {' '}
              로그아웃{' '}
            </button>
          ) : (
            <Link to="/login" className="bg-black text-white px-4 py-2 rounded">
              {' '}
              로그인{' '}
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
