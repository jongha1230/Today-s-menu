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
      return data;
    },
    onSuccess: (data) => queryClient.invalidateQueries(['recipeDetail', recipeId], data),
    enabled: !!recipeId
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRecipe) => {
      const data = await api.recipe.createRecipe(newRecipe);
      return data;
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
    mutationFn: async ({ recipeId, updatedRecipe }) => {
      const data = await api.recipe.updateRecipe(recipeId, updatedRecipe);
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
    mutationFn: async (recipeId) => {
      const data = await api.recipe.deleteRecipe(recipeId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
    onError: (error) => {
      console.error('레시피 삭제 도중 에러 발생:', error);
    }
  });
};
