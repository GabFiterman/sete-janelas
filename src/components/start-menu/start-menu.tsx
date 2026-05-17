import useUIStore from '@/store/uiStore';
import useStartMenuStates from './use-start-menu';
import { useIsMobile } from '@/hooks';

import { InputAndIcon } from '@/components';
import { indicationArrowIcon, personalUserIcon } from '@/assets';
import './start-menu.scss';

function StartMenu() {
  const { isStartMenuOpen, setIsStartMenuOpen } = useUIStore();
  const isMobile = useIsMobile();

  const { handleAppClick, startMenuApps, startMenuShortcuts } = useStartMenuStates();

  return (
    isStartMenuOpen && (
      <div
        className={`start-menu ${isMobile ? 'mobile-fullscreen' : ''}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className="start-menu-left-container"
          onMouseDown={() => {
            if (isMobile) {
              setIsStartMenuOpen(false);
            }
          }}
        >
          <div className="start-menu-apps" onMouseDown={(event) => event.stopPropagation()}>
            {startMenuApps.map((item) => (
              <div
                className="start-menu-app-item"
                key={item.id}
                onMouseDown={(event) => handleAppClick(event, item.action)}
              >
                <img src={item.icon} className="start-menu-icon" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="start-menu-app-controller" onMouseDown={(event) => event.stopPropagation()}>
            <div className="start-menu-app-divider" />

            <div className="start-menu-app-all-apps disabled">
              <img src={indicationArrowIcon} className="disabled" />
              <span className="disabled">Todos os programas</span>
            </div>

            <div className="start-menu-app-search">
              <InputAndIcon type="text" placeholder="Pesquisar programas e arquivos" disabled />
            </div>
          </div>
        </div>

        <div className="start-menu-right-container">
          <div className="start-menu-right-top">
            <div className="start-menu-user-image">
              <img src={personalUserIcon} />
            </div>
            <div className="start-menu-shortcuts-container">
              <div className="start-menu-shortcuts">
                {startMenuShortcuts.map((item) => (
                  <div
                    key={item.id}
                    className="start-menu-shortcut-item"
                    onMouseDown={(event) => handleAppClick(event, item.action)}
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="start-menu-right-bottom">
            <div className="start-menu-buttons-container disabled">
              <button
                className="start-menu-button button-turn-off disabled"
                disabled={true}
                onClick={() => console.log('DESLIGAR')}
              >
                Desligar
              </button>
              <button
                className="start-menu-button button-more-options disabled"
                disabled={true}
                onClick={() => console.log('LIMPAR')}
              >
                <img src={indicationArrowIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default StartMenu;
