import { DatetimeWidget } from '../common/widgets';

import { FixedMenuTaskbarItem } from './components';
import { useFixedMenu } from './hooks';

import { ArrowLeft, Search } from '@/assets';

import './fixed-menu.scss';

export function FixedMenu() {
  const {
    activeWindowsByApp,
    handleBack,
    handleClickMainItem,
    handleSearch,
    isBackEnabled,
    isMobile,
    mainItem,
    menuItems,
    toggleIsStartMenuOpen,
  } = useFixedMenu();

  if (isMobile) {
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
