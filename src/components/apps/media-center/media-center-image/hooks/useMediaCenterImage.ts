// Libraries
import { useCallback, useEffect, useRef, useState } from 'react';

// Hooks & Utilities
import { useIsWindowFocused } from '../../hooks';
import { getMediaAssetPath, getSystemMediaItems } from '../../utils';
import { isImageByExtension } from '@/utils';
import useUIStore from '@/store/uiStore';
import { useTranslation } from 'react-i18next';

// Types
import type { MouseEvent } from 'react';
import type { FileSystemItem } from '@/constants';

const allSystemImages = getSystemMediaItems(isImageByExtension);

interface UseMediaCenterImageProps {
  windowId?: string;
  initialItem?: FileSystemItem;
  playlist?: FileSystemItem[];
  onClickImageBtn?: (event: MouseEvent<HTMLImageElement>) => void;
  onClickNext?: (event: MouseEvent<HTMLImageElement>) => void;
  onClickPrevious?: (event: MouseEvent<HTMLImageElement>) => void;
}

export function useMediaCenterImage({
  windowId,
  initialItem,
  playlist = initialItem ? [initialItem] : [],
  onClickImageBtn,
  onClickNext,
  onClickPrevious,
}: UseMediaCenterImageProps) {
  const [currentPlaylist, setCurrentPlaylist] = useState<FileSystemItem[]>(() => {
    if (playlist && playlist.length > 0) {
      return playlist;
    }
    return allSystemImages;
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const startPlaylist = playlist && playlist.length > 0 ? playlist : allSystemImages;
    const idx = initialItem ? startPlaylist.findIndex((item) => item.path === initialItem.path) : -1;
    return idx >= 0 ? idx : 0;
  });

  const [viewMode, setViewMode] = useState<'detail' | 'gallery'>(() => {
    return initialItem ? 'detail' : 'gallery';
  });

  const [imageSource, setImageSource] = useState<string | null>(() => {
    const startPlaylist = playlist && playlist.length > 0 ? playlist : allSystemImages;
    const idx = initialItem ? startPlaylist.findIndex((item) => item.path === initialItem.path) : -1;
    const item = idx >= 0 ? startPlaylist[idx] : null;
    return item ? getMediaAssetPath(item) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMounted = useRef(true);

  const updateWindowTitle = useUIStore((state) => state.updateWindowTitle);
  const isFocused = useIsWindowFocused(windowId);

  const handleNext = useCallback(
    (event?: MouseEvent<HTMLImageElement>) => {
      if (viewMode === 'gallery') return;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentPlaylist.length);
      if (onClickNext && event) onClickNext(event);
    },
    [viewMode, currentPlaylist.length, onClickNext]
  );

  const handlePrevious = useCallback(
    (event?: MouseEvent<HTMLImageElement>) => {
      if (viewMode === 'gallery') return;
      setCurrentIndex((prevIndex) => (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length);
      if (onClickPrevious && event) onClickPrevious(event);
    },
    [viewMode, currentPlaylist.length, onClickPrevious]
  );

  const handleImageLoad = () => {
    if (isMounted.current) {
      setIsLoading(false);
    }
  };

  const handleImageError = () => {
    if (isMounted.current) {
      setIsLoading(false);
    }
  };

  const handleZoomMore = () => {
    if (viewMode === 'gallery') return;
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomLess = () => {
    if (viewMode === 'gallery') return;
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleToggleFullscreen = () => {
    if (viewMode === 'gallery') return;
    if (!document.fullscreenElement) {
      const element = containerRef.current;
      if (element) {
        element.requestFullscreen().catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  const handleCentralClick = (event: MouseEvent<HTMLImageElement>) => {
    setViewMode('gallery');
    if (onClickImageBtn) onClickImageBtn(event);
  };

  const handleSelectImageFromGallery = (imageItem: FileSystemItem) => {
    setCurrentPlaylist(allSystemImages);
    const index = allSystemImages.findIndex((item) => item.path === imageItem.path);
    setCurrentIndex(index >= 0 ? index : 0);
    setViewMode('detail');
  };

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleAppBack = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.windowId === 'media-center-image-window') {
        if (currentIndexRef.current > 0) {
          setCurrentIndex((prev) => prev - 1);
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
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const lastPropsRef = useRef<{ initialItemPath?: string; playlistHash?: string }>({});

  useEffect(() => {
    const initialItemPath = initialItem?.path;
    const playlistHash = playlist?.map((p) => p.path).join(',') || '';

    if (
      initialItemPath !== lastPropsRef.current.initialItemPath ||
      playlistHash !== lastPropsRef.current.playlistHash
    ) {
      lastPropsRef.current = { initialItemPath, playlistHash };

      const targetPlaylist = playlist && playlist.length > 0 ? playlist : allSystemImages;
      setCurrentPlaylist(targetPlaylist);

      if (initialItem) {
        const idx = targetPlaylist.findIndex((item) => item.path === initialItem.path);
        setCurrentIndex(idx >= 0 ? idx : 0);
        setViewMode('detail');
      } else {
        setCurrentIndex(0);
        setViewMode('gallery');
      }
    }
  }, [initialItem, playlist]);

  useEffect(() => {
    if (viewMode === 'gallery') {
      setImageSource(null);
      setIsLoading(false);
      return;
    }

    const currentItem = currentPlaylist[currentIndex];
    const newSource = getMediaAssetPath(currentItem);

    if (newSource) {
      if (isMounted.current) {
        setImageSource((prevSource) => {
          if (prevSource !== newSource) {
            setIsLoading(true);
            return newSource;
          }
          return prevSource;
        });
      }
    } else {
      if (isMounted.current) {
        setImageSource(null);
        setIsLoading(false);
      }
    }
  }, [currentIndex, currentPlaylist, viewMode]);

  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex, viewMode]);

  useEffect(() => {
    if (!windowId || !updateWindowTitle) return;

    if (viewMode === 'gallery') {
      updateWindowTitle(windowId, t('apps.mediaCenterImage.windowTitle'));
    } else {
      const currentItem = currentPlaylist[currentIndex];
      if (currentItem) {
        updateWindowTitle(windowId, currentItem.label + (currentItem.extension || ''));
      } else {
        updateWindowTitle(windowId, t('apps.mediaCenterImage.windowTitle'));
      }
    }
  }, [viewMode, currentIndex, currentPlaylist, windowId, updateWindowTitle, t]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isFocused || viewMode === 'gallery') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, viewMode, handleNext, handlePrevious]);

  useEffect(() => {
    if (zoomLevel <= 1) {
      setDragConstraints({ left: 0, right: 0, top: 0, bottom: 0 });
      return;
    }

    const updateConstraints = () => {
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const conW = containerRect.width;
        const conH = containerRect.height;
        const natW = imageRef.current.naturalWidth || 1;
        const natH = imageRef.current.naturalHeight || 1;

        const R = natW / natH;
        const Rc = conW / conH;

        let imgW = conW;
        let imgH = conH;

        if (R > Rc) {
          imgW = conW;
          imgH = conW / R;
        } else {
          imgH = conH;
          imgW = conH * R;
        }

        const scaledW = imgW * zoomLevel;
        const scaledH = imgH * zoomLevel;

        const limitX = Math.max(0, (scaledW - conW) / 2);
        const limitY = Math.max(0, (scaledH - conH) / 2);

        setDragConstraints({
          left: -limitX,
          right: limitX,
          top: -limitY,
          bottom: limitY,
        });
      }
    };

    updateConstraints();

    window.addEventListener('resize', updateConstraints);
    return () => {
      window.removeEventListener('resize', updateConstraints);
    };
  }, [zoomLevel, currentIndex, viewMode, isLoading]);

  const showPlayerControls = currentPlaylist.length > 0;

  return {
    allSystemImages,
    currentIndex,
    currentPlaylist,
    dragConstraints,
    isFullscreen,
    imageRef,
    imageSource,
    isLoading,
    containerRef,
    showPlayerControls,
    viewMode,
    zoomLevel,
    handleCentralClick,
    handleImageError,
    handleImageLoad,
    handleNext,
    handlePrevious,
    handleSelectImageFromGallery,
    handleToggleFullscreen,
    handleZoomLess,
    handleZoomMore,
  };
}
