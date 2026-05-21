// Libraries
import { useEffect, useRef, useState } from 'react';

// Hooks & Utilities
import { getMediaAssetPath, getSystemMediaItems } from '../../utils';
import { isVideoByExtension } from '@/utils';
import useUIStore from '@/store/uiStore';

// Assets
import defaultVideo from '@/assets/media-center/The-Jimi-Hendrix-Experience-Purple-Haze_240p.mp4';

// Types
import type { FileSystemItem } from '@/constants';

const allSystemVideos = getSystemMediaItems(isVideoByExtension);

interface UseMediaCenterVideoProps {
  windowId?: string;
  initialItem?: FileSystemItem;
}

export function useMediaCenterVideo({ windowId, initialItem }: UseMediaCenterVideoProps) {
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | undefined>(initialItem);
  const [viewMode, setViewMode] = useState<'detail' | 'gallery'>(() => {
    return initialItem ? 'detail' : 'gallery';
  });

  const [videoSource, setVideoSource] = useState<string | null>(() => {
    return initialItem ? getMediaAssetPath(initialItem, defaultVideo) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleVideoCanPlay = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
  };

  const lastInitialItemRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const initialItemPath = initialItem?.path;
    if (initialItemPath !== lastInitialItemRef.current) {
      lastInitialItemRef.current = initialItemPath;
      if (initialItem) {
        setSelectedItem(initialItem);
        setViewMode('detail');
      } else {
        setSelectedItem(undefined);
        setViewMode('gallery');
      }
    }
  }, [initialItem]);

  useEffect(() => {
    if (viewMode === 'gallery') {
      setVideoSource(null);
      setIsLoading(false);
      return;
    }

    if (selectedItem) {
      const newSource = getMediaAssetPath(selectedItem, defaultVideo);
      if (newSource !== videoSource) {
        setIsLoading(true);
        setVideoSource(newSource);
      }
    }
  }, [selectedItem, viewMode, videoSource]);

  const updateWindowTitle = useUIStore((state) => state.updateWindowTitle);

  useEffect(() => {
    if (!windowId || !updateWindowTitle) return;

    if (viewMode === 'gallery') {
      updateWindowTitle(windowId, 'Galeria de Vídeos');
    } else {
      if (selectedItem) {
        updateWindowTitle(windowId, selectedItem.label + (selectedItem.extension || ''));
      } else {
        updateWindowTitle(windowId, 'Reprodutor de Vídeo');
      }
    }
  }, [viewMode, selectedItem, windowId, updateWindowTitle]);

  return {
    allSystemVideos,
    isLoading,
    selectedItem,
    videoSource,
    viewMode,
    handleVideoCanPlay,
    handleVideoError,
    setSelectedItem,
    setViewMode,
  };
}
