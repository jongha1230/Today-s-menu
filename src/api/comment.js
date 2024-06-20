import supabase from './supabaseAPI';

class CommentsAPI {
  // id, user_id, recipe_id, comment, user_profile, user_name, created_at

  // 게시글 코멘트 목록 불러오기
  async getComment(recipeId) {
    try {
      const { data, error } = await supabase.from('comments').select('*').eq('recipe_id', recipeId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to fetch comment: ${error.message}`);
    }
  }

  // 코멘트 생성
  async createComment(comment) {
    try {
      const { userId, recipeId, content, name } = comment;

      if (!userId || !recipeId || !content) {
        throw new Error('User ID, Post ID, and Comment text are required');
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([{ user_id: userId, recipe_id: recipeId, comment: content, user_name: name }]);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to create comment: ${error.message}`);
    }
  }

  // 코멘트 수정
  async editComment(commentId, content) {
    try {
      const { data, error } = await supabase.from('comments').update({ comment: content }).eq('id', commentId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw new Error(`Failed to edit comment: ${error.message}`);
    }
  }

  // 코멘트 삭제
  async deleteComment(commentId) {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);

      if (error) {
        throw error;
      }

      return true; // 삭제 성공을 나타내는 값 반환
    } catch (error) {
      throw new Error(`Failed to delete comment: ${error.message}`);
    }
  }
}

export default CommentsAPI;
