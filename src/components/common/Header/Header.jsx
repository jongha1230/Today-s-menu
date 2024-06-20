import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import logo55 from '../../../assets/images/logo55.png';
import photo from '../../../assets/images/photo.png';
import useUserStore from '../../../store/useUserStore';

const Header = () => {
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    api.auth.SignOut(); // 로그아웃 기능 추가
    setUser(null);
    toast.success('로그아웃 되었습니다.');
  };

  return (
    <div className="fixed top-0 w-full z-50  bg-theme-color">
      <header className="flex items-center justify-between p-5">
        <Link to="/" className="flex items-center text-3xl sm:text-xl font-extrabold text-black">
          <img src={photo} alt="logo" className="h-12" />
          <img src={logo55} alt="logo" className="h-6" />
        </Link>

        <div className="flex items-center space-x-4">
          <span> {user ? `안녕하세요, ${user.nickname}님` : '로그인이 필요합니다'} </span>
          <Link
            to="/mypage"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
          >
            마이페이지
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
            >
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
