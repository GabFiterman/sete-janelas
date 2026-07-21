import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FileSystemItem } from '@/constants/file-system-map';
import useUIStore from '@/store/uiStore';

export const useAcrobatReader = (appContext?: FileSystemItem, windowId?: string) => {
  const { t } = useTranslation();
  const updateWindowTitle = useUIStore((state) => state.updateWindowTitle);

  const [isSplash, setIsSplash] = useState(true);
  const [selectedFile, setSelectedFileState] = useState<string | null>(null);

  const setSelectedFile = (uri: string | null) => {
    if (uri && !uri.startsWith('http' ) && !uri.startsWith('/')) {
      setSelectedFileState(`/${uri}`);
    } else {
      setSelectedFileState(uri);
    }
  };

  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<'selection' | 'hand'>('hand');

  useEffect(() => {
    if (appContext?.extension === '.pdf') {
      setSelectedFile(appContext.uri);
    }
  }, [appContext]);

  useEffect(() => {
    if (windowId) {
      const fileName = selectedFile ? selectedFile.split('/').pop() : '';
      const decodedName = fileName ? decodeURIComponent(fileName) : '';
      const title = decodedName ? `${decodedName} - ${t('appNames.acrobatReader')}` : t('appNames.acrobatReader');
      updateWindowTitle(windowId, title);
    }
  }, [windowId, selectedFile, updateWindowTitle, t]);

  return {
    activeTool,
    currentPage,
    isSplash,
    numPages,
    selectedFile,
    zoomLevel,
    setActiveTool,
    setCurrentPage,
    setIsSplash,
    setNumPages,
    setSelectedFile,
    setZoomLevel,
  };
};
