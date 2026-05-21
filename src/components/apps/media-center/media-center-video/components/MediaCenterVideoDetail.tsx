// Global Components
import { LoaderCircle } from '@/components';

interface MediaCenterVideoDetailProps {
  isLoading: boolean;
  videoSource: string | null;
  onError: () => void;
  onCanPlay: () => void;
}

export function MediaCenterVideoDetail({ isLoading, videoSource, onError, onCanPlay }: MediaCenterVideoDetailProps) {
  return (
    <div className="media-center-video-canvas">
      {isLoading && (
        <div className="video-loader-overlay">
          <LoaderCircle />
        </div>
      )}

      {videoSource && (
        <video
          key={videoSource}
          className="media-center-video-player"
          controls
          autoPlay
          onCanPlay={onCanPlay}
          onError={onError}
          style={{ opacity: isLoading ? 0 : 1 }}
          src={videoSource}
        >
          Tipo de vídeo não suportado.
        </video>
      )}
    </div>
  );
}
