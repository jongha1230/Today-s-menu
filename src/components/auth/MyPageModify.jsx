import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import useUserStore from '../../store/useUserStore';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import { previewImage } from '../shared/utils/previewImage';

const MyPageModify = () => {
  const { user, setUser } = useUserStore();
  const [values, setValues] = useState({
    id: '',
    email: '',
    nickname: '',
    profile_picture_url: ''
  });

  useEffect(() => {
    setValues({
      ...user
    });
  }, [user]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log(value);
  };

  const onPreviewHandler = (event) => {
    const file = event.target.files[0];
    previewImage(file, (result) => {
      setValues({ ...values, profile_picture_url: result });
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(values);
    api.auth.UpdateUser(values);
    setUser(values);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-5/12 min-w-max h-full pb-12 px-24 flex flex-col gap-5 items-center border-solid border-4 border-default-color rounded-3xl shadow-md "
    >
      <div className="relative w-44 h-44 mt-16 mb-8 rounded-full overflow-hidden cursor-pointer">
        <img
          src={values.profile_picture_url ?? '/src/assets/images/icons8-사람-100.png'}
          alt=""
          className="w-44 h-full object-cover"
        />
      </div>
      <label
        htmlFor="profile"
        className="absolute w-11 h-11 rounded-full flex justify-center items-center ml-32 mt-48 border border-black border-solid bg-black hover:bg-white text-white hover:text-black cursor-pointer"
      >
        +
      </label>
      <input type="file" id="profile" name="profile" accept=".png, .jpeg, .jpg" onChange={onPreviewHandler} hidden />
      <div className="w-full mb-8 flex flex-col gap-5">
        <div className="w-3/12 min-12 h-auto text-xl pl-2"> Name ✍🏻</div>
        <AuthInput
          placeholder="닉네임"
          name="nickname"
          value={values.nickname}
          handler={onChangeHandler}
          required={true}
        />
      </div>

      <AuthButton>프로필 수정</AuthButton>
    </form>
  );
};

export default MyPageModify;
