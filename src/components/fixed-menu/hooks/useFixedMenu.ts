import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import type { AppName } from '@/components/apps/app-config';
import { useIsMobile } from '@/hooks';
import useUIStore from '@/store/uiStore';
import { generateUUID } from '@/utils';

import {
  AcrobatReaderLogo,
  fileExplorerIcon,
  internetExplorerIcon,
  mediaCenterImageIcon,
  notepadIcon,
  videosIcon,
  WindowsLogo,
} from '@/assets';

const INTERNET_EXPLORER_WINDOW_ID = 'internet-explorer-window';
const FILE_EXPLORER_WINDOW_ID = 'file-explorer-window';
const NOTEPAD_WINDOW_ID = `notepad-menu-window-${generateUUID()}`;
const MEDIA_CENTER_IMAGE_WINDOW_ID = 'media-center-image-window';
const MEDIA_CENTER_VIDE_WINDOW_ID = `media-center-video-menu-window-${generateUUID()}`;
const ACROBAT_READER_WINDOW_ID = `acrobat-reader-menu-window-${generateUUID()}`;

interface GroupedWindows {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [appName: string]: any;
}

export const useFixedMenu = () => {
  const { t } = useTranslation();
  const windows = useUIStore((state) => state.windows);
  const closeWindow = useUIStore((state) => state.closeWindow);
  const toggleIsStartMenuOpen = useUIStore((state) => state.toggleIsStartMenuOpen);
  const isStartMenuOpen = useUIStore((state) => state.isStartMenuOpen);
  const setIsStartMenuOpen = useUIStore((state) => state.setIsStartMenuOpen);
  const openWindow = useUIStore((state) => state.openWindow);
  const isMobile = useIsMobile();

  const mainItem = {
    id: '1',
    label: 'FloatMenu',
    icon: WindowsLogo,
  };

  const handleClickMainItem = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();
    toggleIsStartMenuOpen(event);
  };

  const menuItems = useMemo(
    () => [
      // INTERNET EXPLORER
      {
        id: INTERNET_EXPLORER_WINDOW_ID,
        label: t('appNames.internetExplorer'),
        appName: 'InternetExplorer' as AppName,
        action: () =>
          openWindow({
            id: INTERNET_EXPLORER_WINDOW_ID,
            title: t('appNames.internetExplorer'),
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
        label: t('appNames.fileExplorer'),
        appName: 'FileExplorer' as AppName,
        action: () =>
          openWindow({
            id: FILE_EXPLORER_WINDOW_ID,
            title: t('appNames.fileExplorer'),
            appName: 'FileExplorer',
            iconSrc: fileExplorerIcon,
            widthRatio: 0.55,
            heightRatio: 0.83,
          }),
        icon: fileExplorerIcon,
      },
      // NOTEPAD
      {
        id: NOTEPAD_WINDOW_ID,
        label: t('appNames.notepad'),
        appName: 'Notepad' as AppName,
        action: () =>
          openWindow({
            id: NOTEPAD_WINDOW_ID,
            title: t('appNames.notepad'),
            appName: 'Notepad',
            iconSrc: notepadIcon,
          }),
        icon: notepadIcon,
      },
      // MEDIA CENTER IMAGE
      {
        id: MEDIA_CENTER_IMAGE_WINDOW_ID,
        label: t('appNames.mediaCenterImage'),
        appName: 'MediaCenterImage' as AppName,
        action: () =>
          openWindow({
            id: MEDIA_CENTER_IMAGE_WINDOW_ID,
            title: t('appNames.mediaCenterImage'),
            appName: 'MediaCenterImage',
            iconSrc: mediaCenterImageIcon,
          }),
        icon: mediaCenterImageIcon,
      },
      // MEDIA CENTER VIDEO
      {
        id: MEDIA_CENTER_VIDE_WINDOW_ID,
        label: t('appNames.mediaCenterVideo'),
        appName: 'MediaCenterVideo' as AppName,
        action: () =>
          openWindow({
            id: MEDIA_CENTER_VIDE_WINDOW_ID,
            title: t('appNames.mediaCenterVideo'),
            appName: 'MediaCenterVideo',
            iconSrc: videosIcon,
          }),
        icon: videosIcon,
      },
      // ACROBAT READER
      {
        id: ACROBAT_READER_WINDOW_ID,
        label: t('appNames.acrobatReader'),
        appName: 'AcrobatReader' as AppName,
        action: () =>
          openWindow({
            id: ACROBAT_READER_WINDOW_ID,
            title: t('appNames.acrobatReader'),
            appName: 'AcrobatReader',
            iconSrc: AcrobatReaderLogo,
          }),
        icon: AcrobatReaderLogo,
      },
    ],
    [openWindow, t]
  );

  const activeWindowsByApp = useMemo(() => {
    return windows.reduce((acc, window) => {
      const { appName } = window;
      if (!acc[appName]) {
        acc[appName] = [];
      }
      acc[appName].push(window);
      return acc;
    }, {} as GroupedWindows);
  }, [windows]);

  const openWindows = useMemo(() => {
    return windows.filter((w) => w.status !== 'minimized');
  }, [windows]);

  const activeWindow = useMemo(() => {
    if (openWindows.length === 0) return null;
    return [...openWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
  }, [openWindows]);

  const handleBack = () => {
    if (isStartMenuOpen) {
      setIsStartMenuOpen(false);
      return;
    }
    if (activeWindow) {
      const customEvent = new CustomEvent('app-back-navigation', {
        detail: { windowId: activeWindow.id, appName: activeWindow.appName },
        cancelable: true,
      });
      window.dispatchEvent(customEvent);
      if (!customEvent.defaultPrevented) {
        closeWindow(activeWindow.id);
      }
    }
  };

  const handleSearch = () => {
    setIsStartMenuOpen(true, true);
  };

  const isBackEnabled = !!activeWindow || isStartMenuOpen;

  return {
    activeWindowsByApp,
    handleBack,
    handleClickMainItem,
    handleSearch,
    isBackEnabled,
    isMobile,
    mainItem,
    menuItems,
    toggleIsStartMenuOpen,
  };
};
