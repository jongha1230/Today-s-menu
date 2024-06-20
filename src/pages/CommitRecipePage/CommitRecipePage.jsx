import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import RecipeForm from '../../components/recipe/RecipeForm';
import { useCreateRecipe, useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';

const CommitRecipePage = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: existingRecipe } = useRecipeDetail(recipeId);
  const { mutate: createRecipe } = useCreateRecipe();

  // 레시피 제출후 메인페이지로 이동
  const handleSubmitRecipe = (newRecipe) => {
    createRecipe(newRecipe);
    if (location.state?.from === '/recipe/:recipeId') {
      navigate(`/recipe/${newRecipe.id}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <RecipeForm existingRecipe={existingRecipe} onSubmitRecipe={handleSubmitRecipe} />
    </div>
  );
};

export default CommitRecipePage;
