import {
  fileExplorerIcon,
  internetExplorerIcon,
  mediaCenterImageIcon,
  notepadIcon,
  AcrobatReaderLogo,
  videosIcon,
} from '@/assets';

import { type AppName } from '@/components/apps/app-config';

import useUIStore from '@/store/uiStore';
import { useFileExplorerStore } from '@/components/apps/file-explorer/use-file-explorer';
import { ITEMS_MAP_ALL } from '@/constants';
import { generateUUID } from '@/utils';
import { useTranslation } from 'react-i18next';

const INTERNET_EXPLORER_WINDOW_ID = 'internet-explorer-window';
const FILE_EXPLORER_WINDOW_ID = `file-explorer-window`;
const MEDIA_CENTER_IMAGE_WINDOW_ID = `media-center-image-window`;
const MEDIA_CENTER_VIDEO_WINDOW_ID = `media-center-video-menu-window-${generateUUID()}`;
const ACROBAT_READER_WINDOW_ID = `acrobat-reader-menu-window-${generateUUID()}`;

const FILE_EXPLORER_INITIAL_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/PROJETOS'].path;
const FILE_EXPLORER_DOCUMENTS_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/DOCUMENTOS'].path;
const FILE_EXPLORER_IMAGES_PATH = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/IMAGENS'].path;
const MEDIA_CENTER_IMAGE_FITERMAN = ITEMS_MAP_ALL['C:/USUARIOS/FITERMAN/IMAGENS/GABRIEL2.WEBP'];

function useStartMenuStates() {
  const { openWindow, toggleIsStartMenuOpen, activeWindowsByApp } = useUIStore();
  const { setCurrentPath } = useFileExplorerStore();
  const { t } = useTranslation();

  const startMenuApps = [
    {
      id: 1,
      label: t('appNames.internetExplorer'),
      action: () => {
        openWindow({
          id: INTERNET_EXPLORER_WINDOW_ID,
          title: t('appNames.internetExplorer'),
          appName: 'InternetExplorer' as AppName,
          iconSrc: internetExplorerIcon,
        });
      },
      icon: internetExplorerIcon,
    },
    {
      id: 2,
      label: t('appNames.fileExplorer'),
      action: () => {
        const activeWindows = activeWindowsByApp();
        if (!activeWindows['FileExplorer'] || activeWindows['FileExplorer']?.length === 0) {
          setCurrentPath(FILE_EXPLORER_INITIAL_PATH);
        }
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: t('appNames.fileExplorer'),
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
      icon: fileExplorerIcon,
    },
    {
      id: 3,
      label: t('appNames.notepad'),
      action: () => {
        openWindow({
          id: `notepad-menu-window-${generateUUID()}`,
          title: t('appNames.notepad'),
          appName: 'Notepad' as AppName,
          iconSrc: notepadIcon,
        });
      },
      icon: notepadIcon,
    },
    {
      id: 4,
      label: t('appNames.mediaCenterImage'),
      action: () => {
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          title: t('appNames.mediaCenterImage'),
          appName: 'MediaCenterImage' as AppName,
          iconSrc: mediaCenterImageIcon,
        });
      },
      icon: mediaCenterImageIcon,
    },
    {
      id: 5,
      label: t('appNames.mediaCenterVideo'),
      action: () => {
        openWindow({
          id: MEDIA_CENTER_VIDEO_WINDOW_ID,
          title: t('appNames.mediaCenterVideo'),
          appName: 'MediaCenterVideo' as AppName,
          iconSrc: videosIcon,
        });
      },
      icon: videosIcon,
    },
    {
      id: 6,
      label: t('appNames.acrobatReader'),
      action: () => {
        openWindow({
          id: ACROBAT_READER_WINDOW_ID,
          title: t('appNames.acrobatReader'),
          appName: 'AcrobatReader' as AppName,
          iconSrc: AcrobatReaderLogo,
        });
      },
      icon: AcrobatReaderLogo,
    },
  ];

  const startMenuShortcuts = [
    {
      id: 1,
      label: t('vfs.desktop.username'),
      action: () => {
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          title: `${t('vfs.desktop.username')}.webp`,
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
      label: t('vfs.folders.documents'),
      action: () => {
        setCurrentPath(FILE_EXPLORER_DOCUMENTS_PATH);
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: `${t('appNames.fileExplorer')} - ${t('vfs.folders.documents')}`,
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
    },
    {
      id: 3,
      label: t('vfs.folders.pictures'),
      action: () => {
        setCurrentPath(FILE_EXPLORER_IMAGES_PATH);
        openWindow({
          id: FILE_EXPLORER_WINDOW_ID,
          title: `${t('appNames.fileExplorer')} - ${t('vfs.folders.pictures')}`,
          appName: 'FileExplorer' as AppName,
          iconSrc: fileExplorerIcon,
        });
      },
    },
  ];

  const openProfileImage = () => {
    openWindow({
      id: MEDIA_CENTER_IMAGE_WINDOW_ID,
      title: `${t('vfs.desktop.username')}.webp`,
      appName: 'MediaCenterImage' as AppName,
      iconSrc: mediaCenterImageIcon,
      appProps: {
        initialItem: MEDIA_CENTER_IMAGE_FITERMAN,
        playlist: [MEDIA_CENTER_IMAGE_FITERMAN],
      },
    });
  };

  function handleAppClick(event: React.MouseEvent<HTMLDivElement>, action: () => void) {
    event.stopPropagation();
    action();
    toggleIsStartMenuOpen();
  }

  return { startMenuApps, startMenuShortcuts, handleAppClick, openProfileImage };
}

export default useStartMenuStates;
