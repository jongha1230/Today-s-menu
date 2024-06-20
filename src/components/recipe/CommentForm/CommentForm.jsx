import { useState } from 'react';
import { toast } from 'react-toastify';
import defaultProfileImage from '../../../assets/images/default-food-image.png';
import { useCreateComment, useDeleteComment, useUpdateComment } from '../../shared/hooks/useCommentQueries';

const CommentForm = ({ recipeId, user, comments }) => {
  const [content, setContent] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const { mutate: createComment } = useCreateComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      toast.error('내용을 입력해주세요.');
      return;
    }
    const newComment = {
      userId: user.id,
      recipeId,
      content,
      name: user.nickname
    };
    createComment(newComment);
    setContent('');
    toast.success('댓글이 등록되었습니다.');
  };

  const handleUpdateComment = (comment) => {
    if (user.id === comment.user_id) {
      setEditCommentId(comment.id);
      setEditCommentContent(comment.comment);
    } else {
      toast.warn('본인이 작성한 댓글만 수정할 수 있습니다.');
    }
  };

  const handleSaveComment = (e, comment) => {
    e.preventDefault();
    if (editCommentContent.trim() === '') {
      toast.error('내용을 입력해주세요.');
      return;
    }
    updateComment({ commentId: comment.id, content: editCommentContent });
    setEditCommentId(null);
    setEditCommentContent('');
    toast.success('댓글이 수정되었습니다.');
  };

  const handleDeleteComment = (commentId, commentUserId) => {
    if (commentUserId === user.id) {
      if (confirm('삭제하시겠습니까?')) {
        deleteComment(commentId);
        toast.success('댓글이 삭제되었습니다.');
      }
    } else {
      toast.warn('본인이 작성한 댓글만 삭제할 수 있습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitComment} className="mb-4">
        <textarea
          name="commentContent"
          className="w-full p-2 border rounded mb-2 h-32 resize-none"
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-theme-color hover:bg-default-color text-black font-bold py-2 px-4 rounded"
          >
            제출
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="bg-white border rounded-lg p-4 shadow">
            {comment.id === editCommentId ? (
              <form onSubmit={(e) => handleSaveComment(e, comment)} className="w-full flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <img
                      style={{ cursor: 'pointer' }}
                      className="w-14 h-14 rounded-full"
                      src={comment?.users.profile_picture_url ?? defaultProfileImage}
                      alt={`${comment?.users.nickname} 프로필 사진`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                      {comment?.users.nickname}
                    </h3>
                  </div>
                </div>
                <textarea
                  className="w-full p-2 border rounded mb-2 h-20 resize-none"
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-theme-color hover:bg-default-color text-black font-bold py-2 px-4 rounded"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    className="bg-sub-color hover:bg-default-color text-black font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setEditCommentId(null)}
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-start">
                <div className="mr-4">
                  <img
                    style={{ cursor: 'pointer' }}
                    className="w-14 h-14 rounded-full"
                    src={comment?.users.profile_picture_url ?? defaultProfileImage}
                    alt={`${comment?.users.nickname} 프로필 사진`}
                  />
                </div>
                <div className="flex w-full items-center">
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                      {comment?.users.nickname}
                    </h3>
                    <p className="text-gray-600 mt-2 truncate-2-lines">{comment?.comment}</p>
                  </div>
                  <div>
                    {user && user.id === comment.user_id && (
                      <>
                        <button
                          className="bg-theme-color hover:bg-default-color text-black font-bold py-1 px-2 rounded mr-2"
                          onClick={() => handleUpdateComment(comment)}
                        >
                          수정
                        </button>
                        <button
                          className="bg-sub-color hover:bg-default-color text-black font-bold py-1 px-2 rounded"
                          onClick={() => handleDeleteComment(comment.id, comment.user_id)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentForm;
