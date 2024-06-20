import { create } from 'zustand';

const useMainStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',
  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
  setFilteredRecipes: (filteredRecipes) => set({ filteredRecipes }),
  setSearchTerm: (searchTerm) => {
    const recipes = get().recipes;
    const filtered = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
    set({ searchTerm, filteredRecipes: filtered });
  }
}));

export default useMainStore;
