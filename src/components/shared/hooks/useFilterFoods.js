import { useEffect, useState } from 'react';
import foodData from '../../../data/data.json';
import useSurveyStore from '../../../store/useSurveyStore';

const useFilterFoods = () => {
  const { surveyData } = useSurveyStore();
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const { foodType, taste, ingredients, isDiet, allergies, dietType, mealTime, price } = surveyData;
    const scoredFoods = foodData
      .filter((food) => !allergies.some((a) => food.allergies.includes(a)))
      .map((food) => {
        let score = 0;
        if (foodType && food.type === foodType) score += 5;
        if (taste && food.taste === taste) score += 4;
        if (ingredients.length && ingredients.every((i) => food.ingredients.includes(i))) score += 3;
        if (isDiet && food.healthyDiet) score += 2;

        if (dietType && food.dietType === dietType) score += 3;
        if (mealTime && food.mealTime === mealTime) score += 2;
        if (price === '10000원 미만' && food.price === '10000원 미만') score += 1;
        else if (price === '20000원 미만' && food.price !== '20000원 이상') score += 1;
        return { ...food, score };
      });

    const sortedFoods = scoredFoods.sort((a, b) => b.score - a.score);
    const topTwoFoods = sortedFoods.slice(0, 2);

    setFilteredFoods(topTwoFoods);
  }, [surveyData]);
  return filteredFoods;
};

export default useFilterFoods;
