import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { generateUUID, isImageByExtension, isVideoByExtension, isTextByExtension } from '@/utils';
import { ITEMS_MAP_WORKSPACE } from '@/constants';
import { useDraggableElement } from '@/hooks';
import useUiStore, { type WorkspaceIcon } from '@/store/uiStore';
import { useFileExplorerStore } from '@/components/apps/file-explorer/use-file-explorer';

import { fileExplorerIcon, mediaCenterImageIcon, notepadIcon, videosIcon } from '@/assets';
import './icon-link-label.scss';

interface IconLinkLabelProps {
  icon: WorkspaceIcon;
  className?: string;
  size?: number;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
}

function IconLinkLabel({ className, constraintsRef, icon, size = 64 }: IconLinkLabelProps) {
  const { extension, iconSrc, label, path, type, uri, x, y } = icon;
  const FILE_EXPLORER_WINDOW_ID = `file-explorer-window`;

  const { dragProps } = useDraggableElement(path, 'icon');

  const { openWindow } = useUiStore();
  const { getIsItemSelected, toggleItemSelection } = useFileExplorerStore();

  const iconRef = useRef<HTMLDivElement>(null);
  const [iconDimensions, setIconDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (iconRef.current && iconDimensions.width === 0) {
      const { offsetWidth, offsetHeight } = iconRef.current;
      setIconDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [iconDimensions.width]);

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();

    if (type === 'folder') {
      openWindow({
        id: FILE_EXPLORER_WINDOW_ID,
        appName: 'FileExplorer',
        iconSrc: fileExplorerIcon,
        title: 'File Explorer',
      });
    }

    if (type === 'file') {
      if (isImageByExtension(extension)) {
        const imagePlaylist = ITEMS_MAP_WORKSPACE.filter(
          (item) => item.type === 'file' && isImageByExtension(item.extension)
        ).map((item) => ({ ...item }));

        const MEDIA_CENTER_IMAGE_WINDOW_ID = 'media-center-image-window';
        openWindow({
          id: MEDIA_CENTER_IMAGE_WINDOW_ID,
          appName: 'MediaCenterImage',
          iconSrc: mediaCenterImageIcon,
          title: label + extension,
          appProps: {
            initialItem: icon,
            playlist: imagePlaylist,
          },
        });
      }

      if (isVideoByExtension(extension)) {
        const MEDIA_CENTER_VIDEO_WINDOW_ID = 'media-center-video-window';
        openWindow({
          id: MEDIA_CENTER_VIDEO_WINDOW_ID,
          appName: 'MediaCenterVideo',
          iconSrc: videosIcon,
          title: label + extension,
          appProps: {
            initialItem: icon,
          },
        });
      }

      if (isTextByExtension(extension)) {
        const NOTEPAD_WINDOW_ID = `notepad-window-${uri}-${generateUUID}`;
        openWindow({
          id: NOTEPAD_WINDOW_ID,
          title: label + extension,
          appName: 'Notepad',
          iconSrc: notepadIcon,
          appProps: {
            initialItem: icon,
          },
        });
      }
    }
  }

  function handleSingleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    toggleItemSelection(event, icon);
  }

  return icon ? (
    <motion.div
      className={`icon-link-label ${getIsItemSelected(icon) ? 'selected' : ''}`}
      onDoubleClick={(event) => handleDoubleClick(event)}
      onClick={(event) => handleSingleClick(event)}
      dragConstraints={constraintsRef}
      drag={true}
      style={{
        x: x,
        y: y,
        touchAction: 'none',
        userSelect: 'none',
      }}
      ref={iconRef}
      {...dragProps}
    >
      <div className="icon-container">
        <div className="icon-image">
          <img
            src={iconSrc}
            alt={`${label} Icon`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            className={`icon ${className || ''}`}
            draggable={false}
          />
        </div>
        <span className="label">
          {label}
          {type === 'file' && extension ? `${extension}` : ''}
        </span>
      </div>
    </motion.div>
  ) : null;
}

export default IconLinkLabel;
