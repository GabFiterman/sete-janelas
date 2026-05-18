# Skill: Adding a New Application to the OS

Use this guide whenever you need to add a new application to the Sete Janelas simulator.

---

## Step 1: Create the Application Component

1. Create a new directory inside `src/components/apps/` (e.g., `src/components/apps/my-app/`).
2. Implement the component with standard window styling support. Example skeleton:

   ```tsx
   import React from 'react';
   import './my-app.scss';

   export function MyApp() {
     return (
       <div className="my-app-container">
         <h2>My New Custom App</h2>
       </div>
     );
   }
   ```

3. Export it in `src/components/apps/index.ts` so it is cleanly exposed to the window manager.

---

## Step 2: Register the Application Name & Component

1. Open [app-config.ts](file:///home/dev-fiterman/Projects/Personal/sete-janelas/src/components/apps/app-config.ts).
2. Add your application to the `AppName` type union:

   ```typescript
   export type AppName = 'InternetExplorer' | 'FileExplorer' | 'Notepad' | 'MediaCenterImage' | 'MediaCenterVideo' | 'MyApp';
   ```

3. Map the component to your app key inside `AppComponentMap`:

   ```typescript
   export const AppComponentMap: Record<AppName, React.ComponentType> = {
     // ...
     MyApp: MyApp,
   };
   ```

---

## Step 3: Define the Virtual Executable (.exe) in VFS

1. Open [all-items.ts](file:///home/dev-fiterman/Projects/Personal/sete-janelas/src/constants/file-system/all-items.ts).
2. Create or append the item inside the appropriate directory mapping (e.g., `ITEMS_MAP_SISTEMA_DE_ARQUIVOS`):

   ```typescript
   'C:/SISTEMA_DE_ARQUIVOS/MYAPP.EXE': {
     extension: '.exe',
     iconSrc: customAppIcon,
     label: 'My Custom App',
     path: 'C:/Sistema de arquivos/myapp.exe',
     type: 'file',
     uri: 'sistema_de_arquivos/myapp.exe',
     appName: 'MyApp',
   }
   ```

---

## Step 4: Map the Executable inside the Directory Tree

1. Open [file-system.ts](file:///home/dev-fiterman/Projects/Personal/sete-janelas/src/constants/file-system/file-system.ts).
2. Make sure the containing folder (e.g., `'C:/SISTEMA_DE_ARQUIVOS'`) is fully mapped and populated with the item list:

   ```typescript
   'C:/SISTEMA_DE_ARQUIVOS': Object.values(ITEMS_MAP_SISTEMA_DE_ARQUIVOS),
   ```

---

## Step 5: (Optional) Register in shortcuts, Start Menu or Workspace

- To add the app as a default taskbar/start menu shortcut, update [use-start-menu.ts](file:///home/dev-fiterman/Projects/Personal/sete-janelas/src/components/start-menu/use-start-menu.ts).
- To add a desktop icon shortcut, add it to `ITEMS_MAP_WORKSPACE` in `src/constants/file-system/workspace.ts`.
