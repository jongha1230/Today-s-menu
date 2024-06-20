import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import useUserStore from '../../store/useUserStore';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import { previewImage } from '../shared/utils/previewImage';
import { useNavigate } from 'react-router-dom';

const MyPageModify = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
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

  const onDeleteHandler = () => {
    confirm('프로필 사진을 삭제하시겠습니까 ?');
    setValues({ ...values, profile_picture_url: null });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    api.auth.UpdateUser(values);
    setUser(values);
    navigate('/myPage');
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-5/12 min-w-max h-full pb-12 px-24 flex flex-col gap-5 items-center border-solid border-4 border-default-color rounded-3xl shadow-md "
    >
      <div
        onClick={onDeleteHandler}
        className="relative w-44 h-44 mt-16 mb-8 rounded-full overflow-hidden cursor-pointer hover:scale-105 ease-in duration-300"
      >
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
          type="text"
          placeholder="수정할 닉네임을 입력해주세요."
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
