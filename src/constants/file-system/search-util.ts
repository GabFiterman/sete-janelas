import { ITEMS_MAP_ALL, type FileSystemItem } from '../file-system-map';

/**
 * Searches the entire Virtual File System (VFS) for items matching the given query.
 * Normalizes strings by removing accents and lowercasing for robust fuzzy-like matching.
 * Returns a list of unique items matching the query.
 */
export const searchVFS = (query: string): FileSystemItem[] => {
  if (!query) return [];

  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
      .toLowerCase()
      .trim();

  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const seenPaths = new Set<string>();
  const results: FileSystemItem[] = [];

  for (const key in ITEMS_MAP_ALL) {
    const item = ITEMS_MAP_ALL[key];
    if (!item) continue;

    const labelNorm = normalize(item.label);
    const pathNorm = normalize(item.path);

    if (
      (labelNorm.includes(normalizedQuery) || pathNorm.includes(normalizedQuery)) &&
      !seenPaths.has(item.path.toUpperCase())
    ) {
      seenPaths.add(item.path.toUpperCase());
      results.push(item);
    }
  }

  return results;
};
