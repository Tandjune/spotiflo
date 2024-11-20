import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  view: string;
  onOpen: (view: string) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "sign_in",
  onOpen: (view: string) => set({ isOpen: true, view: view }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
