import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    immer((set) => {
      return {
        user: {},
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
