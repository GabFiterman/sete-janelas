import { create } from 'zustand';
// import { fileExplorerIcon, folderIcon, pictureIcon } from '@/assets/icons';
import { type AppName } from '@/components/apps/app-config';
import { ITEMS_MAP_WORKSPACE, type FileSystemItem } from '@/constants';

export interface WorkspaceIcon extends FileSystemItem {
  x: number;
  y: number;
}

export interface WindowState {
  appName: AppName;
  appProps?: Record<string, unknown>;
  height: number;
  heightRatio?: number;
  iconSrc: string;
  id: string;
  status: 'normal' | 'minimized' | 'maximized';
  title: string;
  width: number;
  widthRatio?: number;
  x: number;
  y: number;
  zIndex: number;
}

export interface GroupedWindows {
  [appName: string]: WindowState[];
}

const INITIAL_USER_WINDOW = {
  width: Number(window.innerWidth),
  height: Number(window.innerHeight),
  x: 0,
  y: 0,
};

interface UIState {
  CONSTANTS: {
    FIXED_MENU_HEIGHT: number;
    WINDOW_DEFAULT_WIDTH: number;
    WINDOW_DEFAULT_HEIGHT: number;
    WINDOW_MAX_WIDTH?: number;
    WINDOW_MAX_HEIGHT?: number;
  };

  isBooting: boolean;
  isStartMenuOpen: boolean;
  maxZIndex: number;
  viewport: { width: number; height: number };
  windows: WindowState[];
  workspaceIcons: WorkspaceIcon[];

  setIsBooting: (isBooting: boolean) => void;

  activeWindowsByApp: () => GroupedWindows;

  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  openWindow: (
    window: Omit<WindowState, 'zIndex' | 'x' | 'y' | 'status' | 'width' | 'height'> &
      Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height' | 'status' | 'appProps'>>
  ) => void;
  setIsStartMenuOpen: (isOpen: boolean) => void;
  setViewport: (width: number, height: number) => void;
  toggleIsStartMenuOpen: (event?: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  updateWindowDimensions: (id: string, newX: number, newY: number, newWidth: number, newHeight: number) => void;
  updateWindowPosition: (id: string, newX: number, newY: number) => void;
  updateWindowStatus: (id: string, newStatus: WindowState['status']) => void;
  updateWorkspaceIconPosition: (path: string, newX: number, newY: number) => void;
}

const useUIStore = create<UIState>((set, get) => ({
  CONSTANTS: {
    FIXED_MENU_HEIGHT: 35,
    WINDOW_DEFAULT_WIDTH: 1200,
    WINDOW_DEFAULT_HEIGHT: 800,
    WINDOW_MAX_HEIGHT: INITIAL_USER_WINDOW.height,
    WINDOW_MAX_WIDTH: INITIAL_USER_WINDOW.width,
  },

  viewport: {
    width: INITIAL_USER_WINDOW.width,
    height: INITIAL_USER_WINDOW.height,
  },

  isStartMenuOpen: false,
  maxZIndex: 1000,
  windows: [],
  workspaceIcons: ITEMS_MAP_WORKSPACE.map((item, index) => ({
    ...item,
    x: (index % 2) * 150,
    y: Math.floor(index / 2) * 150,
  })),

  isBooting: true,
  setIsBooting: (isBooting) => set({ isBooting }),

  activeWindowsByApp: () => {
    const windows = get().windows;

    return windows.reduce((acc, window) => {
      const { appName } = window;
      if (!acc[appName]) {
        acc[appName] = [];
      }
      acc[appName].push(window);
      return acc;
    }, {} as GroupedWindows);
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    }));
  },

  focusWindow: (id) =>
    set((state) => {
      const newZIndex = state.maxZIndex + 1;
      return {
        windows: state.windows.map((window) => (window.id === id ? { ...window, zIndex: newZIndex } : window)),
        maxZIndex: newZIndex,
      };
    }),

  openWindow: (newWindow) =>
    set((state) => {
      const { windows } = state;

      const existingWindow = windows.find((window) => window.id === newWindow.id);

      if (existingWindow) {
        const newZIndex = state.maxZIndex + 1;

        return {
          windows: windows.map((window) => {
            if (window.id === newWindow.id) {
              return {
                ...window,
                x: newWindow.x ?? window.x,
                y: newWindow.y ?? window.y,
                width: newWindow.width ?? window.width,
                height: newWindow.height ?? window.height,
                appProps: newWindow.appProps ?? window.appProps,
                zIndex: newZIndex,
                status: newWindow.status ?? window.status,
              };
            }
            return window;
          }),
          maxZIndex: newZIndex,
        };
      }

      const newZIndex = state.maxZIndex + 1;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const fixedMenu = get().CONSTANTS.FIXED_MENU_HEIGHT;
      const constants = get().CONSTANTS;

      const clampRatio = (r?: number) => {
        if (typeof r !== 'number' || Number.isNaN(r)) return undefined;
        return Math.max(0.05, Math.min(1, r));
      };

      const resolvedWidth = (w?: number, ratio?: number) => {
        const clamped = clampRatio(ratio);
        if (clamped !== undefined) {
          const val = Math.floor(screenW * clamped);
          return Math.min(val, constants.WINDOW_MAX_WIDTH ?? screenW);
        }
        if (typeof w === 'number') return w;
        return Math.min(constants.WINDOW_DEFAULT_WIDTH, Math.floor(screenW * 0.8));
      };

      const resolvedHeight = (h?: number, ratio?: number) => {
        const clamped = clampRatio(ratio);
        const availH = screenH - fixedMenu;
        if (clamped !== undefined) {
          const val = Math.floor(availH * clamped);
          return Math.min(val, constants.WINDOW_MAX_HEIGHT ?? availH);
        }
        if (typeof h === 'number') return h;
        return Math.min(constants.WINDOW_DEFAULT_HEIGHT, Math.floor(availH * 0.8));
      };

      return {
        windows: [
          ...state.windows,
          {
            ...newWindow,
            height: resolvedHeight(newWindow.height, newWindow.heightRatio),
            status: newWindow.status ?? 'normal',
            width: resolvedWidth(newWindow.width, newWindow.widthRatio),
            x: newWindow.x ?? 50,
            y: newWindow.y ?? 50,
            zIndex: newZIndex,
            iconSrc: newWindow.iconSrc,
            appProps: newWindow.appProps ?? {},
          } as WindowState,
        ],
        maxZIndex: newZIndex,
      };
    }),

  setIsStartMenuOpen: (isOpen) => set({ isStartMenuOpen: isOpen }),

  setViewport: (width, height) => set({ viewport: { width, height } }),

  toggleIsStartMenuOpen: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),

  updateWindowDimensions: (id, newX, newY, newWidth, newHeight) =>
    set((state) => {
      const { viewport, CONSTANTS } = state;
      const maxX = viewport.width - newWidth;
      const maxY = viewport.height - CONSTANTS.FIXED_MENU_HEIGHT - newHeight;

      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      return {
        windows: state.windows.map((window) =>
          window.id === id ? { ...window, x: clampedX, y: clampedY, width: newWidth, height: newHeight } : window
        ),
      };
    }),

  updateWindowPosition: (id, newX, newY) =>
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window) return state;

      const { viewport, CONSTANTS } = state;
      const maxX = viewport.width - window.width;
      const maxY = viewport.height - CONSTANTS.FIXED_MENU_HEIGHT - window.height;

      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));

      return {
        windows: state.windows.map((w) => (w.id === id ? { ...w, x: clampedX, y: clampedY } : w)),
      };
    }),

  updateWindowStatus: (id, newStatus) => {
    set((state) => ({
      windows: state.windows.map((window) => {
        if (window.id === id) {
          return { ...window, status: newStatus };
        }
        return window;
      }),
    }));
  },

  updateWorkspaceIconPosition: (path, newX, newY) =>
    set((state) => {
      const { viewport, CONSTANTS } = state;

      const clampedX = Math.max(0, Math.min(newX, viewport.width - 80));
      const clampedY = Math.max(0, Math.min(newY, viewport.height - CONSTANTS.FIXED_MENU_HEIGHT - 80));

      return {
        workspaceIcons: state.workspaceIcons.map((icon) =>
          icon.path === path ? { ...icon, x: clampedX, y: clampedY } : icon
        ),
      };
    }),
}));

export default useUIStore;
