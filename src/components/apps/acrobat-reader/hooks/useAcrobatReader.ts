import { useEffect, useState } from 'react';

import type { FileSystemItem } from '@/constants/file-system-map';

export const useAcrobatReader = (appContext?: FileSystemItem) => {
  const [isSplash, setIsSplash] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<'selection' | 'hand'>('hand');

  useEffect(() => {
    if (appContext?.extension === '.pdf') {
      setSelectedFile(appContext.uri);
    }
  }, [appContext]);

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
