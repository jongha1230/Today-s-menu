import React, { useState } from 'react';
import AuthButton from './AuthButton';
import api from '../../api/api';

const SignUpForm = () => {
  const [values, setValues] = useState({ email: '', password: '', nickname: '' });
  const [confirmPw, setConfirmPw] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    api.auth.SignUp(values);
    setValues({ email: '', password: '', nickname: '' });
  };

  const InputStyle = 'w-full p-1 outline outline-offset-2 outline-gray-400 rounded-md';
  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-96 p-10 flex flex-col gap-6 place-items-center">
        <div className="text-3xl mb-5">Sign Up</div>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          name="nickname"
          value={values.nickname}
          onChange={onChangeHandler}
          className={InputStyle}
          required
        />
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          name="email"
          value={values.email}
          onChange={onChangeHandler}
          className={InputStyle}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={values.password}
          onChange={onChangeHandler}
          className={InputStyle}
          required
        />
        <input type="password" placeholder="비밀번호를 다시 한번 더 입력해주세요." className={InputStyle} required />
        <AuthButton>회원가입하기</AuthButton>
      </form>
    </>
  );
};

export default SignUpForm;
