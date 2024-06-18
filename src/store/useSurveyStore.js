import { create } from 'zustand';

const useSurveyStore = create((set) => ({
  questions: [
    { id: 1, key: 'foodType', text: '선호하는 음식 종류는?', options: ['한식', '중식', '일식', '양식', '기타'] },
    { id: 2, key: 'taste', text: '좋아하는 음식 맛은?', options: ['매운맛', '단맛', '짠맛', '신맛', '담백한맛'] },
    {
      id: 3,
      key: 'ingredients',
      text: '선호하는 식재료는? (복수 선택 가능)',
      options: ['육류', '해산물', '채소', '과일', '곡물']
    },
    { id: 4, key: 'isDiet', text: '건강식/다이어트 선호 하시나요?', options: ['예', '아니오'] },
    {
      id: 5,
      key: 'allergies',
      text: '알레르기 식재료를 선택 해주세요 (복수 선택 가능)',
      options: ['유제품', '견과류', '글루텐', '없음']
    },
    { id: 6, key: 'dietType', text: '선호하는 식단 유형', options: ['육식', '채식', '비건'] },
    { id: 7, key: 'mealTime', text: '식사 시간대', options: ['아침', '점심', '저녁'] },
    { id: 8, key: 'price', text: '선호하는 가격대', options: ['10000원 미만', '20,000원 미만', '20,000원 이상'] }
  ],
  surveyData: {
    foodType: '',
    taste: '',
    ingredients: [],
    isDiet: false,
    allergies: [],
    dietType: '',
    mealTime: '',
    price: ''
  },
  setSurveyData: (newData) =>
    set((state) => ({
      surveyData: {
        ...state.surveyData,
        ...newData
      }
    }))
}));
export default useSurveyStore;
