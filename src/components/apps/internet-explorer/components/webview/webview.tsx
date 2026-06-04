import { useEffect, useRef } from 'react';
import { useInternetExplorer } from '../../use-internet-explorer';
import useUIStore from '@/store/uiStore';

interface WebviewProps {
  windowId?: string;
}

function Webview({ windowId }: WebviewProps) {
  const { currentUrl } = useInternetExplorer();
  const focusWindow = useUIStore((state) => state.focusWindow);
  const isHovered = useRef(false);

  useEffect(() => {
    if (!windowId) return;

    const handleWindowBlur = () => {
      if (isHovered.current) {
        setTimeout(() => {
          focusWindow(windowId);
        }, 50);
      }
    };

    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [windowId, focusWindow]);

  return (
    <div
      className="ie-webview-container"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <iframe
        className="ie-webview"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        src={currentUrl}
        title="Internet Explorer Webview"
      />
    </div>
  );
}

export default Webview;

