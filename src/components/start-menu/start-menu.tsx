import { useState, useEffect, useRef } from 'react';
import useUIStore from '@/store/uiStore';
import useStartMenuStates from './use-start-menu';
import { useIsMobile } from '@/hooks';
import { useFileExplorerStore } from '@/components/apps/file-explorer/use-file-explorer';
import { searchVFS } from '@/constants';

import { InputAndIcon } from '@/components';
import { indicationArrowIcon, personalUserIcon } from '@/assets';
import './start-menu.scss';

function StartMenu() {
  const { isStartMenuOpen, setIsStartMenuOpen, startMenuAutofocusSearch } = useUIStore();
  const isMobile = useIsMobile();
  const { navigateTo } = useFileExplorerStore();

  const { handleAppClick, startMenuApps, startMenuShortcuts } = useStartMenuStates();
  const [searchVal, setSearchVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isStartMenuOpen) {
      setSearchVal('');
      if (startMenuAutofocusSearch) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }
    }
  }, [isStartMenuOpen, startMenuAutofocusSearch]);

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
            {searchVal.trim() ? (
              <div className="start-menu-search-results">
                {searchVFS(searchVal).length > 0 ? (
                  searchVFS(searchVal).map((item, index) => (
                    <div
                      key={item.path || index}
                      className="start-menu-search-item"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        navigateTo(item);
                        setIsStartMenuOpen(false);
                      }}
                    >
                      <img src={item.iconSrc} className="start-menu-search-icon" />
                      <div className="start-menu-search-details">
                        <span className="start-menu-search-label">
                          {item.label}
                          {item.type === 'file' ? item.extension : ''}
                        </span>
                        <span className="start-menu-search-path">{item.path}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="start-menu-search-no-results">
                    Nenhum resultado encontrado.
                  </div>
                )}
              </div>
            ) : (
              startMenuApps.map((item) => (
                <div
                  className="start-menu-app-item"
                  key={item.id}
                  onMouseDown={(event) => handleAppClick(event, item.action)}
                >
                  <img src={item.icon} className="start-menu-icon" />
                  <span>{item.label}</span>
                </div>
              ))
            )}
          </div>

          <div className="start-menu-app-controller" onMouseDown={(event) => event.stopPropagation()}>
            <div className="start-menu-app-divider" />

            <div className="start-menu-app-all-apps disabled">
              <img src={indicationArrowIcon} className="disabled" />
              <span className="disabled">Todos os programas</span>
            </div>

            <div className="start-menu-app-search">
              <InputAndIcon
                ref={inputRef}
                type="text"
                placeholder="Pesquisar programas e arquivos"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
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
