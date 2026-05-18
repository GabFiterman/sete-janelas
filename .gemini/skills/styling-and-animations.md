# Skill: Styling & Animations

Use this guide whenever you are building UI elements and need to ensure they match the high-fidelity Windows 7 aesthetic and Sete Janelas standards.

---

## 1. Aero Design System (SCSS Variables)

All core colors, borders, shadows, and specific gradients are exported as variables in `src/styles/_variables.scss`.

**Do not hardcode hex codes or raw rgba values for thematic elements.**

```scss
@import '@/styles/variables';

.my-custom-container {
  // Use Aero Glass background tokens
  background: $aero-glass-base;
  
  // Outer bright border
  border: 1px solid $aero-border;
  
  // Shadows based on z-index depth or focus
  box-shadow: $shadow-active;
}
```

### Typography and Spacing

Use standard font variables to ensure scalability.

- Sizes: `$font-size-sm`, `$font-size-md`, `$font-size-lg`
- Spacing: `$spacing-sm`, `$spacing-md`, `$gap-md`

---

## 2. Animation Guidelines (Framer Motion)

The `framer-motion` library dictates all system micro-interactions.

### Mount / Unmount Best Practices

Whenever building a modal, menu, or window, use `<AnimatePresence>` to enable exit animations.

```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Basic Fade & Scale in
const containerVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
};

export const MyComponent = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        Content
      </motion.div>
    )}
  </AnimatePresence>
);
```

### Interaction Feedback

Use `whileHover` and `whileTap` for immediate, fluid tactile feedback on interactive buttons and icons.

```tsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

---

## 3. Atomic SASS Integration

The Sete Janelas SCSS structure follows a lightweight variation of Atomic CSS:

- **`_base.scss`**: Root element styles (`body`, `html`, `#root`), font face imports.
- **`_utilities.scss`**: Reusable generic layout helpers if necessary.
- **`_variables.scss`**: All design tokens.
- **`index.scss`**: The master file importing all the above.

For specific React Components, prefer scoped `<ComponentName>.scss` files imported directly into the `.tsx` file (e.g. `import './my-app.scss'`). Avoid CSS Modules unless strictly required by a generic, highly-reused utility component to prevent bleeding.
