// import { StatusListType } from "@/pages/codesList/components/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreType {
  isCreateHakathonModalOpen: boolean;
  setIsCreateHakathonModalOpen: (isOpen: boolean) => void;
  isUserProfileCompleted: boolean;
  setIsUserProfileCompleted: (isCompleted: boolean) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      isCreateHakathonModalOpen: false,
      setIsCreateHakathonModalOpen: (isOpen) => set({ isCreateHakathonModalOpen: isOpen }),
      isUserProfileCompleted: false,
      setIsUserProfileCompleted: (isCompleted) => set({ isUserProfileCompleted: isCompleted }),
      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),
    }),
    {
      name: "app-store",
    },
  ),
);
