import { create } from 'zustand';

export type WindowId =
  | 'about'
  | 'projects'
  | 'resume'
  | 'readme'
  | 'contact'
  | `project-${string}`;

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: Record<string, WindowState>;
  topZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  isOpen: (id: WindowId) => boolean;
  isMinimized: (id: WindowId) => boolean;
  isFocused: (id: WindowId) => boolean;
}

const DEFAULT_Z = 10;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  topZIndex: DEFAULT_Z,

  openWindow: (id) => {
    const { windows, topZIndex } = get();
    const existing = windows[id];
    const newZ = topZIndex + 1;

    if (existing?.isOpen && !existing.isMinimized) {
      // already open — just focus it
      set((s) => ({
        topZIndex: newZ,
        windows: {
          ...s.windows,
          ...Object.fromEntries(
            Object.keys(s.windows).map((k) => [k, { ...s.windows[k], isFocused: k === id }])
          ),
          [id]: { ...s.windows[id], isFocused: true, zIndex: newZ },
        },
      }));
      return;
    }

    // unfocus all others, open this one
    const unfocused = Object.fromEntries(
      Object.keys(windows).map((k) => [k, { ...windows[k], isFocused: false }])
    );

    set({
      topZIndex: newZ,
      windows: {
        ...unfocused,
        [id]: {
          id,
          isOpen: true,
          isMinimized: false,
          isFocused: true,
          zIndex: newZ,
        },
      },
    });
  },

  closeWindow: (id) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isOpen: false, isMinimized: false, isFocused: false },
      },
    }));
  },

  minimizeWindow: (id) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isMinimized: true, isFocused: false },
      },
    }));
  },

  restoreWindow: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((s) => ({
      topZIndex: newZ,
      windows: {
        ...s.windows,
        ...Object.fromEntries(
          Object.keys(s.windows).map((k) => [k, { ...s.windows[k], isFocused: false }])
        ),
        [id]: { ...s.windows[id], isMinimized: false, isFocused: true, zIndex: newZ },
      },
    }));
  },

  focusWindow: (id) => {
    const { topZIndex, windows } = get();
    if (windows[id]?.isFocused) return;
    const newZ = topZIndex + 1;
    set((s) => ({
      topZIndex: newZ,
      windows: {
        ...s.windows,
        ...Object.fromEntries(
          Object.keys(s.windows).map((k) => [k, { ...s.windows[k], isFocused: false }])
        ),
        [id]: { ...s.windows[id], isFocused: true, zIndex: newZ },
      },
    }));
  },

  isOpen: (id) => {
    const w = get().windows[id];
    return !!w?.isOpen;
  },
  isMinimized: (id) => {
    const w = get().windows[id];
    return !!w?.isMinimized;
  },
  isFocused: (id) => {
    const w = get().windows[id];
    return !!w?.isFocused;
  },
}));
