import { useEffect, useState } from 'react';
import { useGetRecipes } from './useRecipeQueries';

export const useRecipes = (searchTerm) => {
  const { data: recipes } = useGetRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (recipes) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (recipes) {
      const filtered = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredRecipes(filtered);
    }
    window.scrollTo(0, 0); // 검색 시 스크롤 위치를 상단으로 이동, 화면 흔들림 방지
  }, [searchTerm, recipes]);

  return filteredRecipes;
};
