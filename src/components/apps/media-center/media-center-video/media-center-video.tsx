// Local Subcomponents
import { MediaCenterVideoDetail, MediaCenterVideoGallery } from './components';

// Hooks & Utilities
import { useMediaCenterVideo } from './hooks';

// Styles
import './media-center-video.scss';

// Types
import type { FileSystemItem } from '@/constants';

interface MediaCenterVideoProps {
  windowId?: string;
  initialItem?: FileSystemItem;
}

function MediaCenterVideo(props: MediaCenterVideoProps) {
  const {
    allSystemVideos,
    isLoading,
    videoSource,
    viewMode,
    handleVideoCanPlay,
    handleVideoError,
    setSelectedItem,
    setViewMode,
  } = useMediaCenterVideo(props);

  return (
    <div className={`media-center-video-container mode-${viewMode}`}>
      {viewMode === 'gallery' ? (
        <MediaCenterVideoGallery
          videos={allSystemVideos}
          onSelectVideo={(video) => {
            setSelectedItem(video);
            setViewMode('detail');
          }}
        />
      ) : (
        <MediaCenterVideoDetail
          isLoading={isLoading}
          videoSource={videoSource}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
        />
      )}
    </div>
  );
}

export default MediaCenterVideo;
