import React from 'react';

const RecipeEditor = ({ title, setTitle, content, setContent, imageSrc, handleImageUpload }) => {
  return (
    <div className="flex">
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
        <div className="flex justify-center items-center mb-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full text-2xl p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-48 resize-none p-2 text-lg border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default RecipeEditor;
