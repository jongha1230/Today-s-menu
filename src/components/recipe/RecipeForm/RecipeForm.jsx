import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import { v4 as uuid4 } from 'uuid';
import useUserStore from '../../../store/useUserStore';
import { useCreateRecipe, useUpdateRecipe } from '../../shared/hooks/useRecipeQueries';
import { previewImage } from '../../shared/utils/previewImage';

const RecipeForm = ({ existingRecipe }) => {
  const [imageSrc, setImageSrc] = useState(existingRecipe?.thumbnail || 'https://via.placeholder.com/200');
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { mutate: createRecipe } = useCreateRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();

  useEffect(() => {
    if (existingRecipe) {
      setTitle(existingRecipe.title);
      setContent(existingRecipe.content);
      setImageSrc(existingRecipe?.thumbnail || 'https://via.placeholder.com/200');
    }
  }, [existingRecipe]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    previewImage(file, (result) => {
      setImageSrc(result);
    });
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('제목과 내용을 모두 입력하세요.');
      return;
    }

    if (title.length > 30) {
      toast.error('제목은 최대 30자까지 입력 가능합니다.');
      return;
    }

    if (content.length > 60) {
      toast.error('내용은 최대 60자까지 입력 가능합니다.');
      return;
    }
    const newRecipe = {
      id: existingRecipe?.id || uuid4(),
      title,
      content,
      imageSrc
    };

    if (existingRecipe) {
      updateRecipe({ recipe: newRecipe, file: selectedFile });
      toast.success('레시피가 수정 되었습니다.');
    } else {
      createRecipe({ recipe: newRecipe, file: selectedFile, userId: user.id, nickname: user.nickname });
      toast.success('레시피가 등록 되었습니다.');
    }

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setSelectedFile(null);
    navigate('/');
  };

  const handleCancelEdit = () => {
    if (existingRecipe) {
      setTitle(existingRecipe.title);
      setContent(existingRecipe.content);
      setImageSrc(existingRecipe.thumbnail || 'https://via.placeholder.com/200');
    }
    setSelectedFile(null);
    navigate(-1);
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
          className="bg-sub-color hover:bg-default-color text-black px-4 py-2 rounded-lg mr-2"
          onClick={handleSubmit}
        >
          {existingRecipe ? '수정 완료' : '레시피 등록'}
        </button>
        <button
          className="bg-theme-color hover:bg-default-color text-black px-4 py-2 rounded-lg"
          onClick={handleCancelEdit}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;
