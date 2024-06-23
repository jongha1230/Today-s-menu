import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { LuPointer } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import MainImage from '../../assets/images/MainImage.jpg';

import RecipeList from '../../components/common/RecipeList/RecipeList';
import SurveyModal from '../../components/modals/SurveyModal';
import { useRecipes } from '../../components/shared/hooks/useRecipes';
import { useTimeOfDay } from '../../components/shared/hooks/useTimeOfDay';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredRecipes = useRecipes(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const time = useTimeOfDay();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div alt="사진박스" className="bg-gray-200 w-300 h-60 flex items-center justify-center ">
        <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          alt="설문조사"
          className="w-6/12 h-2/12 mt-10 py-2 px-4 bg-gray-100 border-4 border-solid border-theme-color shadow-md flex items-center justify-center text-2xl font-medium rounded-3xl hover:scale-110 ease-in duration-300"
          type="button"
          onClick={handleModalToggle}
        >
          {' '}
          {time} 뭐 먹지?
        </button>
        <LuPointer
          style={{ fontSize: '40px', position: 'relative', left: '100px', top: '-30px', transform: 'rotate(-30deg)' }}
        />
        <SurveyModal isModalOpen={isModalOpen} toggleModal={handleModalToggle} />
      </div>

      {/* 검색 기능 */}
      <div className="flex items-center justify-center mt-2">
        <div className="flex items-center bg-white rounded-xl px-3 py-2 border-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="outline-none w-40 sm:w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="검색어 입력"
          />
          <button className="outline-none" aria-label="검색">
            <SearchIcon />
          </button>
        </div>

        <div className="flex justify-center mt-5">
          <Link
            to={'/recipe'}
            className="py-2 px-4 rounded-2xl bg-sub-color border-2 border-solid border-sub-color  text-center mb-5 ml-10 hover:bg-white ease-in duration-300"
          >
            레시피 작성
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <RecipeList recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default MainPage;
