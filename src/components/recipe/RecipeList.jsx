import React from 'react';

const RecipeList = ({ submittedRecipes, handleEdit, handleDelete }) => {
  return (
    submittedRecipes.length > 0 && (
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
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => handleEdit(index)}>
                수정
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(index)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default RecipeList;
