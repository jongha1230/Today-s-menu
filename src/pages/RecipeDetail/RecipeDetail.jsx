import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultImage from '../../assets/images/default-food-image.png';
import defaultProfileImage from '../../assets/images/memoticon.png';
import {
  useCreateComment,
  useDeleteComment,
  useGetComments,
  useUpdateComment
} from '../../components/shared/hooks/useCommentQueries';
import { useDeleteRecipe, useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';
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
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const [showCommentsForm, setShowCommentsForm] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const handleToggleComment = () => {
    if (user) {
      setShowCommentsForm((state) => !state);
    } else {
      alert('로그인을 해주세요');
      navigate('/login');
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
    toast.success('댓글이 등록되었습니다.');
  };

  const handleUpdateComment = (comment) => {
    if (user?.id === comment.user_id) {
      setEditCommentId(comment.id);
      setEditCommentContent(comment.comment);
    } else {
      toast.warn('본인이 작성한 댓글만 수정할 수 있습니다.');
    }
  };

  const handleSaveComment = (e, comment) => {
    e.preventDefault();

    updateComment({ commentId: comment.id, content: editCommentContent });
    setEditCommentId(null);
    setEditCommentContent('');
    toast.success('댓글이 수정되었습니다.');
  };

  const handleDeleteComment = (commentId, commentUserId) => {
    if (commentUserId === user?.id) {
      if (confirm('삭제하시겠습니까?')) {
        deleteComment(commentId);
        toast.success('댓글이 삭제되었습니다.');
      }
    } else {
      toast.warn('본인이 작성한 댓글만 삭제할 수 있습니다.');
    }
  };

  const handleEditRecipe = () => {
    navigate(`/recipe/${recipeId}/edit`);
  };

  const handleDeleteRecipe = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteRecipe(recipeId);
      navigate('/', { replace: true });
      toast.success('레시피가 삭제되었습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white  rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="pb-4">
          <h1 className="text-4xl font-bold mb-4  pt-6">{recipe?.title}</h1>
          <div className="flex justify-between">
            <h6 className="text-sm text-gray-600 mb-2 ml-4 ">by {recipe?.users.nickname}</h6>
            <h6 className="text-sm text-gray-600 mb-2 ml-4 ">{getNowTime(recipe?.created_at)}</h6>
          </div>
          <div className="p-6 flex justify-end">
            {user && user.id === recipe?.user_id && (
              <>
                <button
                  className="bg-theme-color hover:bg-default-color text-black font-bold py-2 px-4 rounded mr-2"
                  onClick={handleEditRecipe}
                >
                  게시글 수정
                </button>
                <button
                  className="bg-sub-color hover:bg-default-color text-black font-bold py-2 px-4 rounded"
                  onClick={handleDeleteRecipe}
                >
                  게시글 삭제
                </button>
              </>
            )}
          </div>

          <div className="border-b"></div>
        </div>
        {/* header */}

        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              className="h-64 w-full object-cover"
              src={recipe?.thumbnail || defaultImage}
              alt={`$.{음식이미지} 요리 사진`}
            />
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
              className="bg-theme-color hover:bg-default-color text-black font-bold py-2 px-4 rounded"
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
                  className="bg-theme-color hover:bg-default-color text-black font-bold py-2 px-4 rounded"
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
                      className="w-full p-2 border rounded mb-2"
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
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
                  // 일반 모드일 때
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

                      <p className="text-gray-600 mt-2">{comment?.comment}</p>
                    </div>
                    <div>
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
