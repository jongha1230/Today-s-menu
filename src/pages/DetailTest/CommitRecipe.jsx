import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import api from '../../api/api';
import useUserStore from '../../store/useUserStore';

const RecipeForm = () => {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/200');
  const [imageFile, setImageFile] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedRecipes, setSubmittedRecipes] = useState([]); // 제출된 레시피들의 목록
  const [editingIndex, setEditingIndex] = useState(null); // 현재 편집 중인 레시피의 인덱스
  const [editedRecipe, setEditedRecipe] = useState(null); // 현재 편집 중인 레시피의 상태
  const { user } = useUserStore();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setSubmittedRecipes(storedRecipes);
  }, []);

  //이미지 미리보기, 업로드
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      console.log(file);
      reader.readAsDataURL(file);
    }
  };

  //레시피 등록, 수정완료
  const handleSubmit = () => {
    const newRecipe = {
      id: uuid4(),
      title,
      content,
      imageSrc
    };

    let updatedRecipes;
    if (editingIndex !== null) {
      updatedRecipes = submittedRecipes.map((recipe, index) => (index === editingIndex ? newRecipe : recipe));
      setEditingIndex(null);
    } else {
      updatedRecipes = [...submittedRecipes, newRecipe];
    }

    setSubmittedRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    if (editingIndex !== null) {
      api.recipe.UpdateRecipe(newRecipe, imageFile);
    } else {
      api.recipe.postRecipe(newRecipe, imageFile, user.id, user.nickname);
    }

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
  };

  //특정 인덱스에 해당하는 레시피를 편집하기 위해 호출될 때 실행
  const handleEdit = (index) => {
    const recipe = submittedRecipes[index];
    setTitle(recipe.title);
    setContent(recipe.content);
    setImageSrc(recipe.imageSrc);
    setEditingIndex(index);
    setEditedRecipe(recipe);
  };
  // 수정 완료 후 제출
  const handleEditSubmit = () => {
    const updatedRecipe = {
      id: editedRecipe.id,
      title,
      content,
      imageSrc
    };

    const updatedRecipes = submittedRecipes.map((recipe, index) => (index === editingIndex ? updatedRecipe : recipe));
    setSubmittedRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    api.recipe.UpdateRecipe(updatedRecipe);

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setEditingIndex(null);
    setEditedRecipe(null);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setEditingIndex(null);
    setEditedRecipe(null);
  };

  const handleDelete = async (index) => {
    const recipe = submittedRecipes[index];
    const updatedRecipes = submittedRecipes.filter((_, i) => i !== index);
    setSubmittedRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    await api.recipe.DeleteRecipe(recipe.id);
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          onClick={() => {
            if (editingIndex !== null) {
              handleEditSubmit();
            } else {
              handleSubmit();
            }
          }}
        >
          {editingIndex !== null ? '수정 완료' : '레시피 등록'}
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg" onClick={handleCancelEdit}>
          취소
        </button>
      </div>
      {submittedRecipes.length > 0 && (
        <div className="mt-10">
          {submittedRecipes.map((recipe, index) => (
            <div key={recipe.id} className="mb-5 p-5 border border-gray-300 rounded-lg shadow-md">
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
