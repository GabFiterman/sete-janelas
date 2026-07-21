// Global Components & Widgets
import { AppControllerWidget } from '@/components';

// Local Subcomponents
import { MediaCenterImageDetail, MediaCenterImageFooter, MediaCenterImageGallery } from './components';

// Hooks & Utilities
import { useMediaCenterImage } from './hooks';

// Constants & Styles
import { useControllerItems } from './constants';
import './media-center-image.scss';

// Types
import type { MouseEvent } from 'react';
import type { FileSystemItem } from '@/constants';

interface MediaCenterImageProps {
  windowId?: string;
  initialItem?: FileSystemItem;
  playlist?: FileSystemItem[];
  onClickImageBtn?: (event: MouseEvent<HTMLImageElement>) => void;
  onClickNext?: (event: MouseEvent<HTMLImageElement>) => void;
  onClickPrevious?: (event: MouseEvent<HTMLImageElement>) => void;
}

function MediaCenterImage(props: MediaCenterImageProps) {
  const controllerItems = useControllerItems();
  const {
    allSystemImages,
    containerRef,
    currentIndex,
    currentPlaylist,
    dragConstraints,
    imageRef,
    imageSource,
    isFullscreen,
    isLoading,
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
  } = useMediaCenterImage(props);

  return (
    <div
      ref={containerRef}
      className={`media-center-image-container mode-${viewMode} ${isFullscreen ? 'is-fullscreen' : ''}`}
    >
      {!isFullscreen && <AppControllerWidget controllerItems={controllerItems} />}
      <div className="media-center-image-canvas">
        {viewMode === 'gallery' ? (
          <MediaCenterImageGallery images={allSystemImages} onSelectImage={handleSelectImageFromGallery} />
        ) : (
          <MediaCenterImageDetail
            currentIndex={currentIndex}
            currentPlaylist={currentPlaylist}
            dragConstraints={dragConstraints}
            imageRef={imageRef}
            imageSource={imageSource}
            isLoading={isLoading}
            zoomLevel={zoomLevel}
            onImageError={handleImageError}
            onImageLoad={handleImageLoad}
          />
        )}
      </div>
      <MediaCenterImageFooter
        showPlayerControls={showPlayerControls}
        viewMode={viewMode}
        onCentralClick={handleCentralClick}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleFullscreen={handleToggleFullscreen}
        onZoomLess={handleZoomLess}
        onZoomMore={handleZoomMore}
      />
    </div>
  );
}

export default MediaCenterImage;
