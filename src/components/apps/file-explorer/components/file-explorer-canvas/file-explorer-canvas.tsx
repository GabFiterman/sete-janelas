import { useFileExplorerStore } from '../../use-file-explorer';
import { BtnIconTextLink } from '@/components';
import { searchVFS, type FileSystemItem } from '@/constants';
import { isImageByExtension } from '@/utils';
import { getMediaAssetPath } from '@/components/apps/media-center/utils';
import { useVFS } from '@/hooks';

function FileExplorerCanvas() {
  const { currentDirectoryContents, getIsItemSelected, navigateTo, toggleItemSelection, searchQuery, setSearchQuery } =
    useFileExplorerStore();
  const { getLabel } = useVFS();

  const rawItems = searchQuery.trim() ? searchVFS(searchQuery) : currentDirectoryContents;
  const itemsToRender = (rawItems || []).filter((item): item is FileSystemItem => item !== undefined && item !== null);

  return (
    <div className="file-explorer-canvas-container">
      {searchQuery.trim() && (
        <div className="file-explorer-search-banner" onMouseDown={(e) => e.stopPropagation()}>
          <span className="search-banner-text">
            Resultados de pesquisa para: <strong className="query-highlight">"{searchQuery}"</strong>
          </span>
          <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
            Fechar pesquisa
          </button>
        </div>
      )}

      <main
        className="file-explorer-canvas"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          toggleItemSelection(event, null);
        }}
      >
        {itemsToRender?.length > 0 ? (
          itemsToRender.map((item, index) => {
            const isImage = item?.type === 'file' && isImageByExtension(item?.extension);
            const resolvedIcon = isImage ? (
              <div className="file-explorer-thumbnail-container">
                <img
                  src={getMediaAssetPath(item) || item?.iconSrc}
                  className="file-explorer-thumbnail"
                  alt={getLabel(item)}
                />
              </div>
            ) : (
              item?.iconSrc
            );

            return (
              <BtnIconTextLink
                className="canvas-icon"
                icon={resolvedIcon}
                iconSize="40px"
                key={item?.path || index}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItemSelection(event, item);
                }}
                onDoubleClick={() => navigateTo(item)}
                orientation="vertical"
                selected={getIsItemSelected(item)}
                text={`${getLabel(item)}${item.type === 'file' ? item.extension : ''}`}
              />
            );
          })
        ) : searchQuery.trim() ? (
          <div className="file-explorer-search-empty" onMouseDown={(e) => e.stopPropagation()}>
            Nenhum item correspondente encontrado neste computador.
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default FileExplorerCanvas;
