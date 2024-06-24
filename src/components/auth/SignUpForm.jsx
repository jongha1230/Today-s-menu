import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';

const SignUpForm = () => {
  const [values, setValues] = useState({ email: '', password: '', nickname: '' });
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!values.nickname.trim()) {
      toast.error('닉네임을 입력해주세요 !');
      return;
    }
    if (!values.email.trim()) {
      toast.error('이메일을 입력해주세요 !');
      return;
    }
    if (!values.password.trim()) {
      toast.error('비밀번호을 입력해주세요 !');
      return;
    }
    if (values.password.length < 6) {
      toast.error('비밀번호는 6자 이상 입력해주세요.');
      return;
    }
    if (!confirmPw) {
      toast.error('비밀번호를 확인해주세요.');
      return;
    }
    if (values.password !== confirmPw) {
      toast.error('비밀번호가 다릅니다.');
      return;
    }

    try {
      await api.auth.SignUp(values);
      setValues({ email: '', password: '', nickname: '' });
      setConfirmPw('');
      toast.success('회원가입 되었습니다.');
      navigate('/login');
    } catch (error) {
      throw new Error(`회원가입 실패 : ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-96 p-10 flex flex-col gap-6 place-items-center">
        <div className="text-3xl mb-5">Sign Up</div>
        <AuthInput
          type="text"
          placeholder="닉네임을 입력해주세요."
          name="nickname"
          value={values.nickname}
          handler={onChangeHandler}
          required={true}
        />
        <AuthInput
          type="text"
          placeholder="아이디를 입력해주세요."
          name="email"
          value={values.email}
          handler={onChangeHandler}
          required={true}
        />
        <AuthInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={values.password}
          handler={onChangeHandler}
          required={true}
        />
        <AuthInput
          type="password"
          placeholder="비밀번호를 다시 한번 더 입력해주세요."
          name="confirmPw"
          value={confirmPw}
          handler={(e) => {
            setConfirmPw(e.target.value);
          }}
          required={true}
        />
        <AuthButton>회원가입하기</AuthButton>
        <Link to={'/logIn'} className="ml-56 text-sm font-normal hover:underline">
          {`로그인 >`}
        </Link>
      </form>
    </>
  );
};

export default SignUpForm;
