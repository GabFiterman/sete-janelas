/* eslint-disable @typescript-eslint/no-explicit-any */
import InternetExplorer from './internet-explorer/internet-explorer';
import FileExplorer from './file-explorer/file-explorer';
import Notepad from './notepad/notepad';
import { MediaCenterImage, MediaCenterVideo } from './media-center';
import { AcrobatReader } from './acrobat-reader';

import React from 'react';

export type AppName =
  | 'InternetExplorer'
  | 'FileExplorer'
  | 'Notepad'
  | 'MediaCenterImage'
  | 'MediaCenterVideo'
  | 'AcrobatReader';

export const AppComponentMap: Record<AppName, React.ComponentType<any>> = {
  InternetExplorer: InternetExplorer,
  FileExplorer: FileExplorer,
  Notepad: Notepad,
  MediaCenterImage: MediaCenterImage,
  MediaCenterVideo: MediaCenterVideo,
  AcrobatReader: AcrobatReader,
};

export const getAppComponent = (appName: AppName): React.ComponentType<any> => {
  return AppComponentMap[appName];
};
