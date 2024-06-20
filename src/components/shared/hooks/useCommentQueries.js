import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../api/api';

// 레시피 댓글 목록 불러오기
export const useGetComments = (recipeId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const data = await api.comment.getComment(recipeId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['comments'])
  });
};

// 댓글 작성
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment) => {
      await api.comment.createComment(comment);
    },
    onSuccess: () => queryClient.invalidateQueries(['comments']),
    onError: (error) => {
      console.error('댓글 생성 도중 에러 발생:', error);
    }
  });
};

// 댓글 업데이트
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, content }) => {
      const data = await api.comment.editComment(commentId, content);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
    onError: (error) => {
      console.error('댓글 업데이트 도중 에러 발생:', error);
    }
  });
};

// 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId) => {
      const data = await api.comment.deleteComment(commentId);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['comments']),
    onError: (error) => {
      console.error('댓글 삭제 도중 에러 발생:', error);
    }
  });
};
