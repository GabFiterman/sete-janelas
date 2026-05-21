import { FaToolbox, FaComment, FaShareAlt } from 'react-icons/fa';

export const LeftPanel = () => {
  return (
    <div className="acrobat-left-panel">
      <div className="acrobat-side-icons">
        <button className="acrobat-side-btn" disabled title="Tools">
          <FaToolbox />
        </button>
        <button className="acrobat-side-btn" disabled title="Comment">
          <FaComment />
        </button>
        <button className="acrobat-side-btn" disabled title="Share">
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export const RightPanel = () => {
  return (
    <div className="acrobat-right-panel">
      <div className="acrobat-right-placeholder">
        {/* TODO: Empty placeholder to match layout where tools typically appear */}
      </div>
    </div>
  );
};
