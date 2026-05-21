// Functions & Components
import { getMediaAssetPath } from '../../utils';

// Types
import type { FileSystemItem } from '@/constants';

interface MediaCenterImageGalleryProps {
  images: FileSystemItem[];
  onSelectImage: (image: FileSystemItem) => void;
}

export function MediaCenterImageGallery({ images, onSelectImage }: MediaCenterImageGalleryProps) {
  return (
    <div className="media-center-gallery">
      <h2 className="media-center-gallery-title">Galeria de Fotos</h2>
      <div className="media-center-gallery-grid">
        {images.map((image) => {
          const src = getMediaAssetPath(image);

          return (
            <div key={image.path} className="media-center-gallery-card" onClick={() => onSelectImage(image)}>
              {src && <img src={src} alt={image.label} className="media-center-gallery-thumb" draggable={false} />}
              <div className="media-center-gallery-overlay">
                <span className="media-center-gallery-label">{image.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
