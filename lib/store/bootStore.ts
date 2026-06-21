import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BootStore {
  hasBooted: boolean;
  bootComplete: () => void;
  resetBoot: () => void;
}

export const useBootStore = create<BootStore>()(
  persist(
    (set) => ({
      hasBooted: false,
      bootComplete: () => set({ hasBooted: true }),
      resetBoot: () => set({ hasBooted: false }),
    }),
    {
      name: 'pinakos_booted',
    }
  )
);
