import { useFileExplorerStore } from '../../use-file-explorer';
import { BtnIconTextLink } from '@/components';
import { searchVFS } from '@/constants';

function FileExplorerCanvas() {
  const { currentDirectoryContents, getIsItemSelected, navigateTo, toggleItemSelection, searchQuery, setSearchQuery } =
    useFileExplorerStore();

  const itemsToRender = searchQuery.trim() ? searchVFS(searchQuery) : currentDirectoryContents;

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
          itemsToRender.map((item, index) => (
            <BtnIconTextLink
              className="canvas-icon"
              icon={item?.iconSrc}
              iconSize="40px"
              key={item?.path || index}
              onClick={(event) => {
                event.stopPropagation();
                toggleItemSelection(event, item);
              }}
              onDoubleClick={() => navigateTo(item)}
              orientation="vertical"
              selected={getIsItemSelected(item)}
              text={`${item?.label}${item.type === 'file' ? item.extension : ''}`}
            />
          ))
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
