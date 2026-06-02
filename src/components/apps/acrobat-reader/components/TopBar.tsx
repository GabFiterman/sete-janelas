import {
  FaHome,
  FaRegFolderOpen,
  FaSave,
  FaPrint,
  FaRegEnvelope,
  FaSearch,
  FaMousePointer,
  FaHandPaper,
  FaSearchPlus,
  FaSearchMinus,
} from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface TopBarProps {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  activeTool: 'selection' | 'hand';
  setActiveTool: (tool: 'selection' | 'hand') => void;
  onHome?: () => void;
}

export const TopBar = ({
  currentPage,
  numPages,
  setCurrentPage,
  zoomLevel,
  setZoomLevel,
  activeTool,
  setActiveTool,
  onHome,
}: TopBarProps) => {
  const STANDARD_ZOOM_LEVELS = [0.125, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 3.5, 4];
  const isStandard = STANDARD_ZOOM_LEVELS.includes(zoomLevel);

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  return (
    <div className="acrobat-top-bar">
      <div className="acrobat-tools-group">
        <button className="acrobat-icon-btn" onClick={onHome}>
          <FaHome />
        </button>
        <button className="acrobat-icon-btn acrobat-hide-mobile" disabled>
          <FaRegFolderOpen />
        </button>
        <button className="acrobat-icon-btn acrobat-hide-mobile" disabled>
          <FaSave />
        </button>
        {/* TODO: Add custom icons for cloud upload etc. later as per reference */}
        <button className="acrobat-icon-btn acrobat-hide-mobile" disabled>
          <FaPrint />
        </button>
        <button className="acrobat-icon-btn acrobat-hide-mobile" disabled>
          <FaRegEnvelope />
        </button>
        <div className="acrobat-divider acrobat-hide-mobile"></div>
      </div>

      <div className="acrobat-tools-group">
        <button
          className="acrobat-icon-btn"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
        >
          <IoIosArrowBack />
        </button>
        <div className="acrobat-page-input-container">
          <input type="text" value={currentPage} onChange={handlePageChange} className="acrobat-page-input" />
          <span className="acrobat-page-total">/ {numPages}</span>
        </div>
        <button
          className="acrobat-icon-btn"
          onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
          disabled={currentPage >= numPages || numPages === 0}
        >
          <IoIosArrowForward />
        </button>
        <div className="acrobat-divider"></div>
      </div>

      <div className="acrobat-tools-group">
        <button
          className={`acrobat-icon-btn ${activeTool === 'selection' ? 'active' : ''}`}
          onClick={() => setActiveTool('selection')}
        >
          <FaMousePointer />
        </button>
        <button
          className={`acrobat-icon-btn ${activeTool === 'hand' ? 'active' : ''}`}
          onClick={() => setActiveTool('hand')}
        >
          <FaHandPaper />
        </button>
        <div className="acrobat-divider"></div>
      </div>

      <div className="acrobat-tools-group">
        <button
          className="acrobat-icon-btn"
          onClick={() => {
            const nextZoom = [...STANDARD_ZOOM_LEVELS].reverse().find((z) => z < zoomLevel) || 0.125;
            setZoomLevel(nextZoom);
          }}
          disabled={zoomLevel <= 0.125}
        >
          <FaSearchMinus />
        </button>
        <select value={zoomLevel} onChange={handleZoomChange} className="acrobat-zoom-select">
          {!isStandard && (
            <option value={zoomLevel}>
              {Math.round(zoomLevel * 100)}%
            </option>
          )}
          <option value={0.125}>12.5%</option>
          <option value={0.25}>25%</option>
          <option value={0.5}>50%</option>
          <option value={0.75}>75%</option>
          <option value={1}>100%</option>
          <option value={1.25}>125%</option>
          <option value={1.5}>150%</option>
          <option value={2}>200%</option>
          <option value={3}>300%</option>
          <option value={3.5}>350%</option>
          <option value={4}>400%</option>
        </select>
        <button
          className="acrobat-icon-btn"
          onClick={() => {
            const nextZoom = STANDARD_ZOOM_LEVELS.find((z) => z > zoomLevel) || 4;
            setZoomLevel(nextZoom);
          }}
          disabled={zoomLevel >= 4}
        >
          <FaSearchPlus />
        </button>
        <div className="acrobat-divider"></div>
      </div>

      <div className="acrobat-tools-group acrobat-search-group">
        <div className="acrobat-search-input">
          <input type="text" placeholder="Find text..." disabled />
          <FaSearch />
        </div>
      </div>
    </div>
  );
};
