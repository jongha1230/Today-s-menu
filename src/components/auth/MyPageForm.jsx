import React, { useEffect } from 'react';
import { IoIosMail } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/memoticon.png';
import useUserStore from '../../store/useUserStore';

const MyPageForm = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="w-8/12 h-full p-5 flex flex-col gap-6 justify-center">
      <div
        to={'/modify'}
        className="w-full min-w-96 h-56 p-8 mb-10 flex flex-row items-center justify-center gap-10 border-solid border-4 border-default-color rounded-3xl shadow-md"
      >
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img
            src={user?.profile_picture_url ? user.profile_picture_url : defaultProfileImage}
            className="w-44 h-full object-cover"
          />
        </div>
        <div className="w-8/12 h-full flex flex-col">
          <div className="w-full h-2/5 pl-10 pb-2 flex flex-row items-center justify-between text-2xl font-semibold border-solid border-b border-black">
            {user?.nickname ? user.nickname : 'Nickname'}
            <Link to={'/modify'} className="mr-10 text-sm font-normal hover:underline">{`수정하기 >`}</Link>
          </div>
          <div className="pt-3 pl-8 mt-5 flex flex-row text-sm font-normal max-[1000px]:hidden">
            <IoIosMail className="text-lg pt-1 mr-1" />
            {user?.email ? user.email : 'Email'}
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-11/12 p-6 text-2xl border-b border-black">내가 올린 레시피</div>
        {/* 레시피 리스트 */}
      </div>
    </div>
  );
};

export default MyPageForm;
