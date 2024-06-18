import React from 'react';
import AuthButton from './AuthButton';
import { useState } from 'react';
import api from '../../api/api';

const LogInForm = () => {
  const [logIn, setLogIn] = useState({ email: '', password: '' });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLogIn({ ...logIn, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!logIn.email.trim()) {
      alert('이메일을 입력해주세요 !');
      return;
    }
    if (!logIn.password.trim()) {
      alert('비밀번호를 입력해주세요 !');
      return;
    }

    const { user } = await api.auth.SignIn(logIn);
    console.log(user.id, user.email);
  };

  const InputStyle = 'w-full p-1 outline outline-offset-2 outline-gray-400 rounded-md';
  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-96 p-10 flex flex-col gap-6 place-items-center">
        <div className="text-3xl mb-5">Log In</div>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          name="email"
          value={logIn.email}
          onChange={onChangeHandler}
          className={InputStyle}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={logIn.password}
          onChange={onChangeHandler}
          className={InputStyle}
          required
        />
        <AuthButton>로그인</AuthButton>
      </form>
    </>
  );
};

export default LogInForm;
