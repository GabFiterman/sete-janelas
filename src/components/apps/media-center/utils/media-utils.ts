import { ITEMS_MAP_ALL } from '@/constants';
import type { FileSystemItem } from '@/constants';

/**
 * Resolves a Virtual File System item path or URI to an asset path.
 *
 * @param item - The FileSystemItem to resolve.
 * @param fallback - Optional fallback value if resolution fails.
 * @returns The resolved asset path, or the fallback (or null).
 */
export function getMediaAssetPath(item: FileSystemItem | undefined, fallback?: string): string | null {
  if (!item) return fallback ?? null;
  if (item.uri && item.uri.startsWith('http')) return item.uri;

  const ssoBasePath = 'C:/USUÁRIOS/FITERMAN/';
  const assetBasePath = '/media-center/';

  if (item.path.toUpperCase().startsWith(ssoBasePath)) {
    const relativePath = item.path.substring(ssoBasePath.length);
    return assetBasePath + relativePath;
  }

  return fallback ?? null;
}

/**
 * Retrieves a list of unique system media items matching a filter function.
 *
 * @param filterFn - Predicate function checking the file's extension.
 * @returns Array of unique FileSystemItems.
 */
export function getSystemMediaItems(filterFn: (extension: string) => boolean): FileSystemItem[] {
  return Object.values(ITEMS_MAP_ALL).reduce<FileSystemItem[]>((acc, item) => {
    if (item.type === 'file' && isExtensionMatched(item.extension, filterFn)) {
      const normalizedPath = item.path.toUpperCase();
      if (!acc.some((existing) => existing.path.toUpperCase() === normalizedPath)) {
        acc.push(item);
      }
    }
    return acc;
  }, []);
}

/**
 * Helper function to check if the extension matches a filter condition.
 */
function isExtensionMatched(extension: string | undefined, filterFn: (ext: string) => boolean): boolean {
  return typeof extension === 'string' && filterFn(extension);
}
