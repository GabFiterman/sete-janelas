import { useFileExplorerStore } from '../../use-file-explorer';
import { folderUserIcon } from '@/assets';
import { searchVFS } from '@/constants';

function FileExplorerFooter() {
  const { currentDirectoryContents, getSelectedItemsLength, searchQuery } = useFileExplorerStore();

  const totalItems = searchQuery.trim() ? searchVFS(searchQuery).length : currentDirectoryContents?.length || 0;

  return (
    <div className="file-explorer-footer">
      <img src={folderUserIcon} alt="folder-user-icon" />
      <span>
        {totalItems === 1 ? '1 Item' : `${totalItems} Itens`}{' '}
        {getSelectedItemsLength() > 0 &&
          (getSelectedItemsLength() === 1 ? '(1 selecionado)' : `(${getSelectedItemsLength()} selecionados)`)}
      </span>
    </div>
  );
}

export default FileExplorerFooter;
