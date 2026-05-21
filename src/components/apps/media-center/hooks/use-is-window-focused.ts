import useUIStore from '@/store/uiStore';

/**
 * Custom hook to check if a specific window is focused based on the store's max zIndex.
 *
 * @param windowId The ID of the window to check.
 * @returns boolean indicating if the window is currently focused.
 */
export function useIsWindowFocused(windowId: string | undefined): boolean {
  const maxZIndex = useUIStore((state) => state.maxZIndex);

  return useUIStore((state) => {
    if (!windowId) return true;
    const win = state.windows.find((w) => w.id === windowId);
    return win ? win.zIndex === maxZIndex : false;
  });
}
