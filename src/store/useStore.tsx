import { create } from 'zustand';

interface State {
  isUsername: boolean;
  toggleUsername: () => void;
  player: any;
  setPlayer: (playerDetail: any) => void;
  token: string;
  setJwtToken: (token: string) => void;
  showQuestion: boolean;
  setShowQuestion: (showQuestion: boolean) => void;
}

const useStore = create<State>((set) => ({
  isUsername: false,
  toggleUsername: () => set((state) => ({ isUsername: !state.isUsername })),
  player: {},
  setPlayer: (playerDetail: any) => {
    set((state) => ({ ...state, player: playerDetail }));
    console.log('playerdeyails', playerDetail);
  },
  token: "",
  setJwtToken: (token: any) => { set((state) => ({ ...state, token: token })) },
  showQuestion: true,
  setShowQuestion: (question: boolean) => { set((state) => ({ ...state, showQuestion: question })) }
}));

export default useStore;
