import { useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/memoticon.png';
import {
  useCreateComment,
  useDeleteComment,
  useGetComments,
  useUpdateComment
} from '../../components/shared/hooks/useCommentQueries';
import { useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';
import { getNowTime } from '../../components/shared/utils/getNowDate';
import useUserStore from '../../store/useUserStore';

function RecipeDetail() {
  const { recipeId } = useParams();
  const { user } = useUserStore();
  const { data: recipe } = useRecipeDetail(recipeId);
  const { data: comments } = useGetComments(recipeId);
  const { mutate: createComment } = useCreateComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [content, setContent] = useState('');

  const [showCommentsForm, setShowCommentsForm] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const handleToggleComment = () => {
    if (user) {
      setShowCommentsForm((state) => !state);
    } else {
      alert('로그인을 해주세요');
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      userId: user?.id,
      recipeId: recipe?.id,
      content: e.target.elements.commentContent.value,
      name: user?.nickname
    };
    createComment(newComment);
    setShowCommentsForm(false);
  };

  const handleUpdateComment = (comment) => {
    if (user?.id === comment.user_id) {
      setEditCommentId(comment.id);
      setEditCommentContent(comment.comment);
    } else {
      alert('본인이 작성한 리뷰만 수정할 수 있습니다.');
    }
  };

  const handleSaveComment = (e, comment) => {
    e.preventDefault();

    updateComment({ commentId: comment.id, content: editCommentContent });
    setEditCommentId(null);
    setEditCommentContent('');
  };

  const handleDeleteComment = (commentId, commentUserId) => {
    if (commentUserId === user?.id) {
      if (confirm('삭제하시겠습니까?')) {
        deleteComment(commentId);
      }
    } else {
      alert('본인이 작성한 리뷰만 삭제할 수 있습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white  rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="pb-4">
          <h1 className="text-4xl font-bold mb-4  pt-6">{recipe?.title}</h1>
          <div className="flex justify-between">
            <h6 className="text-sm text-gray-600 mb-2 ml-4 ">by {recipe?.nickname}</h6>
            <h6 className="text-sm text-gray-600 mb-2 ml-4 ">{getNowTime(recipe?.created_at)}</h6>
          </div>

          <div className="border-b"></div>
        </div>
        {/* header */}

        <div className="md:flex">
          <div className="md:w-1/2">
            <img className="h-64 w-full object-cover" src={recipe?.thumbnail} alt={`$.{음식이미지} 요리 사진`} />
          </div>
          <div className="p-6 w-full md:w-[470px] h-auto md:h-[256px] overflow-y-auto">
            <p className="text-lg font-bold mb-2">{recipe?.content}</p>
          </div>
        </div>
        {/* main */}

        {/* content */}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">코멘트</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleComment}
              // onClick={handleToggleReview(review.id)}
            >
              리뷰 작성
            </button>
          </div>
          {showCommentsForm && (
            <form onSubmit={handleSubmitComment} className="mb-4">
              <textarea
                name="commentContent"
                className="w-full p-2 border rounded mb-2"
                placeholder="코멘트를 수정하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  제출
                </button>
              </div>
            </form>
          )}
          {/* write */}

          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment.id} className="bg-white border rounded-lg p-4 shadow">
                {/* 수정 모드 */}
                {comment.id === editCommentId ? (
                  <form onSubmit={(e) => handleSaveComment(e, comment)} className="w-full flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className="mr-4">
                        <img
                          style={{ cursor: 'pointer' }}
                          className="w-14 h-14 rounded-full"
                          src={user?.profile_picture_url ?? defaultProfileImage}
                          alt={`${comment?.user_name} 프로필 사진`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                          {comment?.user_name}
                        </h3>
                      </div>
                    </div>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => setEditCommentId(null)}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  // 일반 모드일 때
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <img
                        style={{ cursor: 'pointer' }}
                        className="w-14 h-14 rounded-full"
                        src={user?.profile_picture_url ?? defaultProfileImage}
                        alt={`${comment?.user_name} 프로필 사진`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                        {comment?.user_name}
                      </h3>

                      <p className="text-gray-600 mt-2">{comment?.comment}</p>
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => handleUpdateComment(comment)}
                      >
                        수정
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteComment(comment.id, comment.user_id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/*  */}
        </div>
        {/*review*/}
      </div>
      {/* inner */}
    </div>
  );
  //wrap
}

export default RecipeDetail;
