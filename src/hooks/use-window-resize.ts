import { useEffect, useRef, useState } from 'react';
import useUIStore from '@/store/uiStore';

type ResizeDirection = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function useWindowResize(
  id: string,
  initialX: number,
  initialY: number,
  initialWidth: number,
  initialHeight: number
) {
  const { updateWindowDimensions, viewport, CONSTANTS } = useUIStore();
  const [isResizing, setIsResizing] = useState(false);
  const [localDims, setLocalDims] = useState({ x: initialX, y: initialY, width: initialWidth, height: initialHeight });

  const resizeState = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startWindowX: number;
    startWindowY: number;
    direction: ResizeDirection | null;
  }>({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startWindowX: 0,
    startWindowY: 0,
    direction: null,
  });

  useEffect(() => {
    if (!isResizing) {
      setLocalDims({ x: initialX, y: initialY, width: initialWidth, height: initialHeight });
    }
  }, [initialX, initialY, initialWidth, initialHeight, isResizing]);

  const handlePointerDown = (e: React.PointerEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    resizeState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: localDims.width,
      startHeight: localDims.height,
      startWindowX: localDims.x,
      startWindowY: localDims.y,
      direction,
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!resizeState.current.direction) return;

    const { startX, startY, startWidth, startHeight, startWindowX, startWindowY, direction } = resizeState.current;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newX = startWindowX;
    let newY = startWindowY;

    const MIN_WIDTH = 300;
    const MIN_HEIGHT = 200;

    // E / W
    if (direction.includes('e')) {
      newWidth = Math.min(Math.max(startWidth + deltaX, MIN_WIDTH), viewport.width - startWindowX);
    } else if (direction.includes('w')) {
      const possibleWidth = Math.max(startWidth - deltaX, MIN_WIDTH);
      if (possibleWidth !== startWidth) {
        newWidth = possibleWidth;
        newX = startWindowX + (startWidth - possibleWidth);
      }
    }

    // N / S
    if (direction.includes('s')) {
      newHeight = Math.min(
        Math.max(startHeight + deltaY, MIN_HEIGHT),
        viewport.height - CONSTANTS.FIXED_MENU_HEIGHT - startWindowY
      );
    } else if (direction.includes('n')) {
      const possibleHeight = Math.max(startHeight - deltaY, MIN_HEIGHT);
      if (possibleHeight !== startHeight) {
        newHeight = possibleHeight;
        newY = startWindowY + (startHeight - possibleHeight);
      }
    }

    // Constraints for X/Y not to go out of bounds (top/left)
    if (newX < 0) {
      newWidth += newX;
      newX = 0;
    }
    if (newY < 0) {
      newHeight += newY;
      newY = 0;
    }

    setLocalDims({ x: newX, y: newY, width: newWidth, height: newHeight });
  };

  const handlePointerUp = () => {
    setIsResizing(false);
    resizeState.current.direction = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);

    setLocalDims((curr) => {
      updateWindowDimensions(id, curr.x, curr.y, curr.width, curr.height);
      return curr;
    });
  };

  return { localDims, isResizing, handlePointerDown };
}
