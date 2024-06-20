import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/images/default-food-image.png';

const RecipeList = ({ recipes }) => {
  //
  const sortedRecipes = [...recipes].sort((a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {sortedRecipes.length > 0 ? (
        sortedRecipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="bg-white w-52 h-74 rounded-lg p-4 border-2 mb-5 m-2"
          >
            <div>
              <img
                src={recipe.thumbnail || defaultImage}
                alt={recipe.title}
                className="object-cover w-full rounded-lg"
              />
            </div>
            <div className="p-4">
              <hr className="border-gray-300 mb-2" />
              <h3 className="text-lg font-bold mb-2 truncate-2-lines">{recipe.title}</h3>
              <p className="text-gray-600 mb-1 text-sm justify-between=">{recipe.users.nickname}</p>
              <p className="text-gray-600 mb-1 text-sm justify-between=">
                {new Date(recipe.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full h-[370px] flex items-start justify-center">검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default RecipeList;
