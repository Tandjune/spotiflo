import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  paused?: boolean;
  setId: (id: string) => void;
  setPaused: (paused: boolean) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  paused: undefined,
  setId: (id: string) => set({ activeId: id }),
  setPaused: (paused: boolean) => set({ paused: paused }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
