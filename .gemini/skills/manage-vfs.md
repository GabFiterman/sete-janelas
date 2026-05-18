# Skill: Managing & Modifying the Virtual File System (VFS)

Use this guide whenever you need to add, delete, or modify directories, files, and links in the VFS.

---

## Architecture Context

The VFS is a path-indexed data structure built of:

1. **`ITEMS_MAP_ALL`**: A flat index of all items in the system, where the keys are normalized uppercase paths.
2. **`STRUCTURE_MAP_FILE_SYSTEM`**: A tree-like map that maps any folder's uppercase path to a list of its immediate child `FileSystemItem` objects.
3. **`ALIAS_TO_PATH_MAP`**: Built dynamically on load, mapping a URI alias (e.g. `usuarios/`) to its physical VFS path (`C:/Usuários`).

---

## Procedure: Adding a Directory or File

### Step 1: Define the Item Metadata

1. Locate the correct sub-file in `src/constants/file-system/` (e.g., `documents.ts`, `images.ts`, `all-items.ts`).
2. Add your new item. Make sure you use the exact properties:
   - **`extension`**: `'/'` for folders, or file extensions (e.g. `'.webp'`, `'.txt'`, `'.exe'`).
   - **`type`**: `'folder' | 'file' | 'drive' | 'link' | 'externalLink'`.
   - **`appName`**: (Optional) Specify this for `.exe` file types to bind them to a React app component in the Window Manager.

   ```typescript
   'C:/USUARIOS/FITERMAN/DOCUMENTOS/MY_FILE.TXT': {
     extension: '.txt',
     iconSrc: notepadIcon,
     label: 'Anotações',
     path: 'C:/Usuários/Fiterman/Documentos/my_file.txt',
     type: 'file',
     uri: 'documentos/my_file.txt',
   }
   ```

---

### Step 2: Register it in the Directory Tree

1. Open [file-system.ts](file:///home/dev-fiterman/Projects/Personal/sete-janelas/src/constants/file-system/file-system.ts).
2. Append the item into the array value of its parent directory key:

   ```typescript
   'C:/USUARIOS/FITERMAN/DOCUMENTOS': [
     // ...
     ITEMS_MAP_DOCUMENTS['C:/USUARIOS/FITERMAN/DOCUMENTOS/MY_FILE.TXT'],
   ]
   ```

---

### Step 3: Verify the Navigation

1. Run the local dev server.
2. Open **File Explorer** and verify that:
   - The file is visible in its parent folder with its correct icon.
   - Searching for its label or path in any search input (Start Menu, Explorer, Fixed Menu) returns it instantly.
   - Double-clicking or tapping the file successfully triggers its mapped extension action or launches its `appName`.
