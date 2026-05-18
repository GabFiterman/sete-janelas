# Skill: Window Manager API

Use this guide whenever you need to interact with the Zustand Kernel (`uiStore.ts`) to open, close, or modify windows dynamically within any React component.

---

## The `uiStore.ts` Contract

The OS Kernel manages `WindowState` objects inside a `windows` array.

```typescript
export interface WindowState {
  id: string; // Unique GUID for the instance
  appName: AppName; // Identifier used to map to React Component
  title: string;
  iconSrc: string;
  status: 'normal' | 'minimized' | 'maximized';
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
  appProps?: Record<string, unknown>; // Data injected into the component
}
```

---

## Core Actions

Import the hook in your component:

```typescript
import useUIStore from '@/store/uiStore';
```

### 1. Opening a Window (`openWindow`)

`openWindow` handles mounting the app. It automatically resolves dimensions, bounds them inside the viewport, and pushes the window to the highest `zIndex`.

```typescript
const { openWindow } = useUIStore();

// Example: Triggering a text editor
const handleLaunchNotepad = () => {
  openWindow({
    id: `notepad-${Date.now()}`,
    appName: 'Notepad',
    title: 'Anotações.txt - Bloco de Notas',
    iconSrc: '/assets/icons/notepad.png',
    // Optional appProps to pre-load a file
    appProps: { defaultText: "Hello World" }
  });
};
```

### 2. Focusing a Window (`focusWindow`)

To bring an existing window to the foreground, call `focusWindow`.

```typescript
const { focusWindow } = useUIStore();

// Example: On Click of a taskbar icon
focusWindow('my-unique-window-id');
```

### 3. Closing a Window (`closeWindow`)

```typescript
const { closeWindow } = useUIStore();

// Example: On Click of the X button in the window frame
closeWindow('my-unique-window-id');
```

---

## Advanced Behaviors

### 1. Viewport Clamping & Draggable State

The store provides `updateWindowPosition` and `updateWindowDimensions` which automatically clamp `x` and `y` so that the window cannot leave the visible area.
Do **NOT** mutate the store's `windows` array directly. Always use these actions.

### 2. Mobile Device Enforcement

When `openWindow` is called, the store checks `window.innerWidth`. If it's beneath a tablet threshold (768px), the `status` defaults to `'maximized'` automatically.

### 3. State Injection via `appProps`

Any data defined in `appProps` when launching `openWindow` will be passed down to the application container via `React.cloneElement` or direct props passing in the Window Manager wrapper. Ensure your app component types allow for these dynamic properties.
