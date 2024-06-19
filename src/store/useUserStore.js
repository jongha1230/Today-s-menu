import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useUserStore = create(
  persist(
    immer((set) => {
      return {
        user: null,
        setUser: function (userInfo) {
          set(function () {
            return {
              user: userInfo
            };
          });
        }
      };
    }),
    {
      name: 'user-store'
    }
  )
);

export default useUserStore;
