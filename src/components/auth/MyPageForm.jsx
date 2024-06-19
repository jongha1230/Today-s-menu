import React from 'react';
import useUserStore from '../../store/useUserStore';
import { IoIosMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const MyPageForm = () => {
  const { user, setUser } = useUserStore();
  return (
    <div className="w-8/12 h-full p-5 flex flex-col gap-6 justify-center">
      <Link
        to={'/modify'}
        className="w-full min-w-96 h-56 p-8 mb-10 flex flex-row items-center justify-center gap-10 border-solid border-4 border-default-color rounded-3xl shadow-md hover:scale-105 ease-in duration-300 cursor-pointer"
      >
        <div className="w-40 h-40 rounded-full">
          <img src="/src/assets/images/memoticon.png" />
        </div>
        <div className="w-8/12 h-full flex flex-col items-center">
          <div className="w-full h-2/5 pl-10 flex flex-row items-center justify-between text-2xl font-semibold border-solid border-b border-black">
            {user.nickname ? user.nickname : 'Nickname'}
            <div className="pt-3 pr-5 flex flex-row text-sm font-normal max-[1000px]:hidden">
              <IoIosMail className="text-lg pt-0.5 mr-1" />
              {user.email ? user.email : 'Email'}
            </div>
          </div>
          <div className="w-full h-3/5 p-7 flex flex-col justify-center gap-1">
            <div>알레르기 :</div>
            <div>선호하는 음식 :</div>
          </div>
        </div>
      </Link>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-11/12 p-6 text-2xl border-b border-black">내가 올린 레시피</div>
      </div>
    </div>
  );
};

export default MyPageForm;
