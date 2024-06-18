import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const RecipeForm = () => {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/200');
  const [title, setTitle] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
    if (file) {
      // 파일이 존재하면 실행됨 (파일을 선택하지 않은 경우 실행 x)
      const reader = new FileReader(); //파일을 비동기적으로 읽기 위함
      reader.onload = (e) => {
        // 파일이 존재할 때 실행되는 콜백 함수
        setImageSrc(e.target.result); // e.target.result = 파일의 내용
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽고, 데이터 URL은 base64로 인코딩된 파일 내용을 포함하는 문자열. 이 문자열은 이미지 미리보기를 제공하는 데 사용
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-5 p-5 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full text-2xl p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex justify-center items-start mb-5">
        <div className="mr-5">
          <label
            htmlFor="imageUpload"
            className="w-48 h-48 border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer text-center"
          >
            <img src={imageSrc} alt="Upload" className="w-48 h-48 object-cover border border-gray-300 rounded-lg" />
          </label>
          <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        <div className="flex-grow">
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full h-48 resize-none p-2 text-lg border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
