import { useEffect, useRef } from 'react';
import { IeHeader, Webview, IeHomePage } from './components';
import { useInternetExplorer, INITIAL_URL } from './use-internet-explorer';
import useUIStore from '@/store/uiStore';
import './internet-explorer.scss';

export interface InternetExplorerProps {
  initialUrl?: string;
  windowId?: string;
}

function InternetExplorer({ initialUrl, windowId }: InternetExplorerProps) {
  const { navigateToUrl, currentUrl, reload, goBack, historyIndex } = useInternetExplorer();
  const goBackRef = useRef(goBack);
  const historyIndexRef = useRef(historyIndex);
  const updateWindowTitle = useUIStore((state) => state.updateWindowTitle);

  useEffect(() => {
    goBackRef.current = goBack;
    historyIndexRef.current = historyIndex;
  }, [goBack, historyIndex]);

  useEffect(() => {
    const handleAppBack = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.windowId === 'internet-explorer-window') {
        if (historyIndexRef.current > 0) {
          goBackRef.current();
          customEvent.preventDefault();
        }
      }
    };
    window.addEventListener('app-back-navigation', handleAppBack);
    return () => {
      window.removeEventListener('app-back-navigation', handleAppBack);
    };
  }, []);

  useEffect(() => {
    if (!initialUrl) return;
    navigateToUrl(initialUrl);
  }, [initialUrl, navigateToUrl]);

  useEffect(() => {
    if (windowId) {
      if (currentUrl === INITIAL_URL) {
        updateWindowTitle(windowId, 'Internet Explorer');
      } else {
        const displayUrl = currentUrl.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
        updateWindowTitle(windowId, `${displayUrl} - Internet Explorer`);
      }
    }
  }, [currentUrl, windowId, updateWindowTitle]);

  return (
    <div className="internet-explorer-container">
      <IeHeader />
      {currentUrl === INITIAL_URL ? <IeHomePage /> : <Webview key={reload} windowId={windowId} />}
    </div>
  );
}

export default InternetExplorer;

