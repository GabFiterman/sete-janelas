import { useState, useEffect, useRef } from 'react';
import { useFileExplorerStore } from '../../use-file-explorer';
import { BtnForwardBackward, InputAndIcon } from '@/components';
import { folderUserIcon, Reload, Search, ArrowDropdown } from '@/assets';
import { searchVFS, ITEMS_MAP_ALL } from '@/constants';

function FileExplorerHeader() {
  const {
    currentPath,
    historyIndex,
    searchQuery,

    getHistoryLength,
    goBack,
    goForward,
    navigateTo,
    setSearchQuery,
  } = useFileExplorerStore();

  const [pathVal, setPathVal] = useState(currentPath);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPathVal(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePathKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const normalizedInput = pathVal.trim().toUpperCase();
      const matchedItem = ITEMS_MAP_ALL[normalizedInput];
      if (matchedItem && (matchedItem.type === 'folder' || matchedItem.type === 'drive')) {
        navigateTo(matchedItem);
        setIsDropdownOpen(false);
      } else {
        setSearchQuery(pathVal);
        setIsDropdownOpen(false);
      }
    }
  };

  const suggestions = searchVFS(pathVal);

  return (
    <div className="file-explorer-header">
      <div className="buttons-container">
        <BtnForwardBackward
          handleLeftClick={() => goBack()}
          handleRightClick={() => goForward()}
          handleDownClick={() => console.log('downward')}
          disableLeftClick={getHistoryLength() === 0 || historyIndex === 0}
          disableRightClick={getHistoryLength() === historyIndex}
          disableDropdownClick={true}
        />
      </div>

      <div className="query-container url-container" ref={dropdownRef}>
        <InputAndIcon
          placeholder="C:/Users/Fiterman/Documents"
          type="text"
          value={pathVal}
          onChange={(e) => {
            setPathVal(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handlePathKeyDown}
          childBefore={
            <>
              <img src={folderUserIcon} alt="folder icon" width={30} height={30} />
            </>
          }
          childAfter={
            <>
              <div className="controller">
                <ArrowDropdown
                  size={30}
                  color="#000000"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <button onClick={() => setPathVal(currentPath)}>
                  <Reload color="#3791CB" size={18} />
                </button>
              </div>
            </>
          }
        />

        {isDropdownOpen && pathVal.trim() && suggestions.length > 0 && (
          <div className="address-bar-dropdown">
            {suggestions.slice(0, 10).map((item, index) => (
              <div
                key={item.path || index}
                className="address-bar-dropdown-item"
                onClick={() => {
                  navigateTo(item);
                  setIsDropdownOpen(false);
                }}
              >
                <img src={item.iconSrc} className="dropdown-item-icon" />
                <div className="dropdown-item-details">
                  <span className="dropdown-item-label">
                    {item.label}
                    {item.type === 'file' ? item.extension : ''}
                  </span>
                  <span className="dropdown-item-path">{item.path}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="query-container search-container">
        <InputAndIcon
          placeholder="Pesquisar Fiterman"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          childAfter={
            <>
              <Search color="#3791CB" size={20} />
              <ArrowDropdown size={22} />
            </>
          }
        />
      </div>
    </div>
  );
}

export default FileExplorerHeader;
