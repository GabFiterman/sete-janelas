import useUIStore from '@/store/uiStore';
import { generateUUID } from '@/utils';
import { type AppName } from '@/components/apps/app-config';

import { internetExplorerIcon, fileExplorerIcon, notepadIcon, mediaCenterImageIcon, videosIcon } from '@/assets';
import { WindowsLogo } from '@/assets';

const INTERNET_EXPLORER_WINDOW_ID = 'internet-explorer-window';
const FILE_EXPLORER_WINDOW_ID = `file-explorer-window`;
const NOTEPAD_WINDOW_ID = `notepad-menu-window-${generateUUID()}`;
const MEDIA_CENTER_IMAGE_WINDOW_ID = `media-center-image-window`;
const MEDIA_CENTER_VIDE_WINDOW_ID = `media-center-video-menu-window-${generateUUID()}`;

function useFixedMenuStates() {
  const { toggleIsStartMenuOpen, openWindow } = useUIStore();

  const mainItem = {
    id: '1',
    label: 'FloatMenu',
    icon: WindowsLogo,
  };

  function handleClickMainItem(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.stopPropagation();
    toggleIsStartMenuOpen(event);
  }

  const menuItems = [
    // INTERNET EXPLORER
    {
      id: INTERNET_EXPLORER_WINDOW_ID,
      label: 'Internet Explorer',
      appName: 'InternetExplorer' as AppName,
      action: () =>
        openWindow({
          id: INTERNET_EXPLORER_WINDOW_ID,
          title: 'Internet Explorer',
          appName: 'InternetExplorer',
          iconSrc: internetExplorerIcon,
          appProps: {
            initialUrl: '/home',
          },
        }),
      icon: internetExplorerIcon,
    },
    // FILE EXPLORER
    {
      id: FILE_EXPLORER_WINDOW_ID,
      label: 'File Explorer',
      appName: 'FileExplorer' as AppName,
      action: () =>
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: 'File Explorer',
          appName: 'FileExplorer',
          iconSrc: fileExplorerIcon,
          widthRatio: 0.9,
          heightRatio: 0.75,
        }),
      icon: fileExplorerIcon,
    },
    // NOTEPAD
    {
      id: NOTEPAD_WINDOW_ID,
      label: 'Bloco de Notas',
      appName: 'Notepad' as AppName,
      action: () =>
        openWindow({
          id: NOTEPAD_WINDOW_ID,
          title: 'Bloco de Notas',
          appName: 'Notepad',
          iconSrc: notepadIcon,
        }),
      icon: notepadIcon,
    },
    // MEDIA CENTER IMAGE
    {
      id: MEDIA_CENTER_IMAGE_WINDOW_ID,
      label: 'Visualizador de Fotos do Sete Janelas',
      appName: 'MediaCenterImage' as AppName,
      action: () =>
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          title: 'Visualizador de Fotos do Sete Janelas',
          appName: 'MediaCenterImage',
          iconSrc: mediaCenterImageIcon,
        }),
      icon: mediaCenterImageIcon,
    },
    // MEDIA CENTER VIDEO
    {
      id: MEDIA_CENTER_VIDE_WINDOW_ID,
      label: 'Visualizador de Vídeos do Sete Janelas',
      appName: 'MediaCenterVideo' as AppName,
      action: () =>
        openWindow({
          id: MEDIA_CENTER_VIDE_WINDOW_ID,
          title: 'Visualizador de Vídeos do Sete Janelas',
          appName: 'MediaCenterVideo',
          iconSrc: videosIcon,
        }),
      icon: videosIcon,
    },
  ];

  return {
    menuItems,
    mainItem,
    handleClickMainItem,
  };
}

export default useFixedMenuStates;
