import {
  FileExplorerCanvas,
  FileExplorerController,
  FileExplorerFooter,
  FileExplorerHeader,
  FileExplorerSideMenu,
} from './components';
import { useFileExplorerStore } from './use-file-explorer';
import { useIsMobile } from '@/hooks';

import './file-explorer.scss';

import { useEffect } from 'react';

function FileExplorer() {
  const { isSidebarOpen, setIsSidebarOpen } = useFileExplorerStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleAppBack = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.windowId === 'file-explorer-window') {
        const store = useFileExplorerStore.getState();
        if (store.historyIndex > 0) {
          store.goBack();
          customEvent.preventDefault();
        }
      }
    };
    window.addEventListener('app-back-navigation', handleAppBack);
    return () => {
      window.removeEventListener('app-back-navigation', handleAppBack);
    };
  }, []);

  return (
    <div className="file-explorer">
      <header className="py-5 px-10">
        <FileExplorerHeader />
      </header>
      <section className="py-5 px-10">
        <FileExplorerController />
      </section>
      <section className="file-explorer-content py-2 px-10">
        {isMobile && isSidebarOpen && (
          <div className="file-explorer-mobile-backdrop" onClick={() => setIsSidebarOpen(false)} />
        )}
        <FileExplorerSideMenu />
        <FileExplorerCanvas />
      </section>
      <footer>
        <FileExplorerFooter />
      </footer>
    </div>
  );
}

export default FileExplorer;
