import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../api/supabaseAPI';

function RecipeDetail() {
  const [reviews, setReviews] = useState([
    // {
    //   id: 1,
    //   userId: 'user1',
    //   name: '김철1수',
    //   content: '맛없다맛없다맛없다맛없다맛없다맛없다맛없다',
    //   isLogin: false
    // },
    // {
    //   id: 2,
    //   userId: 'user2',
    //   name: '이영희',
    //   content: '맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다맛있다.',
    //   isLogin: false
    // }
    []
  ]);

  const [showReviewsForm, setShowReviewsForm] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewContent, setEditReviewContent] = useState('');
  // const loginUser = {
  //   id: 3,
  //   isLogin: true,
  //   userId: 'user3',
  //   userName: '김나비'
  // };
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const getLoggedInUser = async () => {
      let { data: users, error } = await supabase.from('users').select('id,nickname,profile_picture_url');
      setLoginUser(users);
    };
    getLoggedInUser();
  }, []);
  console.log(loginUser);

  const handleToggleReview = () => {
    if (loginUser.isLogin) {
      setShowReviewsForm((state) => !state);
    } else {
      alert('로그인을 해주세요');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReviews = {
      id: crypto.randomUUID(),
      userId: loginUser.userId,
      name: loginUser.userName,
      content: e.target.elements.reviewContent.value
    };
    setReviews([...reviews, newReviews]);
    setShowReviewsForm(false);
  };

  const handleUpdateReview = (reviewId, reviewUserId) => {
    const reviewToEdit = reviews.find((review) => review.userId === reviewUserId);
    if (loginUser.userId === reviewUserId) {
      setEditReviewId(reviewId);
      setEditReviewContent(reviewToEdit.content);
    } else {
      alert('본인이 작성한 리뷰만 수정할 수 있습니다.');
    }
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    setReviews((prev) => {
      return prev.map((review) => {
        if (review.id === editReviewId) {
          return { ...review, content: editReviewContent };
        }
        return review;
      });
    });
    setEditReviewId(null);
    setEditReviewContent('');
  };

  const handleDeleteReview = (reviewId) => {
    if (reviews.find((review) => review.id === reviewId)?.userId === loginUser.userId) {
      if (confirm('삭제하시겠습니까?')) {
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      }
    } else {
      alert('본인이 작성한 리뷰만 삭제할 수 있습니다.');
    }
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
                {/* 수정 모드 */}
                {review.id === editReviewId ? (
                  <form onSubmit={handleSaveReview} className="w-full flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className="mr-4">
                        <Link to={'/'}>
                          <img
                            style={{ cursor: 'pointer' }}
                            className="w-14 h-14 rounded-full"
                            src="https://via.placeholder.com/40x40"
                            alt={`${review.name} 프로필 사진`}
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link to={'/'}>
                          <h3 className="font-bold" style={{ cursor: 'pointer' }}>
                            {review.name}
                          </h3>
                        </Link>
                      </div>
                    </div>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={editReviewContent}
                      onChange={(e) => setEditReviewContent(e.target.value)}
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
                        onClick={() => setEditReviewId(null)}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  // 일반 모드일 때
                  <div className="flex items-start mb-4">
                    <div className="mr-4">
                      <Link to={'/'}>
                        <img
                          style={{ cursor: 'pointer' }}
                          className="w-14 h-14 rounded-full"
                          src="https://via.placeholder.com/40x40"
                          alt={`${review.name} 프로필 사진`}
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
                        onClick={() => handleUpdateReview(review.id, review.userId)}
                      >
                        수정
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteReview(review.id)}
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
    //wrap
  );
}

export default RecipeDetail;
