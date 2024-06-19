import { create } from 'zustand';

const useMainStore = create((set) => ({
  cards: [],
  filteredCards: [],
  searchTerm: '',
  isModalOpen: false,
  setCards: (data) => set({ cards: data, filteredCards: data }),
  setFilteredCards: (data) => set({ filteredCards: data }),
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.cards.filter((card) => card.title.toLowerCase().includes(term.toLowerCase()));
      return { searchTerm: term, filteredCards: filtered };
    }),
  handleModalToggle: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}));

export default useMainStore;
