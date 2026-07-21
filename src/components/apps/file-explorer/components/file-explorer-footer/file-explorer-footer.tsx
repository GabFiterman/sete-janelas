import { useFileExplorerStore } from '../../use-file-explorer';
import { folderUserIcon } from '@/assets';
import { searchVFS } from '@/constants';
import { useTranslation } from 'react-i18next';

function FileExplorerFooter() {
  const { t } = useTranslation();
  const { currentDirectoryContents, getSelectedItemsLength, searchQuery } = useFileExplorerStore();

  const totalItems = searchQuery.trim() ? searchVFS(searchQuery).length : currentDirectoryContents?.length || 0;

  return (
    <div className="file-explorer-footer">
      <img src={folderUserIcon} alt="folder-user-icon" />
      <span>
        {totalItems === 1 ? t('apps.fileExplorer.item') : `${totalItems} ${t('apps.fileExplorer.items')}`}{' '}
        {getSelectedItemsLength() > 0 &&
          (getSelectedItemsLength() === 1 ? `(1 ${t('apps.fileExplorer.selected')})` : `(${getSelectedItemsLength()} ${t('apps.fileExplorer.selecteds')})`)}
      </span>
    </div>
  );
}

export default FileExplorerFooter;
