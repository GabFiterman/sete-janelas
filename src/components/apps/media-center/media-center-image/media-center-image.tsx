import { useState, useEffect, useRef } from 'react';
import { AppControllerWidget, LoaderCircle } from '@/components';
import { controllerItems } from './constants/media-center-image-constants';
import {
  excludeIcon,
  mediaCenterExpandIcon,
  mediaCenterImageBtnIcon,
  mediaCenterNextIcon,
  mediaCenterPreviousIcon,
  mediaCenterRedoIcon,
  mediaCenterUndoIcon,
  mediaCenterZoomMore,
} from '@/assets';
import './media-center-image.scss';
import { type FileSystemItem } from '@/constants';

function getAssetPath(item: FileSystemItem | undefined): string | null {
  if (!item) return null;
  if (item.uri.startsWith('http')) return item.uri;

  const ssoBasePath = 'C:/USUÁRIOS/FITERMAN/';
  const assetBasePath = '/media-center/';

  if (item.path.toUpperCase().startsWith(ssoBasePath)) {
    const relativePath = item.path.substring(ssoBasePath.length);
    return assetBasePath + relativePath;
  }
  return null;
}

interface MediaCenterImageProps {
  initialItem?: FileSystemItem;
  playlist?: FileSystemItem[];

  onClickImageBtn?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onClickNext?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onClickPrevious?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

function MediaCenterImage({
  initialItem,
  playlist = initialItem ? [initialItem] : [],

  onClickImageBtn,
  onClickNext,
  onClickPrevious,
}: MediaCenterImageProps) {
  const [currentIndex, setCurrentIndex] = useState(() => playlist.findIndex((item) => item.path === initialItem?.path));
  const [imageSource, setImageSource] = useState(() => initialItem && getAssetPath(initialItem));
  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(true);

  const handleNext = (event: React.MouseEvent<HTMLImageElement>) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    if (onClickNext) onClickNext(event);
  };

  const handlePrevious = (event: React.MouseEvent<HTMLImageElement>) => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    if (onClickPrevious) onClickPrevious(event);
  };

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

  useEffect(() => {
    const currentItem = playlist[currentIndex];
    const newSource = getAssetPath(currentItem);

    if (newSource) {
      if (isMounted.current) {
        setIsLoading(true);
        setImageSource(newSource);
      }
    } else {
      if (isMounted.current) {
        setImageSource(null);
        setIsLoading(false);
      }
    }
  }, [currentIndex, playlist]);

  const showLoader = isLoading && !!imageSource;
  const showError = !imageSource && !isLoading;
  const showPlayerControls = playlist.length > 1;

  return (
    <div className="media-center-image-container">
      <AppControllerWidget controllerItems={controllerItems} />
      <div className="media-center-image-canvas">
        {showLoader && (
          <div className="media-center-image-loader-overlay">
            <LoaderCircle />
          </div>
        )}

        {imageSource && (
          <img
            className="media-center-image-main-image"
            src={imageSource}
            alt={playlist[currentIndex]?.label || 'Media Item'}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        )}

        {showError && (
          <div className="media-center-image-error-message">
            <p>Falha ao carregar mídia ou o arquivo não é suportado.</p>
          </div>
        )}
      </div>
      <div className="media-center-image-footer-container">
        <div className="media-center-image-footer">
          <img className="media-center-image-footer-icon disabled" src={mediaCenterZoomMore} />
          <img className="media-center-image-footer-icon disabled" src={mediaCenterExpandIcon} />
          <div className="media-center-image-footer-player-container">
            {showPlayerControls && (
              <>
                <img
                  className="media-center-image-footer-player-icon"
                  src={mediaCenterPreviousIcon}
                  onClick={handlePrevious}
                />
                <img
                  className="media-center-image-footer-player-icon main disabled"
                  src={mediaCenterImageBtnIcon}
                  onClick={(event) => onClickImageBtn && onClickImageBtn(event)}
                />
                <img className="media-center-image-footer-player-icon" src={mediaCenterNextIcon} onClick={handleNext} />
              </>
            )}
          </div>
          <img className="media-center-image-footer-icon disabled" src={mediaCenterUndoIcon} />
          <img className="media-center-image-footer-icon disabled" src={mediaCenterRedoIcon} />
          <div className="vertical-line" />
          <img className="media-center-image-footer-icon disabled" src={excludeIcon} />
        </div>
      </div>
    </div>
  );
}

export default MediaCenterImage;
