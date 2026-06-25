import { motion, useDragControls, usePresence } from 'framer-motion';
import { useMemo, useState, useRef } from 'react';

import useUIStore from '@/store/uiStore';
import { useDraggableElement, useWindowResize, useIsMobile } from '@/hooks';
import { getAppComponent } from '@/components/apps/app-config';

import WindowLayout from './window-layout';

import './window.scss';

interface WindowProps {
  id: string;
}

function Window({ id }: WindowProps) {
  const storeWindowData = useUIStore((state) => state.windows.find((win) => win.id === id));
  const lastWindowDataRef = useRef<typeof storeWindowData>(undefined);

  if (storeWindowData) {
    lastWindowDataRef.current = storeWindowData;
  }

  const windowData = storeWindowData || lastWindowDataRef.current;
  const [isPresent] = usePresence();
  const transformOrigin = isPresent ? 'center bottom' : 'right top';

  const closeWindow = useUIStore((state) => state.closeWindow);
  const focusWindow = useUIStore((state) => state.focusWindow);
  const updateWindowStatus = useUIStore((state) => state.updateWindowStatus);
  const FIXED_MENU_HEIGHT = useUIStore((state) => state.CONSTANTS.FIXED_MENU_HEIGHT);
  const viewportSize = useUIStore((state) => state.viewport);
  const maxZIndex = useUIStore((state) => state.maxZIndex);

  const isMobile = useIsMobile();

  const safeX = windowData?.x ?? 0;
  const safeY = windowData?.y ?? 0;
  const safeW = windowData?.width ?? 0;
  const safeH = windowData?.height ?? 0;
  const safeStatus = windowData?.status ?? 'normal';

  const { dragProps } = useDraggableElement(id, 'window', safeX, safeY);
  const { localDims, isResizing, handlePointerDown } = useWindowResize(id, safeX, safeY, safeW, safeH);
  const controls = useDragControls();

  const isMaximized = safeStatus === 'maximized' || isMobile;
  const isDraggable = !isMaximized && !isResizing;
  const isFocused = windowData?.zIndex === maxZIndex;

  const targetDims = useMemo(
    () => ({
      x: isMaximized ? 0 : localDims.x,
      y: isMaximized ? 0 : localDims.y,
      width: isMaximized ? viewportSize.width : localDims.width,
      height: isMaximized ? viewportSize.height - (isMobile ? 48 : FIXED_MENU_HEIGHT) : localDims.height,
    }),
    [isMaximized, localDims, viewportSize.width, viewportSize.height, FIXED_MENU_HEIGHT, isMobile]
  );

  const isMinimized = safeStatus === 'minimized';
  const [shouldHide, setShouldHide] = useState(isMinimized);
  const [prevIsMinimized, setPrevIsMinimized] = useState(isMinimized);

  if (isMinimized !== prevIsMinimized) {
    setPrevIsMinimized(isMinimized);
    if (!isMinimized) {
      setShouldHide(false);
    }
  }

  const handleAnimationComplete = () => {
    if (isMinimized) {
      setShouldHide(true);
    }
  };

  if (!windowData) return null;

  const AppComponent = getAppComponent(windowData.appName);

  const handleStartDrag = (event: React.PointerEvent) => {
    if (event.button !== 2 && !isMaximized) controls.start(event);
  };

  const handleClose = () => closeWindow(id);
  const handleMinimize = () => updateWindowStatus(id, 'minimized');
  const handleMaximize = () => {
    if (isMobile) return;
    updateWindowStatus(id, isMaximized ? 'normal' : 'maximized');
  };

  return (
    <motion.div
      className={`window ${safeStatus} ${isFocused ? 'active' : 'inactive'}`}
      dragControls={controls}
      drag={isDraggable}
      dragListener={false}
      onMouseDown={() => focusWindow(id)}
      initial={{
        scale: 0.9,
        opacity: 0,
        x: targetDims.x,
        y: targetDims.y,
        width: targetDims.width,
        height: targetDims.height,
      }}
      animate={{
        ...targetDims,
        scale: isMinimized ? 0.3 : 1,
        opacity: isMinimized ? 0 : 1,
      }}
      exit={{
        scale: 0.3,
        opacity: 0,
      }}
      onAnimationComplete={handleAnimationComplete}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 25,
        mass: 0.8,
      }}
      style={{
        zIndex: windowData.zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
        transformOrigin,
        ...(shouldHide && { display: 'none' }),
      }}
      {...dragProps}
    >
      {!isMaximized && (
        <div className="resize-handles">
          <div className="resize-handle n" onPointerDown={(e) => handlePointerDown(e, 'n')} />
          <div className="resize-handle e" onPointerDown={(e) => handlePointerDown(e, 'e')} />
          <div className="resize-handle s" onPointerDown={(e) => handlePointerDown(e, 's')} />
          <div className="resize-handle w" onPointerDown={(e) => handlePointerDown(e, 'w')} />
          <div className="resize-handle ne" onPointerDown={(e) => handlePointerDown(e, 'ne')} />
          <div className="resize-handle nw" onPointerDown={(e) => handlePointerDown(e, 'nw')} />
          <div className="resize-handle se" onPointerDown={(e) => handlePointerDown(e, 'se')} />
          <div className="resize-handle sw" onPointerDown={(e) => handlePointerDown(e, 'sw')} />
        </div>
      )}

      <WindowLayout
        iconSrc={windowData.iconSrc}
        title={windowData.title}
        isMaximized={isMaximized}
        handleClose={handleClose}
        handleMinimize={handleMinimize}
        handleMaximize={handleMaximize}
        handleStartDrag={handleStartDrag}
        isMobile={isMobile}
      >
        <AppComponent windowId={id} {...(windowData.appProps ?? {})} />
      </WindowLayout>
    </motion.div>
  );
}

export default Window;
