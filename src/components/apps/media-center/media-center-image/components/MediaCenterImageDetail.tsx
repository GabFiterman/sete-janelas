// Functions & Components
import { motion } from 'framer-motion';
import { LoaderCircle } from '@/components';

// Types
import type { RefObject } from 'react';
import type { FileSystemItem } from '@/constants';

interface MediaCenterImageDetailProps {
  currentIndex: number;
  currentPlaylist: FileSystemItem[];
  dragConstraints: { left: number; right: number; top: number; bottom: number };
  imageRef: RefObject<HTMLImageElement | null>;
  imageSource: string | null;
  isLoading: boolean;
  zoomLevel: number;
  onImageError: () => void;
  onImageLoad: () => void;
}

export function MediaCenterImageDetail({
  currentIndex,
  currentPlaylist,
  dragConstraints,
  imageRef,
  imageSource,
  isLoading,
  zoomLevel,
  onImageError,
  onImageLoad,
}: MediaCenterImageDetailProps) {
  const showLoader = isLoading && !!imageSource;
  const showError = !imageSource && !isLoading;

  return (
    <>
      {showLoader && (
        <div className="media-center-image-loader-overlay">
          <LoaderCircle />
        </div>
      )}

      {imageSource && (
        <motion.img
          key={currentIndex}
          ref={imageRef}
          className="media-center-image-main-image"
          src={imageSource}
          alt={currentPlaylist[currentIndex]?.label || 'Media Item'}
          onLoad={onImageLoad}
          onError={onImageError}
          drag={zoomLevel > 1}
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          animate={{
            scale: zoomLevel,
            x: zoomLevel > 1 ? undefined : 0,
            y: zoomLevel > 1 ? undefined : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            opacity: isLoading ? 0 : 1,
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            cursor: zoomLevel > 1 ? 'grab' : 'default',
          }}
        />
      )}

      {showError && (
        <div className="media-center-image-error-message">
          <p>Falha ao carregar mídia ou o arquivo não é suportado.</p>
        </div>
      )}
    </>
  );
}
