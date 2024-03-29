import { create } from 'zustand';

interface State {
  isUsername: boolean;
  toggleUsername: () => void;
  player: any;
  setPlayer: (playerDetail: any) => void;
}

const useStore = create<State>((set) => ({
  isUsername: false,
  toggleUsername: () => set((state) => ({ isUsername: !state.isUsername })),
  player: {},
  setPlayer: (playerDetail: any) => {
    console.log('Setting player:', playerDetail); 
    set({ player: playerDetail });
  },
}));

export default useStore;
