import { fileExplorerIcon, internetExplorerIcon, mediaCenterImageIcon, notepadIcon } from '@/assets';

import { type AppName } from '@/components/apps/app-config';

import useUIStore from '@/store/uiStore';
import { useFileExplorerStore } from '@/components/apps/file-explorer/use-file-explorer';
import { ITEMS_MAP_ALL } from '@/constants';
import { generateUUID } from '@/utils';

const INTERNET_EXPLORER_WINDOW_ID = 'internet-explorer-window';
const FILE_EXPLORER_WINDOW_ID = `file-explorer-window`;
const MEDIA_CENTER_IMAGE_WINDOW_ID = `media-center-image-window`;

const FILE_EXPLORER_INITIAL_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/PROJETOS'].path;
const FILE_EXPLORER_DOCUMENTS_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/DOCUMENTOS'].path;
const FILE_EXPLORER_IMAGES_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/IMAGENS'].path;
const MEDIA_CENTER_IMAGE_FITERMAN = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL1.WEBP'];

function useStartMenuStates() {
  const { openWindow, toggleIsStartMenuOpen, activeWindowsByApp } = useUIStore();
  const { setCurrentPath } = useFileExplorerStore();

  const startMenuApps = [
    {
      id: 1,
      label: 'Internet Explorer',
      action: () => {
        openWindow({
          id: INTERNET_EXPLORER_WINDOW_ID,
          title: 'Internet Explorer',
          appName: 'InternetExplorer' as AppName,
          iconSrc: internetExplorerIcon,
        });
      },
      icon: internetExplorerIcon,
    },
    {
      id: 2,
      label: 'File Explorer',
      action: () => {
        const activeWindows = activeWindowsByApp();
        if (!activeWindows['FileExplorer'] || activeWindows['FileExplorer']?.length === 0) {
          setCurrentPath(FILE_EXPLORER_INITIAL_PATH);
        }
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: 'File Explorer',
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
      icon: fileExplorerIcon,
    },
    {
      id: 3,
      label: 'Bloco de Notas',
      action: () => {
        openWindow({
          id: `notepad-menu-window-${generateUUID()}`,
          title: 'Bloco de Notas',
          appName: 'Notepad' as AppName,
          iconSrc: notepadIcon,
        });
      },
      icon: notepadIcon,
    },
    {
      id: 4,
      label: 'Visualizador de Imagens',
      action: () => {
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          title: 'Visualizador de Fotos do Sete Janelas',
          appName: 'MediaCenterImage' as AppName,
          iconSrc: mediaCenterImageIcon,
        });
      },
      icon: mediaCenterImageIcon,
    },
  ];

  const startMenuShortcuts = [
    {
      id: 1,
      label: 'Fiterman',
      action: () => {
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          title: 'gabriel(2).webp',
          appName: 'MediaCenterImage' as AppName,
          iconSrc: mediaCenterImageIcon,
          appProps: {
            initialItem: MEDIA_CENTER_IMAGE_FITERMAN,
            playlist: [MEDIA_CENTER_IMAGE_FITERMAN],
          },
        });
      },
    },
    {
      id: 2,
      label: 'Documentos',
      action: () => {
        setCurrentPath(FILE_EXPLORER_DOCUMENTS_PATH);
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: 'File Explorer',
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
    },
    {
      id: 3,
      label: 'Imagens',
      action: () => {
        setCurrentPath(FILE_EXPLORER_IMAGES_PATH);
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: 'File Explorer',
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
    },
  ];

  function handleAppClick(event: React.MouseEvent<HTMLDivElement>, action: () => void) {
    event.stopPropagation();
    action();
    toggleIsStartMenuOpen();
  }

  return { startMenuApps, startMenuShortcuts, handleAppClick };
}

export default useStartMenuStates;
