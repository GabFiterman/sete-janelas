import { useEffect, useRef } from 'react';
import { IeHeader, Webview, IeHomePage } from './components';
import { useInternetExplorer, INITIAL_URL } from './use-internet-explorer';
import './internet-explorer.scss';

export interface InternetExplorerProps {
  initialUrl?: string;
}

function InternetExplorer({ initialUrl }: InternetExplorerProps) {
  const { navigateToUrl, currentUrl, reload, goBack, historyIndex } = useInternetExplorer();
  const goBackRef = useRef(goBack);
  const historyIndexRef = useRef(historyIndex);

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

  return (
    <div className="internet-explorer-container">
      <IeHeader />
      {currentUrl === INITIAL_URL ? <IeHomePage /> : <Webview key={reload} />}
    </div>
  );
}

export default InternetExplorer;
