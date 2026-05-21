import { ITEMS_MAP_ALL } from '@/constants/file-system/all-items';
import { AcrobatReaderLogo } from '@/assets';
import useIsMobile from '@/hooks/use-is-mobile';

interface PdfGalleryProps {
  onSelectFile: (uri: string) => void;
}

export const PdfGallery = ({ onSelectFile }: PdfGalleryProps) => {
  const allPdfs = Object.values(ITEMS_MAP_ALL).filter((item) => item.extension === '.pdf');
  const isMobile = useIsMobile();

  return (
    <div className="acrobat-gallery">
      <h2>Recent Documents</h2>
      {allPdfs.length === 0 ? (
        <p>No PDF documents found in the system.</p>
      ) : (
        <div className="acrobat-gallery-grid">
          {allPdfs.map((pdf) => (
            <div
              key={pdf.path}
              className="acrobat-gallery-item"
              onClick={isMobile ? () => onSelectFile(pdf.uri) : undefined}
              onDoubleClick={!isMobile ? () => onSelectFile(pdf.uri) : undefined}
            >
              <img src={AcrobatReaderLogo} alt="PDF" className="acrobat-gallery-icon" />
              <span className="acrobat-gallery-label">{pdf.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
