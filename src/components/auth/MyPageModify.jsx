import React from 'react';
import AuthInput from './AuthInput';
import useUserStore from '../../store/useUserStore';
import AuthButton from './AuthButton';

const MyPageModify = () => {
  const { user, setUser } = useUserStore();
  return (
    <form className="w-2/5 min-w-max h-full pb-12 px-24 flex flex-col gap-5 items-center border-solid border-4 border-default-color rounded-3xl shadow-md ">
      <div className="relative w-44 h-44 m-8 p-1 rounded-full overflow-hidden cursor-pointer">
        <img src="/src/assets/images/icons8-사람-100.png" alt="" className="w-44 object-cover" />
      </div>
      <label className="absolute w-11 h-11 rounded-full flex justify-center items-center ml-28 mt-40 border border-black border-solid bg-black hover:bg-white text-white hover:text-black cursor-pointer">
        +
      </label>
      <div className="w-full mb-8 flex flex-col gap-5">
        <div className="w-3/12 min-12 h-auto text-lg pr-8 border-r-2 border-solid border-gray-400">Name</div>
        <AuthInput placeholder="닉네임" name="nickname" value={user.nickname} handler={() => {}} required={false} />
        <div className="pl-2 text-slate-600">Q. 어떤 알러지가 있으신가요 ?</div>
        <AuthInput placeholder="닉네임" name="nickname" value={user.nickname} handler={() => {}} required={false} />
        <div className=" pl-2 text-slate-600">Q. 선호하는 음식은 무엇인가요 ?</div>
        <AuthInput placeholder="닉네임" name="nickname" value={user.nickname} handler={() => {}} required={false} />
      </div>

      <AuthButton>프로필 수정</AuthButton>
    </form>
  );
};

export default MyPageModify;
