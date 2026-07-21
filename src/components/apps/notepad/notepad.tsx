import { NotepadController, NotepadCanvas } from './components';
import { useNotepad } from './hooks';
import { type FileSystemItem } from '@/constants';
import './notepad.scss';

export interface NotepadProps {
  initialItem?: FileSystemItem;
  windowId?: string;
}

function Notepad({ initialItem, windowId }: NotepadProps) {
  const { initialTextSource } = useNotepad(initialItem, windowId);

  return (
    <div className="notepad-container">
      <NotepadController />
      <NotepadCanvas defaultValue={initialTextSource} />
    </div>
  );
}

export default Notepad;
