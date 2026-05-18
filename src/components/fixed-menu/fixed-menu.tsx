import { useMemo } from 'react';
import useUIStore from '@/store/uiStore';

import useFixedMenuStates from './use-fixed-menu';
import { FixedMenuTaskbarItem } from './components';
import { DatetimeWidget } from '../common/widgets';
import { ArrowLeft, Search, internetExplorerIcon } from '@/assets';
import { useIsMobile } from '@/hooks';
import './fixed-menu.scss';

interface GroupedWindows {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [appName: string]: any;
}

function FixedMenu() {
  const { menuItems, mainItem, handleClickMainItem } = useFixedMenuStates();
  const windows = useUIStore((state) => state.windows);
  const closeWindow = useUIStore((state) => state.closeWindow);
  const toggleIsStartMenuOpen = useUIStore((state) => state.toggleIsStartMenuOpen);
  const openWindow = useUIStore((state) => state.openWindow);
  const isStartMenuOpen = useUIStore((state) => state.isStartMenuOpen);
  const setIsStartMenuOpen = useUIStore((state) => state.setIsStartMenuOpen);
  const isMobile = useIsMobile();

  const activeWindowsByApp = useMemo(() => {
    return windows.reduce((acc, window) => {
      const { appName } = window;
      if (!acc[appName]) {
        acc[appName] = [];
      }
      acc[appName].push(window);
      return acc;
    }, {} as GroupedWindows);
  }, [windows]);

  const openWindows = useMemo(() => {
    return windows.filter((w) => w.status !== 'minimized');
  }, [windows]);

  const activeWindow = useMemo(() => {
    if (openWindows.length === 0) return null;
    return [...openWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
  }, [openWindows]);

  const handleBack = () => {
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
      return;
    }
    if (activeWindow) {
      const customEvent = new CustomEvent('app-back-navigation', {
        detail: { windowId: activeWindow.id, appName: activeWindow.appName },
        cancelable: true,
      });
      window.dispatchEvent(customEvent);
      if (!customEvent.defaultPrevented) {
        closeWindow(activeWindow.id);
      }
    }
  };

  const handleSearch = () => {
    setIsStartMenuOpen(true, true);
  };

  if (isMobile) {
    const isBackEnabled = !!activeWindow || isStartMenuOpen;
    return (
      <div className="fixed-menu mobile-navbar">
        <button
          className={`nav-button back-button ${!isBackEnabled ? 'disabled' : ''}`}
          onClick={handleBack}
          disabled={!isBackEnabled}
        >
          <ArrowLeft size={24} color={isBackEnabled ? '#ffffff' : '#555555'} />
        </button>
        <button
          className="nav-button windows-button"
          onClick={(event) => {
            event.stopPropagation();
            toggleIsStartMenuOpen();
          }}
        >
          <img src={mainItem.icon} alt="Windows" className="nav-windows-icon" />
        </button>
        <button className="nav-button search-button" onClick={handleSearch}>
          <Search size={24} color="#ffffff" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed-menu">
        <div className="main-icon-container">
          <img
            src={mainItem.icon}
            alt={mainItem.label}
            className="main-icon"
            onMouseDown={(event) => handleClickMainItem(event)}
          />
        </div>
        <div className="menu-items-container">
          {menuItems.map((item) => {
            const windowsForApp = activeWindowsByApp[item.appName as string] || [];
            return (
              <FixedMenuTaskbarItem
                key={item.id}
                appName={item.appName as string}
                iconSrc={item.icon}
                windows={windowsForApp}
                onOpenNew={item.action}
              />
            );
          })}
        </div>

        <div className="menu-widgets-container">
          <div className="menu-widget-container">
            <DatetimeWidget />
          </div>
        </div>
      </div>
    </>
  );
}

export default FixedMenu;
