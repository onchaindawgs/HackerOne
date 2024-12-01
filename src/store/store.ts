// import { StatusListType } from "@/pages/codesList/components/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreType {
  isCreateHakathonModalOpen: boolean;
  setIsCreateHakathonModalOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      isCreateHakathonModalOpen: false,
      setIsCreateHakathonModalOpen: (isOpen) => set({ isCreateHakathonModalOpen: isOpen }),
    }),
    {
      name: "app-store",
    },
  ),
);
