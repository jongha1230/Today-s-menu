import { create } from 'zustand';

const useModalStore = create((set) => ({
  currentPage: 0,
  totalPages: 7,
  nextPage: () =>
    set((state) => ({
      currentPage: state.currentPage + 1 < state.totalPages ? state.currentPage + 1 : state.currentPage
    })),
  prevPage: () =>
    set((state) => ({
      currentPage: state.currentPage - 1 >= 0 ? state.currentPage - 1 : state.currentPage
    })),
  resetPage: () => set({ currentPage: 0 })
}));

export default useModalStore;
