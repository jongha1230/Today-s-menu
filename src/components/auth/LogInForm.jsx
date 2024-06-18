import React from 'react';
import AuthButton from './AuthButton';

const LogInForm = () => {
  const InputStyle = 'w-full p-1 outline outline-offset-2 outline-gray-400 rounded-md';
  return (
    <>
      <div className="w-96 p-10 flex flex-col gap-6 place-items-center">
        <div className="text-3xl mb-5">Log In</div>
        <input type="text" placeholder="아이디를 입력해주세요." className={InputStyle} />
        <input type="password" placeholder="비밀번호를 입력해주세요." className={InputStyle} />
        <AuthButton>로그인</AuthButton>
      </div>
    </>
  );
};

export default LogInForm;
