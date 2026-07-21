import { useRef } from 'react';

import { getMediaAssetPath } from '../../utils';

import defaultVideo from '@/assets/media-center/The-Jimi-Hendrix-Experience-Purple-Haze_240p.mp4';

import type { FileSystemItem } from '@/constants';
import { useTranslation } from 'react-i18next';

interface VideoCardProps {
  video: FileSystemItem;
  onClick: () => void;
}

function VideoCard({ video, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = getMediaAssetPath(video, defaultVideo) || defaultVideo;

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video preview playback interrupted:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="media-center-gallery-card"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {src && (
        <video
          ref={videoRef}
          src={src}
          className="media-center-gallery-thumb"
          muted
          playsInline
          loop
          preload="metadata"
        />
      )}
      <div className="media-center-gallery-overlay">
        <span className="media-center-gallery-label">{video.label}</span>
      </div>
      <div className="media-center-gallery-play-indicator">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

interface MediaCenterVideoGalleryProps {
  videos: FileSystemItem[];
  onSelectVideo: (video: FileSystemItem) => void;
}

export function MediaCenterVideoGallery({ videos, onSelectVideo }: MediaCenterVideoGalleryProps) {
  const { t } = useTranslation();
  return (
    <div className="media-center-gallery">
      <h2 className="media-center-gallery-title">{t('apps.mediaCenterVideo.windowTitle')}</h2>
      <div className="media-center-gallery-grid">
        {videos.map((video) => (
          <VideoCard key={video.path} video={video} onClick={() => onSelectVideo(video)} />
        ))}
      </div>
    </div>
  );
}
