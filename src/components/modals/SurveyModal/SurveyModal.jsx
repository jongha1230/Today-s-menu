import { useState } from 'react';

import useModalStore from '../../../store/useModalStore';
import useSurveyStore from '../../../store/useSurveyStore';
import useFilterFoods from '../../shared/hooks/useFilterFoods';

import FoodList from './FoodList';
import ProgressBar from './ProgressBar';

function SurveyModal({ isModalOpen, toggleModal }) {
  const { currentPage, totalPages, nextPage, prevPage } = useModalStore();
  const { questions, surveyData, setSurveyData } = useSurveyStore();
  const filteredFoods = useFilterFoods();

  const [showResults, setShowResults] = useState(false);

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
              <h6 className="text-xl font-semibold mb-4">{currentQuestion.text}</h6>
              <ul className="list-none">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = isMultipleChoice
                    ? surveyData[currentQuestion.key]?.includes(option)
                    : surveyData[currentQuestion.key] === option;
                  return (
                    <li
                      key={index}
                      className={`mb-2 border-2 ${isSelected ? 'border-green-500 bg-green-100' : 'border-black'} border-solid w-96 h-12 text-center py-2.5 rounded-3xl cursor-pointer transition-all duration-200 ease-in-out`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>

              <div className="flex justify-between w-full mt-4">
                <button onClick={handlePrev} disabled={currentPage === 0} className="p-2 bg-gray-300 rounded">
                  이전
                </button>
                {currentPage < totalPages - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`p-2 ${isNextDisabled ? 'bg-gray-400' : 'bg-blue-500 text-white'} rounded`}
                  >
                    다음
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className={`p-2 ${isSubmitDisabled ? 'bg-gray-400' : 'bg-green-500 text-white'} rounded`}
                  >
                    제출
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">추천 음식</h2>
              <FoodList foods={filteredFoods} />
              <button onClick={toggleModal} className="mt-4 p-2 bg-red-500 text-white rounded">
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
