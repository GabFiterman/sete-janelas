import { AppControllerWidget } from '@/components';

import { useControllerItems } from '../../constants/notepad-constants';

function NotepadController() {
  const controllerItems = useControllerItems();

  return (
    <div className="notepad-controller-container">
      <AppControllerWidget
        controllerItems={controllerItems}
        controllerStyle="compact"
        onClickControllerDropdownItem={(event, item) => console.log('onClickControllerDropdownItem', { item, event })}
        onClickControllerItem={(event, item) => console.log('onClickControllerItem', { item, event })}
      />
    </div>
  );
}

export default NotepadController;
