import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../api/api';

export const useGetRecipes = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const data = await api.recipe.getRecipes();
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes'])
  });
};

export const useRecipeDetail = (recipeId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['recipeDetail', recipeId],
    queryFn: async () => {
      const data = await api.recipe.getRecipeById(recipeId);
      return data[0];
    },
    onSuccess: (data) => queryClient.invalidateQueries(['recipeDetail', recipeId], data),
    enabled: !!recipeId
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const { recipe, file, userId, nickname } = data;
      await api.recipe.postRecipe(recipe, file, userId, nickname);
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
    onError: (error) => {
      console.error('레시피 생성 도중 에러 발생:', error);
    }
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ recipe, file }) => {
      const data = await api.recipe.UpdateRecipe(recipe, file);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes']);
    },
    onError: (error) => {
      console.error('레시피 업데이트 도중 에러 발생:', error);
    }
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recipe) => {
      const data = await api.recipe.DeleteRecipe(recipe);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
    onError: (error) => {
      console.error('레시피 삭제 도중 에러 발생:', error);
    }
  });
};
