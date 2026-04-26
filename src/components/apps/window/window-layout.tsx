import React from 'react';
import { Close } from '@/assets';

interface WindowLayoutProps {
  children: React.ReactNode;
  iconSrc: string;
  title: string;

  isMaximized: boolean;
  handleClose: () => void;
  handleMaximize: () => void;
  handleMinimize: () => void;
  handleStartDrag: (event: React.PointerEvent) => void;
}

function WindowLayout({
  children,

  iconSrc,
  isMaximized,
  title,

  handleClose,
  handleMaximize,
  handleMinimize,
  handleStartDrag,
}: WindowLayoutProps) {
  return (
    <>
      <div className="title-bar" onPointerDown={handleStartDrag} onDoubleClick={handleMaximize}>
        <span className="title">
          <img src={iconSrc} alt="." />
          {title}
        </span>
        <div className="controls">
          <button
            className="minimize"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
          >
            <span>&mdash;</span>
          </button>
          <button
            className="maximize"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          >
            <span>{isMaximized ? '\u2750' : '\u25FB'}</span>
          </button>
          <button
            className="close"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <Close size={14} />
          </button>
        </div>
      </div>
      <div className="content">{children}</div>
    </>
  );
}

export default WindowLayout;
