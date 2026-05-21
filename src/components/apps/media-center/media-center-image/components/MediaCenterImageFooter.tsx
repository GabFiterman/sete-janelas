// Functions & Components
import {
  excludeIcon,
  mediaCenterExpandIcon,
  mediaCenterImageBtnIcon,
  mediaCenterNextIcon,
  mediaCenterPreviousIcon,
  mediaCenterRedoIcon,
  mediaCenterUndoIcon,
  mediaCenterZoomLess,
  mediaCenterZoomMore,
} from '@/assets';

// Types
import type { MouseEvent } from 'react';

interface MediaCenterImageFooterProps {
  showPlayerControls: boolean;
  viewMode: 'detail' | 'gallery';
  onCentralClick: (event: MouseEvent<HTMLImageElement>) => void;
  onNext: (event: MouseEvent<HTMLImageElement>) => void;
  onPrevious: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleFullscreen: () => void;
  onZoomLess: () => void;
  onZoomMore: () => void;
}

export function MediaCenterImageFooter({
  showPlayerControls,
  viewMode,
  onCentralClick,
  onNext,
  onPrevious,
  onToggleFullscreen,
  onZoomLess,
  onZoomMore,
}: MediaCenterImageFooterProps) {
  const isGallery = viewMode === 'gallery';

  return (
    <div className="media-center-image-footer-container">
      <div className="media-center-image-footer">
        <img
          className={`media-center-image-footer-icon ${isGallery ? 'disabled' : ''}`}
          src={mediaCenterZoomLess}
          onClick={isGallery ? undefined : onZoomLess}
          alt="Zoom out"
        />
        <img
          className={`media-center-image-footer-icon ${isGallery ? 'disabled' : ''}`}
          src={mediaCenterZoomMore}
          onClick={isGallery ? undefined : onZoomMore}
          alt="Zoom in"
        />
        <img
          className={`media-center-image-footer-icon ${isGallery ? 'disabled' : ''}`}
          src={mediaCenterExpandIcon}
          onClick={isGallery ? undefined : onToggleFullscreen}
          alt="Toggle Fullscreen"
        />
        <div className="media-center-image-footer-player-container">
          {showPlayerControls && (
            <>
              <img
                className={`media-center-image-footer-player-icon ${isGallery ? 'disabled' : ''}`}
                src={mediaCenterPreviousIcon}
                onClick={isGallery ? undefined : onPrevious}
                alt="Previous"
              />
              <img
                className={`media-center-image-footer-player-icon main ${isGallery ? 'disabled' : ''}`}
                src={mediaCenterImageBtnIcon}
                onClick={isGallery ? undefined : onCentralClick}
                alt="Gallery"
              />
              <img
                className={`media-center-image-footer-player-icon ${isGallery ? 'disabled' : ''}`}
                src={mediaCenterNextIcon}
                onClick={isGallery ? undefined : onNext}
                alt="Next"
              />
            </>
          )}
        </div>
        <img className="media-center-image-footer-icon disabled" src={mediaCenterUndoIcon} alt="Undo" />
        <img className="media-center-image-footer-icon disabled" src={mediaCenterRedoIcon} alt="Redo" />
        <img className="media-center-image-footer-icon disabled" src={excludeIcon} alt="Delete" />
      </div>
    </div>
  );
}
