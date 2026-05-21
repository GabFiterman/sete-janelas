/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternetExplorer, FileExplorer, Notepad, MediaCenterImage, MediaCenterVideo } from '@/components/apps';
import React from 'react';

export type AppName = 'InternetExplorer' | 'FileExplorer' | 'Notepad' | 'MediaCenterImage' | 'MediaCenterVideo';

export const AppComponentMap: Record<AppName, React.ComponentType<any>> = {
  InternetExplorer: InternetExplorer,
  FileExplorer: FileExplorer,
  Notepad: Notepad,
  MediaCenterImage: MediaCenterImage,
  MediaCenterVideo: MediaCenterVideo,
};

export const getAppComponent = (appName: AppName): React.ComponentType<any> => {
  return AppComponentMap[appName];
};
