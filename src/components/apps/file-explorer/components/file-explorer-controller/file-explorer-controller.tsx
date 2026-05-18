import { controllerItems, actionItems } from '../../constants/file-explorer-constants';
import { AppControllerWidget } from '@/components';
import { useIsMobile } from '@/hooks';
import { useFileExplorerStore } from '../../use-file-explorer';
import { IoMdMenu } from 'react-icons/io';

function FileExplorerController() {
  const isMobile = useIsMobile();
  const { isSidebarOpen, setIsSidebarOpen } = useFileExplorerStore();

  return (
    <div className="file-explorer-controller-container">
      {isMobile && (
        <button
          type="button"
          className="sidebar-toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <IoMdMenu size={20} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Menu</span>
        </button>
      )}
      <AppControllerWidget
        controllerItems={controllerItems}
        actionItems={actionItems}
        onClickControllerItem={(event, item) => console.log('onClickControllerItem', { item, event })}
        onClickControllerDropdownItem={(event, item) => console.log('onClickControllerDropdownItem', { item, event })}
        controllerStyle="default"
      />
    </div>
  );
}

export default FileExplorerController;
