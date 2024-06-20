import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import RecipeForm from '../../components/recipe/RecipeForm';
import { useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';
import useUserStore from '../../store/useUserStore';

const CommitRecipePage = () => {
  const { recipeId } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { data: existingRecipe } = useRecipeDetail(recipeId);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <RecipeForm existingRecipe={existingRecipe} />
    </div>
  );
};

export default CommitRecipePage;
