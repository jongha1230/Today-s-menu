import { useState } from 'react';
import MainImage from '../../assets/images/MainImage.jpg';
import SurveyModal from '../../components/modals/SurveyModal/SurveyModal';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
        <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
      </div>

      <button
        alt="설문조사"
        className="bg-gray-200 w-full h-32 flex items-center justify-center mt-5 text-3xl font-medium"
        type="button"
        onClick={handleModalToggle}
      >
        {' '}
        설문조사 - 오늘 뭐 먹지?
      </button>

      <SurveyModal isModalOpen={isModalOpen} toggleModal={handleModalToggle} />
    </div>
  );
};

export default MainPage;
