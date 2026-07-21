import {
  copyIcon,
  cutIcon,
  excludeIcon,
  flexBox1Icon,
  flexBox2Icon,
  galleryIcon,
  pasteIcon,
  questionIcon,
} from '@/assets';

import {
  type ActionItem,
  type ControllerItem,
  type SeparatorItem,
} from '@/components/common/widgets/app-controller-widget/app-controller-widget';

import { useTranslation } from 'react-i18next';

export const separatorItem: SeparatorItem = {
  value: 'separator',
};

export const useControllerItems = (): ControllerItem[] => {
  const { t } = useTranslation();

  return [
    {
      disabled: true,
      dropdown: true,
      label: t('apps.fileExplorer.organize'),
      shortcut: null,
      value: 'organize',
      dropDownItems: [
        {
          disabled: true,
          iconSrc: cutIcon,
          label: t('apps.fileExplorer.organizeBox.cut'),
          shortcut: null,
          value: 'cut',
        },
        {
          disabled: true,
          iconSrc: copyIcon,
          label: t('apps.fileExplorer.organizeBox.copy'),
          shortcut: null,
          value: 'copy',
        },
        {
          disabled: true,
          iconSrc: pasteIcon,
          label: t('apps.fileExplorer.organizeBox.paste'),
          shortcut: null,
          value: 'paste',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.undo'),
          shortcut: null,
          value: 'undo',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.redo'),
          shortcut: null,
          value: 'redo',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.selectAll'),
          shortcut: null,
          value: 'select-all',
        },
        separatorItem,
        {
          disabled: true,
          iconSrc: flexBox2Icon,
          label: t('apps.fileExplorer.organizeBox.layout'),
          shortcut: null,
          value: 'layout',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.pasteSearchOptions'),
          shortcut: null,
          value: 'paste-search-options',
        },
        separatorItem,
        {
          disabled: true,
          iconSrc: excludeIcon,
          label: t('apps.fileExplorer.organizeBox.delete'),
          shortcut: null,
          value: 'delete',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.rename'),
          shortcut: null,
          value: 'rename',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.removeProps'),
          shortcut: null,
          value: 'remove-props',
        },
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.props'),
          shortcut: null,
          value: 'props',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.fileExplorer.organizeBox.close'),
          shortcut: null,
          value: 'close',
        },
      ],
    },
    // {
    //   title: 'include-library',
    //   name: 'Incluir na biblioteca',
    //   dropdown: true,
    // },
    // {
    //   title: 'share',
    //   name: 'Compartilhar com',
    //   dropdown: true,
    // },
    {
      disabled: true,
      dropdown: false,
      label: t('apps.fileExplorer.newFolder'),
      shortcut: null,
      value: 'new-folder',
    },
  ];
};

export const useActionItems = (): ActionItem[] => {
  return [
    {
      disabled: true,
      dropdown: true,
      iconSrc: galleryIcon,
      label: 'view icon',
      value: 'view',
    },
    {
      disabled: true,
      dropdown: false,
      iconSrc: flexBox1Icon,
      label: 'layout icon',
      value: 'layout',
    },
    {
      disabled: true,
      dropdown: false,
      iconSrc: questionIcon,
      label: 'help icon',
      value: 'help',
    },
  ];
};
