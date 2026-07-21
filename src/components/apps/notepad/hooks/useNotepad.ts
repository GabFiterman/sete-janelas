import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type FileSystemItem } from '@/constants';
import useUIStore from '@/store/uiStore';

function getAssetPath(item: FileSystemItem | undefined): string | null {
  if (!item) return null;

  const ssoBasePath = 'C:/USUÁRIOS/FITERMAN/';
  const assetBasePath = '/media-center/';

  if (item.path.toUpperCase().startsWith(ssoBasePath)) {
    const relativePath = item.path.substring(ssoBasePath.length);
    return assetBasePath + relativePath;
  }
  return null;
}

export function useNotepad(initialItem?: FileSystemItem, windowId?: string) {
  const [initialTextSource, setInitialTextSource] = useState('');
  const { t } = useTranslation();
  const updateWindowTitle = useUIStore((state) => state.updateWindowTitle);

  useEffect(() => {
    const assetPath = getAssetPath(initialItem);
    if (assetPath) {
      fetch(assetPath)
        .then((response) => response.text())
        .then((text) => {
          if (text.startsWith('<!doctype html>')) {
            return;
          } else {
            setInitialTextSource(text);
          }
        });
    }
  }, [initialItem]);

  useEffect(() => {
    if (windowId) {
      const fileName = initialItem ? `${initialItem.label}${initialItem.extension || ''}` : '';
      const title = fileName ? `${fileName} - ${t('appNames.notepad')}` : t('appNames.notepad');
      updateWindowTitle(windowId, title);
    }
  }, [windowId, initialItem, updateWindowTitle, t]);

  return {
    initialTextSource,
  };
}
