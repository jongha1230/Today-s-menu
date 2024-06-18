import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const RecipeForm = () => {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/200');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedRecipes, setSubmittedRecipes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // const fatchData = async () => {
  //   const { data, error } = await supabase.from('recipes').select('*');

  //   console.log(data);
  // };

  // fatchData();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newRecipe = {
      title,
      content,
      imageSrc
    };

    if (editingIndex !== null) {
      const updatedRecipes = submittedRecipes.map((recipe, index) => (index === editingIndex ? newRecipe : recipe));
      setSubmittedRecipes(updatedRecipes);
      setEditingIndex(null);
    } else {
      setSubmittedRecipes([...submittedRecipes, newRecipe]);
    }

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
  };

  const handleEdit = (index) => {
    const recipe = submittedRecipes[index];
    setTitle(recipe.title);
    setContent(recipe.content);
    setImageSrc(recipe.imageSrc);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecipes = submittedRecipes.filter((_, i) => i !== index);
    setSubmittedRecipes(updatedRecipes);
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="w-full h-48 resize-none p-2 text-lg border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleSubmit}>
          {editingIndex !== null ? '수정 완료' : '레시피 등록'}
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          onClick={() => {
            setTitle('');
            setContent('');
            setImageSrc('https://via.placeholder.com/200');
            setEditingIndex(null);
          }}
        >
          취소
        </button>
      </div>
      {submittedRecipes.length > 0 && (
        <div className="mt-10">
          {submittedRecipes.map((recipe, index) => (
            <div key={index} className="mb-5 p-5 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl mb-2">{recipe.title}</h2>
              <img
                src={recipe.imageSrc}
                alt="Recipe"
                className="w-48 h-48 object-cover border border-gray-300 rounded-lg mb-2"
              />
              <p>{recipe.content}</p>
              <div className="flex justify-end mt-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => handleEdit(index)}
                >
                  수정
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(index)}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
