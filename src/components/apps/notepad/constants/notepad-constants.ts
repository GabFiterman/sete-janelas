import {
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
      label: t('apps.notepad.file'),
      shortcut: null,
      value: 'file',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.notepad.fileBox.new'),
          shortcut: 'Ctrl+N',
          value: 'new',
        },
        {
          disabled: true,
          label: t('apps.notepad.fileBox.open'),
          shortcut: 'Ctrl+O',
          value: 'open',
        },
        {
          disabled: true,
          label: t('apps.notepad.fileBox.save'),
          shortcut: 'Ctrl+S',
          value: 'save',
        },
        {
          disabled: true,
          label: t('apps.notepad.fileBox.saveAs'),
          shortcut: null,
          value: 'save-as',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.fileBox.configPage'),
          shortcut: null,
          value: 'config-page',
        },
        {
          disabled: true,
          label: t('apps.notepad.fileBox.print'),
          shortcut: 'Ctrl+P',
          value: 'print',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.fileBox.close'),
          shortcut: null,
          value: 'close',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.notepad.edit'),
      shortcut: null,
      value: 'edit',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.notepad.editBox.undo'),
          shortcut: 'Ctrl+Z',
          value: 'undo',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.redo'),
          shortcut: 'Ctrl+Shift+Z',
          value: 'redo',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.editBox.cut'),
          shortcut: 'Ctrl+X',
          value: 'cut',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.paste'),
          shortcut: 'Ctrl+C',
          value: 'paste',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.delete'),
          shortcut: 'Del',
          value: 'delete',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.editBox.find'),
          shortcut: 'Ctrl+F',
          value: 'find',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.findNext'),
          shortcut: 'F3',
          value: 'find-next',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.replace'),
          shortcut: 'Ctrl+H',
          value: 'replace',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.goTo'),
          shortcut: 'Ctrl+G',
          value: 'go-to',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.editBox.selectAll'),
          shortcut: 'Ctrl+A',
          value: 'select-all',
        },
        {
          disabled: true,
          label: t('apps.notepad.editBox.dateTime'),
          shortcut: 'F5',
          value: 'date-time',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.notepad.format'),
      shortcut: null,
      value: 'format',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.notepad.formatBox.wordWrap'),
          shortcut: null,
          value: 'line-break',
        },
        {
          disabled: true,
          label: t('apps.notepad.formatBox.font'),
          shortcut: null,
          value: 'font',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.notepad.view'),
      shortcut: null,
      value: 'view',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.notepad.viewBox.statusBar'),
          shortcut: null,
          value: 'status-bar',
        },
      ],
    },
    {
      disabled: true,
      dropdown: true,
      label: t('apps.notepad.help'),
      shortcut: null,
      value: 'help',
      dropDownItems: [
        {
          disabled: true,
          label: t('apps.notepad.helpBox.viewHelp'),
          shortcut: null,
          value: 'view-help',
        },
        separatorItem,
        {
          disabled: true,
          label: t('apps.notepad.helpBox.about'),
          shortcut: null,
          value: 'about-notepad',
        },
      ],
    },
  ];
};
