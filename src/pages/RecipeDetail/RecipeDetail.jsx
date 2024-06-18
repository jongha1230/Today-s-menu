import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeDetail() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 'user1',
      name: '김철1수',
      content: '맛없다맛없다맛없다맛없다맛없다맛없다맛없다'
    },
    {
      id: 2,
      userId: 'user2',
      name: '이영희',
      content: '맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다.'
    }
  ]);

  const [showReviewsForm, setShowReviewsForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const loginUserId = `user1`;
  const loginId = 1;
  const [editReviewId, setEditReviewId] = useState(loginId);
  const [editReviewContent, setEditReviewContent] = useState('');

  const handleToggleReview = () => {
    // 로그인 된 유저만 작성가능 or 보임
    // console.log('리뷰 추가 클릭');
    if (isLogin) {
      setShowReviewsForm((state) => !state);
    } else {
      alert('로그인을 해주세요');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReviews = {
      id: crypto.randomUUID(),
      userId: loginUserId,
      name: '{로그인한 유저닉네임}',
      content: e.target.elements.reviewContent.value
    };
    setReviews([...reviews, newReviews]);
    setShowReviewsForm(false);
  };

  const handleUpdateReview = (reviewId) => {
    setEditReviewId(reviewId);
    // console.log('리뷰 수정 클릭');
  };

  const handleDeleteReview = () => {
    setReviews((prev) => prev.filter((review) => review.id !== loginId));
    // console.log('리뷰 삭제 클릭');
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white  rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="pb-4">
          <h1 className="text-4xl font-bold mb-4  pt-6">장어덮밥 레시피</h1>
          <div className="border-b"></div>
        </div>
        {/* header */}

        <div className="md:flex">
          <div className="md:w-1/2">
            <Link to={'/'}>
              <img
                style={{ cursor: 'pointer' }}
                className="h-64 w-full object-cover"
                src="https://via.placeholder.com/600x400"
                alt={`$.{음식이미지} 요리 사진`}
              />
            </Link>
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className="text-lg font-bold mb-2">재료</h2>
            <ul className="list-disc pl-6 mb-4">
              {/* {요리db.프로퍼티.map((인자1, index) => (
                <li key={index}>{인자1}</li>
              ))} */}
              <li>장어 400g</li>
              <li>밥 2공기</li>
              <li>간장 2큰술</li>
              <li>설탕 1큰술</li>
              <li>조미료 1큰술</li>
              <li>참깨 1큰술</li>
            </ul>
          </div>
        </div>
        {/* main */}

        <div className="p-6">
          <h2 className="text-lg font-bold mb-2">조리 순서</h2>
          <ol className="list-decimal pl-6 mb-4">
            <li>장어를 깨끗이 씻어 뼈를 제거하고 적당한 크기로 자른다.</li>
            <li>장어를 깨끗이 씻어 뼈를 제거하고 적당한 크기로 자른다.</li>
            <li>간장, 설탕, 미림을 섞어 양념을 만든다. 장어를 양념에 버무려 30분 정도 재운다.</li>
            <li>팬에 참기름을 두르고 장어를 노릇하게 구워낸다. 밥 위에 올려 담는다.</li>
            <li>장어 위에 참깨를 뿌려 완성한다.</li>
          </ol>
        </div>
        {/* content */}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">리뷰</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleReview}
              // onClick={handleToggleReview(review.id)}
            >
              리뷰 작성
            </button>
          </div>
          {showReviewsForm && (
            <form onSubmit={handleSubmitReview} className="mb-4">
              <textarea
                name="reviewContent"
                className="w-full p-2 border rounded mb-2"
                placeholder="리뷰를 작성하세요"
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
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-4 shadow">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <Link to={'/'}>
                      <img
                        style={{ cursor: 'pointer' }}
                        className="w-14 h-14 rounded-full"
                        src="https://via.placeholder.com/40x40"
                        alt={`$.{리뷰어} 프로필 사진`}
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <Link to={'/'}>
                      <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                        {review.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={handleUpdateReview}
                    >
                      수정
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={handleDeleteReview}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*review*/}
      </div>
      {/* inner */}
    </div>
    //wrap
  );
}

export default RecipeDetail;
