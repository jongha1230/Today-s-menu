import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useUserStore from '../../store/useUserStore';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

const LogInForm = () => {
  const { setUser } = useUserStore();
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

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-96 p-10 flex flex-col gap-6 place-items-center">
        <div className="text-3xl mb-5">Log In</div>
        <AuthInput
          type="text"
          placeholder="이메일을 입력해주세요."
          name="email"
          value={logIn.email}
          handler={onChangeHandler}
          required={true}
        />
        <AuthInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={logIn.password}
          handler={onChangeHandler}
          required={true}
        />
        <AuthButton>로그인</AuthButton>
        <Link to={'/signUp'} className="ml-56 text-sm font-normal hover:underline">
          {`회원가입 >`}
        </Link>
      </form>
    </>
  );
};

export default LogInForm;
