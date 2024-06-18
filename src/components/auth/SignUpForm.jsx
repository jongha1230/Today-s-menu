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

    if (!values.nickname.trim()) {
      alert('닉네임을 입력해주세요 !');
      return;
    }
    if (!values.email.trim()) {
      alert('이메일을 입력해주세요 !');
      return;
    }
    if (!values.password.trim()) {
      alert('비밀번호를 입력해주세요 !');
      return;
    }
    if (values.password.length < 6) {
      alert('비밀번호는 6자 이상 입력해주세요.');
      return;
    }
    if (!confirmPw) {
      alert('비밀번호를 확인해주세요.');
      return;
    }
    if (values.password !== confirmPw) {
      alert('비밀번호가 다릅니다.');
      return;
    }

    api.auth.SignUp(values);
    setValues({ email: '', password: '', nickname: '' });
    setConfirmPw('');
    alert('회원가입 되었습니다.');
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
        <input
          type="password"
          placeholder="비밀번호를 다시 한번 더 입력해주세요."
          value={confirmPw}
          onChange={(e) => {
            setConfirmPw(e.target.value);
          }}
          className={InputStyle}
          required
        />
        <AuthButton>회원가입하기</AuthButton>
      </form>
    </>
  );
};

export default SignUpForm;
