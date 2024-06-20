import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultImage from '../../assets/images/default-food-image.png';
import CommentForm from '../../components/recipe/CommentForm';

import { useGetComments } from '../../components/shared/hooks/useCommentQueries';
import { useDeleteRecipe, useRecipeDetail } from '../../components/shared/hooks/useRecipeQueries';
import { getNowTime } from '../../components/shared/utils/getNowDate';
import useUserStore from '../../store/useUserStore';

function RecipeDetail() {
  const { recipeId } = useParams();
  const { user } = useUserStore();
  const { data: recipe } = useRecipeDetail(recipeId);
  const { data: comments } = useGetComments(recipeId);
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="pb-4">
          <h1 className="text-4xl font-bold mb-4 pt-6 truncate-2-lines">{recipe?.title}</h1>
          <div className="flex justify-between">
            <h6 className="text-sm text-gray-600 mb-2 ml-4">by {recipe?.users.nickname}</h6>
            <h6 className="text-sm text-gray-600 mb-2 ml-4">{getNowTime(recipe?.created_at)}</h6>
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
              alt={`${recipe?.title} 요리 사진`}
            />
          </div>
          <div className="p-6 w-full md:w-[470px] h-auto md:h-[256px] overflow-y-auto">
            <p className="text-lg font-bold mb-2">{recipe?.content}</p>
          </div>
        </div>
        {/* main */}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">코멘트</h2>
          </div>
          <CommentForm recipeId={recipeId} user={user} comments={comments} />
        </div>
        {/* review */}
      </div>
      {/* inner */}
    </div>
  );
}

export default RecipeDetail;
