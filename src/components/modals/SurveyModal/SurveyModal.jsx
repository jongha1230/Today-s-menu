import { useEffect, useState } from 'react';

import useModalStore from '../../../store/useModalStore';
import useSurveyStore from '../../../store/useSurveyStore';
import useFilterFoods from '../../shared/hooks/useFilterFoods';

import FoodList from './FoodList';
import ProgressBar from './ProgressBar';

function SurveyModal({ isModalOpen, toggleModal }) {
  const { currentPage, totalPages, nextPage, prevPage, resetPage } = useModalStore();
  const { questions, surveyData, setSurveyData } = useSurveyStore();
  const filteredFoods = useFilterFoods();

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setShowResults(false);
      setSurveyData({
        foodType: '',
        taste: '',
        ingredients: [],
        isDiet: false,
        allergies: [],
        dietType: '',
        mealTime: '',
        price: ''
      });
      resetPage();
    }
  }, [isModalOpen, setSurveyData, resetPage]);

  const currentQuestion = questions[currentPage];
  const isMultipleChoice = currentQuestion.text.includes('복수 선택 가능');

  const handleOptionClick = (option) => {
    if (isMultipleChoice) {
      setSurveyData({
        [currentQuestion.key]: surveyData[currentQuestion.key].includes(option)
          ? surveyData[currentQuestion.key].filter((item) => item !== option)
          : [...surveyData[currentQuestion.key], option]
      });
    } else {
      setSurveyData({
        [currentQuestion.key]: option
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      nextPage();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      prevPage();
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const isNextDisabled = !surveyData[currentQuestion.key];
  const isSubmitDisabled = !Object.values(surveyData).some((value) => value);

  return (
    isModalOpen && (
      <div
        className="modal fixed inset-0 flex items-center justify-center bg-black/50"
        onClick={(e) => e.target.classList.contains('modal') && toggleModal()}
      >
        <div className="modal-content flex flex-col justify-around items-center bg-white p-6 rounded-lg w-11/12 max-w-3xl h-5/6 max-h-[760px]">
          {!showResults ? (
            <>
              <ProgressBar />
              <h6 className="text-3xl font-semibold">{currentQuestion.text}</h6>
              <ul className="list-none flex flex-col gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = isMultipleChoice
                    ? surveyData[currentQuestion.key]?.includes(option)
                    : surveyData[currentQuestion.key] === option;
                  return (
                    <li
                      key={index}
                      className={`border-2 ${isSelected ? 'border-green-500 bg-green-100' : 'border-black'} border-solid w-96 h-12 text-center py-2.5 rounded-3xl cursor-pointer transition-all duration-200 ease-in-out`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>

              <div className="flex justify-center w-full gap-8">
                <button onClick={handlePrev} disabled={currentPage === 0} className="px-8 py-3 bg-gray-300 rounded">
                  이전
                </button>
                {currentPage < totalPages - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`px-8 py-3 ${isNextDisabled ? 'bg-gray-400' : 'bg-blue-500 text-white'} rounded`}
                  >
                    다음
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className={`px-8 py-3 ${isSubmitDisabled ? 'bg-gray-400' : 'bg-green-500 text-white'} rounded`}
                  >
                    제출
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col w-full h-5/6 items-center justify-between">
              <h2 className="text-4xl font-bold ">Today&apos;s MENU</h2>
              <FoodList foods={filteredFoods} />
              <button onClick={toggleModal} className="px-8 py-3 bg-red-500 text-white rounded">
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default SurveyModal;
