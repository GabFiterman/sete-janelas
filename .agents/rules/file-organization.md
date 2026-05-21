---
trigger: model_decision
description: Use this guide whenever you are refactoring existing applications, organizing directories, or building new features in Sete Janelas. It defines the project standards for folder structures, separation of logic, index files, and import conventions.
---

# Skill: File Organization & Architecture Standards

Use this guide whenever you are refactoring existing applications, organizing directories, or building new features in Sete Janelas. It defines the project standards for folder structures, separation of logic, index files, and import conventions.

---

## 1. Separation of Concerns (Logic vs. Presentation)

To keep application files clean and maintainable, always segregate UI presentation from state logic:

### Custom State Hooks (Logic Layer)

- Extract all state hooks (`useState`), refs (`useRef`), callbacks (`useCallback`), effects (`useEffect`), and event listeners into a custom hook located in a `hooks/` subdirectory (e.g. `useMediaCenterImage` in `hooks/useMediaCenterImage.ts`).
- The custom hook should return a single object containing all parameters, actions, and references needed by the rendering function.

### Pure Presentation Component (UI Layer)

- The main entry component (e.g. `media-center-image.tsx`) should act purely as a coordinate layout wrapper.
- It must invoke the custom state hook and map the returned properties directly to modular subcomponents. It should contain no raw state management, side effects, or business logic.

---

## 2. Directory Structure and Componentization

For complex apps, break down long files into modular components. Follow this directory pattern:

```text
my-app/
├── components/           # Extracted presentation subcomponents
│   ├── MyAppGallery.tsx
│   ├── MyAppDetail.tsx
│   └── index.ts          # Exports all subcomponents
├── hooks/                # Component-specific state hooks
│   ├── useMyApp.ts
│   └── index.ts          # Exports all hooks
├── constants/            # Configurations, static menu items, and definitions
│   ├── my-app-constants.ts
│   └── index.ts          # Exports all constants
├── my-app.scss           # Scoped vanilla SCSS styles
├── my-app.tsx            # Main presentation entry file
└── index.ts              # Entry point exporting the main app component
```

### Folder Index Files (`index.ts` pattern)

- Always place `index.ts` files inside internal subdirectories (like `components/`, `hooks/`, and `constants/`) to export their members.
- Provide a main `index.ts` at the root of the app directory to expose the main application component itself.
- This allows clean, single-statement imports in the entry file, avoiding deep path chains.
- Example `components/index.ts`:
  ```typescript
  export * from './MyAppGallery';
  export * from './MyAppDetail';
  ```

---

## 3. Import Conventions & Grouping

Imports must be organized by hierarchy and sorted alphabetically by import path. Separate imports using empty lines into the following ordered groups:

1. **Libraries**: Core React hooks and third-party dependencies (e.g., `react`, `framer-motion`).
2. **Global Components & Widgets**: App-level widgets and design system elements (e.g., `@/components`).
3. **Local Subcomponents**: Folder-local subcomponents (e.g., `./components`).
4. **Hooks & Utilities**: Custom hooks, stores, and functional helpers (e.g., `./hooks`, `@/store`, `@/utils`).
5. **Assets**: Static media files and UI icons (e.g., `@/assets`).
6. **Styles**: Scoped SASS stylesheets (e.g., `./my-app.scss`).
7. **Types**: Type-only statements sorted at the bottom (`import type { ... }`).

_Note: Inside named import lists, sort the import tokens alphabetically (e.g., `import { getMediaAssetPath, getSystemMediaItems } from '../../utils';`)._
