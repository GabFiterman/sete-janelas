import { beforeEach, describe, expect, it } from 'vitest';
import useUIStore from '../uiStore';

const initialStoreState = useUIStore.getState();

describe('Zustand UI Store (Kernel)', () => {
  beforeEach(() => {
    // Reset da store para um estado limpo controlado antes de cada teste
    useUIStore.setState({
      isBooting: true,
      isStartMenuOpen: false,
      startMenuAutofocusSearch: false,
      maxZIndex: 1000,
      windows: [],
      viewport: { width: 1024, height: 768 },
      workspaceIcons: initialStoreState.workspaceIcons.map((icon) => ({
        ...icon,
        dragVersion: 0,
      })),
    });

    // Mock das dimensões da tela global do jsdom
    window.innerWidth = 1024;
    window.innerHeight = 768;
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const state = useUIStore.getState();
      expect(state.isBooting).toBe(true);
      expect(state.isStartMenuOpen).toBe(false);
      expect(state.maxZIndex).toBe(1000);
      expect(state.windows).toEqual([]);
      expect(state.workspaceIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Boot State', () => {
    it('should allow toggling boot state', () => {
      useUIStore.getState().setIsBooting(false);
      expect(useUIStore.getState().isBooting).toBe(false);
    });
  });

  describe('Start Menu Toggle', () => {
    it('should set start menu open status correctly', () => {
      useUIStore.getState().setIsStartMenuOpen(true, true);
      expect(useUIStore.getState().isStartMenuOpen).toBe(true);
      expect(useUIStore.getState().startMenuAutofocusSearch).toBe(true);
    });

    it('should toggle start menu status', () => {
      useUIStore.getState().toggleIsStartMenuOpen();
      expect(useUIStore.getState().isStartMenuOpen).toBe(true);

      useUIStore.getState().toggleIsStartMenuOpen();
      expect(useUIStore.getState().isStartMenuOpen).toBe(false);
    });
  });

  describe('Window Lifecycle Management', () => {
    const mockAppWindow = {
      id: 'test-app',
      appName: 'Notepad' as const,
      iconSrc: 'notepad-icon.webp',
      title: 'Notepad Test',
    };

    it('should open a new window and assign correct properties', () => {
      useUIStore.getState().openWindow(mockAppWindow);
      const windows = useUIStore.getState().windows;

      expect(windows.length).toBe(1);
      expect(windows[0].id).toBe('test-app');
      expect(windows[0].status).toBe('normal');
      expect(windows[0].zIndex).toBe(1001); // 1000 (maxZIndex) + 1
    });

    it('should auto-maximize window if opened on a mobile device', () => {
      window.innerWidth = 375; // Simula celular
      useUIStore.getState().openWindow(mockAppWindow);

      const windows = useUIStore.getState().windows;
      expect(windows[0].status).toBe('maximized');
    });

    it('should auto-maximize AcrobatReader even on desktop', () => {
      useUIStore.getState().openWindow({
        id: 'acrobat-app',
        appName: 'AcrobatReader',
        iconSrc: 'pdf-icon.webp',
        title: 'Acrobat Reader Test',
      });

      const windows = useUIStore.getState().windows;
      expect(windows[0].status).toBe('maximized');
    });

    it('should focus existing window and increment zIndex if opened again', () => {
      useUIStore.getState().openWindow(mockAppWindow);
      const initialZIndex = useUIStore.getState().windows[0].zIndex;

      // Abre outra janela no meio
      useUIStore.getState().openWindow({
        id: 'another-app',
        appName: 'FileExplorer',
        iconSrc: 'explorer-icon.webp',
        title: 'Explorer Test',
      });

      // Abre a primeira novamente (foca)
      useUIStore.getState().openWindow(mockAppWindow);
      const finalZIndex = useUIStore.getState().windows.find((w) => w.id === 'test-app')?.zIndex;

      expect(finalZIndex).toBeGreaterThan(initialZIndex);
    });

    it('should focus window correctly', () => {
      useUIStore.getState().openWindow(mockAppWindow);
      useUIStore.getState().openWindow({
        id: 'another-app',
        appName: 'FileExplorer',
        iconSrc: 'explorer-icon.webp',
        title: 'Explorer Test',
      });

      useUIStore.getState().focusWindow('test-app');
      const testApp = useUIStore.getState().windows.find((w) => w.id === 'test-app');
      const anotherApp = useUIStore.getState().windows.find((w) => w.id === 'another-app');

      expect(testApp!.zIndex).toBeGreaterThan(anotherApp!.zIndex);
    });

    it('should close window and remove it from list', () => {
      useUIStore.getState().openWindow(mockAppWindow);
      expect(useUIStore.getState().windows.length).toBe(1);

      useUIStore.getState().closeWindow('test-app');
      expect(useUIStore.getState().windows.length).toBe(0);
    });
  });

  describe('Window Dimensions and Constraints', () => {
    const mockAppWindow = {
      id: 'test-app',
      appName: 'Notepad' as const,
      iconSrc: 'notepad-icon.webp',
      title: 'Notepad Test',
      width: 400,
      height: 300,
      x: 10,
      y: 10,
    };

    it('should update window position clamping to viewport boundaries', () => {
      useUIStore.getState().openWindow(mockAppWindow);

      // Tenta mover para fora da tela (direita/baixo)
      // Viewport width 1024, height 768. Fixed menu height = 35.
      // Max X = 1024 - 400 = 624
      // Max Y = 768 - 35 - 300 = 433
      useUIStore.getState().updateWindowPosition('test-app', 2000, 2000);

      const windowState = useUIStore.getState().windows[0];
      expect(windowState.x).toBe(624);
      expect(windowState.y).toBe(433);
    });

    it('should update window dimensions clamping positions to viewport boundaries', () => {
      useUIStore.getState().openWindow(mockAppWindow);

      // Redimensiona e tenta mover para fora
      useUIStore.getState().updateWindowDimensions('test-app', 900, 700, 200, 100);

      const windowState = useUIStore.getState().windows[0];
      // Max X = 1024 - 200 = 824
      // Max Y = 768 - 35 - 100 = 633
      expect(windowState.x).toBe(824);
      expect(windowState.y).toBe(633);
      expect(windowState.width).toBe(200);
      expect(windowState.height).toBe(100);
    });

    it('should update title and status of the window', () => {
      useUIStore.getState().openWindow(mockAppWindow);
      useUIStore.getState().updateWindowTitle('test-app', 'New Title');
      useUIStore.getState().updateWindowStatus('test-app', 'minimized');

      const windowState = useUIStore.getState().windows[0];
      expect(windowState.title).toBe('New Title');
      expect(windowState.status).toBe('minimized');
    });
  });

  describe('Workspace Icons and Collision (AABB)', () => {
    it('should update workspace icon position if no collision', () => {
      const firstIcon = useUIStore.getState().workspaceIcons[0];
      const targetX = 500;
      const targetY = 300;

      useUIStore.getState().updateWorkspaceIconPosition(firstIcon.path, targetX, targetY);
      const updatedIcon = useUIStore.getState().workspaceIcons.find((i) => i.path === firstIcon.path);

      expect(updatedIcon!.x).toBe(targetX);
      expect(updatedIcon!.y).toBe(targetY);
    });

    it('should reject movement and increment dragVersion if collision occurs', () => {
      const icons = useUIStore.getState().workspaceIcons;
      const firstIcon = icons[0];
      const secondIcon = icons[1];

      // Ambos estão em posições separadas por padrão.
      // Movemos o primeiro ícone para colidir diretamente com a posição do segundo ícone.
      const initialDragVersion = firstIcon.dragVersion ?? 0;
      useUIStore.getState().updateWorkspaceIconPosition(firstIcon.path, secondIcon.x, secondIcon.y);

      const updatedFirstIcon = useUIStore.getState().workspaceIcons.find((i) => i.path === firstIcon.path);

      // Posição deve permanecer o que era antes ou não mudar para a do segundo ícone
      expect(updatedFirstIcon!.x).toBe(firstIcon.x);
      expect(updatedFirstIcon!.y).toBe(firstIcon.y);
      expect(updatedFirstIcon!.dragVersion).toBe(initialDragVersion + 1);
    });
  });
});
