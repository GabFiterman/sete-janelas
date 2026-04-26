import { type PanInfo } from 'framer-motion';
import useUIStore from '@/store/uiStore';

type ElementType = 'icon' | 'window';

/**
 * Hook customizado para gerenciar a lógica de drag-and-drop de janelas e ícones.
 * @param id ID do elemento.
 * @param type Tipo do elemento ('icon' ou 'window').
 * @param initialX Posição X inicial antes do drag.
 * @param initialY Posição Y inicial antes do drag.
 */
export function useDraggableElement(id: string, type: ElementType, initialX: number, initialY: number) {
  const { updateWorkspaceIconPosition, updateWindowPosition } = useUIStore();

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newX = initialX + info.offset.x;
    const newY = initialY + info.offset.y;

    switch (type) {
      case 'icon': {
        updateWorkspaceIconPosition(id, newX, newY);
        break;
      }
      case 'window': {
        updateWindowPosition(id, newX, newY);
        break;
      }
      default:
        console.error('Tipo de elemento não suportado:', type);
        break;
    }
  };

  return {
    handleDragEnd,
    dragProps: {
      dragMomentum: false,
      dragElastic: 0,
      onDragEnd: handleDragEnd,
    },
  };
}

export default useDraggableElement;
