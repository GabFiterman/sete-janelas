import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { generateUUID } from '@/utils';

import useUIStore from '@/store/uiStore';

import { useFileExplorerStore } from '@/components/apps/file-explorer/use-file-explorer';
import { fileExplorerIcon } from '@/assets';

const FILE_EXPLORER_WINDOW_ID = `file-explorer-window`;

function RouteHandler() {
  const { '*': aliasSplat } = useParams<{ '*': string }>();
  const navigate = useNavigate();

  const { openWindow, windows, focusWindow } = useUIStore();
  const { getPathByAlias, setCurrentPath } = useFileExplorerStore();

  useEffect(() => {
    if (!aliasSplat) {
      navigate('/');
      return;
    }

    const normalizedAlias = aliasSplat.toUpperCase();
    let targetPath = getPathByAlias(normalizedAlias);

    if (!targetPath) {
      targetPath = getPathByAlias(normalizedAlias + '/');
    }

    if (targetPath) {
      const explorerWindow = windows.find((w) => w.id === FILE_EXPLORER_WINDOW_ID);

      if (!explorerWindow) {
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: 'File Explorer',
          appName: 'FileExplorer',
          iconSrc: fileExplorerIcon,
          widthRatio: 0.9,
          heightRatio: 0.75,
        });
      } else {
        focusWindow(FILE_EXPLORER_WINDOW_ID);
      }

      setCurrentPath(targetPath);
    } else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default RouteHandler;
