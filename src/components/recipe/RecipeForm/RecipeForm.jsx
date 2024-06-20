import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { v4 as uuid4 } from 'uuid';
import useUserStore from '../../../store/useUserStore';
import { useCreateRecipe, useUpdateRecipe } from '../../shared/hooks/useRecipeQueries';
import { previewImage } from '../../shared/utils/previewImage';

const RecipeForm = ({ existingRecipe, onSubmitRecipe }) => {
  const [imageSrc, setImageSrc] = useState(existingRecipe?.thumbnail || 'https://via.placeholder.com/200');
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialImageSrc, setInitialImageSrc] = useState('https://via.placeholder.com/200');
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { mutate: createRecipe } = useCreateRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();

  useEffect(() => {
    if (existingRecipe) {
      setInitialTitle(existingRecipe.title);
      setInitialContent(existingRecipe.content);
      setInitialImageSrc(existingRecipe.thumbnail);
      setTitle(existingRecipe.title);
      setContent(existingRecipe.content);
      setImageSrc(existingRecipe.thumbnail);
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
    const newRecipe = {
      id: existingRecipe?.id || uuid4(),
      title,
      content,
      imageSrc
    };

    if (existingRecipe) {
      updateRecipe({ recipe: newRecipe, file: selectedFile });
    } else {
      createRecipe({ recipe: newRecipe, file: selectedFile, userId: user.id, nickname: user.nickname });
    }

    onSubmitRecipe(newRecipe);

    setTitle('');
    setContent('');
    setImageSrc('https://via.placeholder.com/200');
    setSelectedFile(null);
  };

  const handleCancelEdit = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    setImageSrc(initialImageSrc);
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
