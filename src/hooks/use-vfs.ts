import { useTranslation } from 'react-i18next';
import { type FileSystemItem } from '@/constants/file-system-map';

export function useVFS() {
  const { t } = useTranslation();

  const getLabel = (item: FileSystemItem): string => {
    if (item.labelKey) {
      return t(item.labelKey);
    }
    return item.label;
  };

  return { getLabel };
}
