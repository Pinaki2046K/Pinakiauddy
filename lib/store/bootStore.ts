import { create } from 'zustand';

interface BootStore {
  hasBooted: boolean;
  bootComplete: () => void;
  resetBoot: () => void;
}

export const useBootStore = create<BootStore>((set) => ({
  hasBooted: false,
  bootComplete: () => set({ hasBooted: true }),
  resetBoot: () => set({ hasBooted: false }),
}));
