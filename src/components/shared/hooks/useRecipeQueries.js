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

export const useGetMyRecipes = (userId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['myRecipes', userId],
    queryFn: async () => {
      const data = await api.recipe.getMyRecipes(userId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['myRecipes', userId]),
    enabled: !!userId // 사용자 ID가 있을 때만 쿼리 실행
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
    mutationFn: async (recipeId) => {
      const data = await api.recipe.DeleteRecipe(recipeId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
    onError: (error) => {
      console.error('레시피 삭제 도중 에러 발생:', error);
    }
  });
};
