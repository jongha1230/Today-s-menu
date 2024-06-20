import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { v4 as uuid4 } from 'uuid';
import { useCreateRecipe, useDeleteRecipe, useUpdateRecipe } from '../../components/shared/hooks/useRecipeQueries';
import useUserStore from '../../store/useUserStore';
import { previewImage } from '../shared/utils/previewImage';
import RecipeEditor from './RecipeEditor';
import RecipeList from './RecipeList';

const RecipeForm = () => {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/200');
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedRecipes, setSubmittedRecipes] = useState([]); // 제출된 레시피들의 목록 -
  const [editingIndex, setEditingIndex] = useState(null); // 현재 편집 중인 레시피의 인덱스
  const [editedRecipe, setEditedRecipe] = useState(null); // 현재 편집 중인 레시피의 상태
  const { user } = useUserStore();

  const { mutate: createRecipe } = useCreateRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setSubmittedRecipes(storedRecipes);
  }, []);

  //이미지 미리보기, 업로드
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    previewImage(file, (result) => {
      setImageSrc(result);
    });
    setSelectedFile(file);
  };

  //레시피 등록, 수정완료
  const handleSubmit = () => {
    const newRecipe = {
      id: uuid4(),
      title,
      content,
      imageSrc //미리보기용 이미지 url 설정
    };
    console.log('Creating recipe with data:', {
      recipe: newRecipe,
      file: selectedFile,
      userId: user.id,
      nickname: user.nickname
    });
    let updatedRecipes;
    if (editingIndex !== null) {
      updatedRecipes = submittedRecipes.map((recipe, index) => (index === editingIndex ? newRecipe : recipe));
      setEditingIndex(null);
    } else {
      updatedRecipes = [...submittedRecipes, newRecipe];
    }

    setSubmittedRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    console.log(user.id, user.nickname);

    if (editingIndex !== null) {
      updateRecipe({ recipe: newRecipe, file: selectedFile });
    } else {
      createRecipe({ recipe: newRecipe, file: selectedFile, userId: user.id, nickname: user.nickname });
    }

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setSelectedFile(null);
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
    updateRecipe({ recipe: updatedRecipe, file: selectedFile });

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setEditingIndex(null);
    setEditedRecipe(null);
    setSelectedFile(null);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setEditingIndex(null);
    setEditedRecipe(null);
  };

  const handleDelete = (index) => {
    const recipe = submittedRecipes[index];
    const updatedRecipes = submittedRecipes.filter((_, i) => i !== index);
    setSubmittedRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    deleteRecipe(recipe.id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-5 p-5 border border-gray-300 rounded-lg shadow-lg">
      <RecipeEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        imageSrc={imageSrc}
        handleImageUpload={handleImageUpload}
      />
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
      <RecipeList submittedRecipes={submittedRecipes} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default RecipeForm;
