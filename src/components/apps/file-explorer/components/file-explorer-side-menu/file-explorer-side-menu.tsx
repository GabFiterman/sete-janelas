import { useFileExplorerStore } from '../../use-file-explorer';
import { useIsMobile } from '@/hooks';

import { BtnIconTextLink } from '@/components';
import { ITEMS_MAP_ALL, STRUCTURE_MAP_SIDE_MENU, type FileSystemItem } from '@/constants';
import { normalizeStringForPath } from '@/utils';

function FileExplorerSideMenu() {
  const { getIsItemSelected, navigateTo, toggleItemSelection, isSidebarOpen, setIsSidebarOpen } =
    useFileExplorerStore();
  const isMobile = useIsMobile();

  const handleItemClick = (item: FileSystemItem | null | undefined) => {
    if (!item) return;
    navigateTo(item);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleItemInteraction = (event: React.MouseEvent, item: FileSystemItem) => {
    if (isMobile) {
      navigateTo(item);
      setIsSidebarOpen(false);
    } else {
      toggleItemSelection(event, item);
    }
  };

  return (
    <aside className={`file-explorer-side-menu ${isMobile && isSidebarOpen ? 'mobile-open' : ''}`}>
      {STRUCTURE_MAP_SIDE_MENU &&
        Object.entries(STRUCTURE_MAP_SIDE_MENU).map(([pathKey, subItems]) => {
          const mainItem = ITEMS_MAP_ALL[normalizeStringForPath(pathKey)];
          if (!mainItem) return null;

          return (
            <div className="side-menu-container" key={mainItem.uri}>
              <BtnIconTextLink
                className="side-menu-item pl-15 py-1"
                icon={mainItem.iconSrc}
                onClick={(event) => handleItemInteraction(event, mainItem)}
                onDoubleClick={() => handleItemClick(mainItem)}
                text={mainItem.label}
                selected={getIsItemSelected(mainItem)}
              />
              {subItems?.length > 0 &&
                subItems.map(
                  (subItem) =>
                    subItem?.type &&
                    subItem.type !== 'file' && (
                      <BtnIconTextLink
                        className="side-menu-subitem pl-28 py-1"
                        icon={subItem.iconSrc}
                        key={subItem.uri}
                        onClick={(event) => handleItemInteraction(event, subItem)}
                        onDoubleClick={() => handleItemClick(subItem)}
                        text={subItem.label}
                        selected={getIsItemSelected(subItem)}
                      />
                    )
                )}
            </div>
          );
        })}
    </aside>
  );
}

export default FileExplorerSideMenu;
