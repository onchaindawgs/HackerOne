// import { StatusListType } from "@/pages/codesList/components/types";
import { WalletData } from "okto-sdk-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreType {
  isCreateHakathonModalOpen: boolean;
  setIsCreateHakathonModalOpen: (isOpen: boolean) => void;
  isUserProfileCompleted: boolean;
  setIsUserProfileCompleted: (isCompleted: boolean) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  wallets: WalletData | null;
  setWallets: (wallets: WalletData | null) => void;
  resetStore: () => void;
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
      wallets: null,
      setWallets: (wallets) => set({ wallets }),
      resetStore: () =>
        set({
          isCreateHakathonModalOpen: false,
          isUserProfileCompleted: false,
          authToken: null,
          wallets: null,
        }),
    }),
    {
      name: "app-store",
    },
  ),
);
