import {
  type ControllerItem,
  type SeparatorItem,
} from '@/components/common/widgets/app-controller-widget/app-controller-widget';

import { blocksIcon, copyIcon, excludeIcon, printerIcon } from '@/assets';
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
      label: t('apps.mediaCenterImage.file'),
      shortcut: null,
      value: 'file',
      dropDownItems: [
        {
          disabled: true,
          iconSrc: excludeIcon,
          label: t('apps.mediaCenterImage.fileBox.delete'),
          shortcut: 'Del',
          value: 'delete',
        },
        {
          disabled: true,
          label: t('apps.mediaCenterImage.fileBox.createCopy'),
          shortcut: null,
          value: 'create_copy',
        },
        separatorItem,
        {
          disabled: true,
          iconSrc: copyIcon,
          label: t('apps.mediaCenterImage.fileBox.copy'),
          shortcut: null,
          value: 'copy',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.mediaCenterImage.fileBox.props'),
          shortcut: 'Alt+Enter',
          value: 'close',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.mediaCenterImage.fileBox.close'),
          shortcut: null,
          value: 'close',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.mediaCenterImage.print'),
      shortcut: null,
      value: 'print',
      dropDownItems: [
        {
          disabled: true,
          iconSrc: printerIcon,
          label: t('apps.mediaCenterImage.printBox.print'),
          shortcut: 'Ctrl+]',
          value: 'print',
        },
        {
          disabled: true,
          // TODO: Atualizar icon
          iconSrc: blocksIcon,
          label: t('apps.mediaCenterImage.printBox.orderCopies'),
          value: 'print',
        },
      ],
    },
    {
      disabled: true,
      dropdown: false,
      label: t('apps.mediaCenterImage.email'),
      shortcut: null,
      value: 'email',
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.mediaCenterImage.record'),
      shortcut: null,
      value: 'record',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.mediaCenterImage.recordBox.dataDisk'),
          shortcut: null,
          value: 'data-disk',
        },
        {
          disabled: true,
          label: t('apps.mediaCenterImage.recordBox.dvdVideo'),
          shortcut: null,
          value: 'dvd-video',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.mediaCenterImage.open'),
      shortcut: null,
      value: 'open',
      dropDownItems: [
        {
          disabled: true,
          // TODO: Atualizar icon
          iconSrc: blocksIcon,
          label: t('apps.mediaCenterImage.openBox.paint'),
          shortcut: null,
          value: 'open-paint',
        },
        {
          disabled: true,
          // TODO: Atualizar icon
          iconSrc: blocksIcon,
          label: t('apps.mediaCenterImage.openBox.firefox'),
          shortcut: null,
          value: 'open-firefox',
        },
        {
          disabled: true,
          // TODO: Atualizar icon
          iconSrc: blocksIcon,
          label: t('apps.mediaCenterImage.openBox.wmc'),
          shortcut: null,
          value: 'oepn-windows-media-center',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.mediaCenterImage.openBox.chooseProgram'),
          shortcut: null,
          value: 'open-choose-program',
        },
      ],
    },
  ];
};
