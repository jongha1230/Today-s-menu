import React from 'react';
import { useParams } from 'react-router-dom';

import RecipeForm from '../../components/recipe/RecipeForm';
import { useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';

const CommitRecipePage = () => {
  const { recipeId } = useParams();

  const { data: existingRecipe } = useRecipeDetail(recipeId);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <RecipeForm existingRecipe={existingRecipe} />
    </div>
  );
};

export default CommitRecipePage;
