import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useUserStore from '../../store/useUserStore';
import AuthButton from './AuthButton';

const LogInForm = () => {
  const { user, setUser } = useUserStore();
  const [logIn, setLogIn] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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

    await api.auth.SignIn(logIn);

    const userInfo = await api.auth.GetUser();
    console.log(userInfo);
    setUser(userInfo);

    setLogIn({ email: '', password: '' });
    alert('로그인 되었습니다!');
    navigate('/');
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
        <Link
          to={'/signUp'}
          className="w-8/12 p-2 outline outline-1 outline-gray-400 rounded-xl text-center bg-default-color hover:scale-110 ease-in duration-300 cursor-pointer shadow-md shadow-gray-300"
        >
          회원가입
        </Link>
      </form>
    </>
  );
};

export default LogInForm;
