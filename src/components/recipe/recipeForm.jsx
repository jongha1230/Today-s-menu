// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'tailwindcss/tailwind.css';
// import { v4 as uuid4 } from 'uuid';
// import { useCreateRecipe } from '../../components/shared/hooks/useRecipeQueries';
// import useUserStore from '../../store/useUserStore';

// const RecipeForm = () => {
//   const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/200');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const { user } = useUserStore();
//   const navigate = useNavigate();

//   const { mutate: createRecipe } = useCreateRecipe();

//   console.log('Current user:', user);

//   const handleSubmit = () => {
//     const newRecipe = {
//       id: uuid4(),
//       title,
//       content,
//       imageSrc
//     };
//     console.log('Creating recipe with data:', {
//       recipe: newRecipe,
//       file: selectedFile,
//       userId: user.id,
//       nickname: user.nickname
//     });

//     createRecipe({ recipe: newRecipe, file: selectedFile, userId: user.id, nickname: user.nickname });

//     setTitle('');
//     setContent('');
//     setImageSrc('https://via.placeholder.com/200');
//     setSelectedFile(null);
//     navigate('/'); // 메인 페이지로 이동
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto my-5 p-5 border border-gray-300 rounded-lg shadow-lg">
//       <div className="flex justify-center items-center mb-5">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="제목을 입력하세요"
//           className="w-full text-2xl p-2 border border-gray-300 rounded-lg"
//         />
//       </div>
//       <div className="flex justify-center items-start mb-5">
//         <div className="mr-5">
//           <label
//             htmlFor="imageUpload"
//             className="w-48 h-48 border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer text-center"
//           >
//             <img src={imageSrc} alt="Upload" className="w-48 h-48 object-cover border border-gray-300 rounded-lg" />
//           </label>
//           <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </div>
//         <div className="flex-grow">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="내용을 입력하세요"
//             className="w-full h-48 resize-none p-2 text-lg border border-gray-300 rounded-lg"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-5">
//         <button
//           className="bg-theme-color hover:bg-default-color text-black px-4 py-2 rounded-lg mr-2"
//           onClick={handleSubmit}
//         >
//           레시피 등록
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeForm;
