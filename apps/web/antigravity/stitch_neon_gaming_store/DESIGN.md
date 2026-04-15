# Design System Specification: High-Tech Gaming E-Commerce

## 1. Overview & Creative North Star: "The Neon Monolith"
This design system is built to evoke the feeling of a premium, high-performance gaming rig. Our Creative North Star is **"The Neon Monolith."** We are moving away from the "busy" clutter of traditional e-commerce to create an editorial, immersive experience that feels like a curated gallery of high-end hardware.

To achieve this, the system breaks the "standard template" look through **Tonal Immersion**. We do not use borders to define space; we use light, shadow, and depth. The layout should feel like a single, seamless slab of dark obsidian where content is revealed through glows and subtle surface elevations.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep blacks and charcoal, punctuated by a hyper-vibrant accent.

### Surface Hierarchy & Nesting (The "No-Line" Rule)
**Strict Guideline:** 1px solid borders are prohibited for sectioning. Boundaries must be defined solely through background color shifts or tonal transitions.
- **Base Layer:** Use `surface` (#0e0e0e) for the global background.
- **Sectioning:** Use `surface-container-low` (#131313) for large content areas.
- **Component Level:** Use `surface-container` (#1a1a1a) or `surface-container-high` (#20201f) for cards and interactive modules.
- **The Depth Stack:** To create a "nested" feel, an inner container should always be one tier higher or lower than its parent (e.g., a `surface-container-highest` search bar sitting inside a `surface-container` header).

### The "Glass & Gradient" Rule
To move beyond a flat UI, use **Glassmorphism** for floating elements (like Navigation Bars or Hovering Quick-Buy menus). 
- **Recipe:** `surface-container` color at 60% opacity + 20px Backdrop Blur.
- **Signature Textures:** For primary CTAs, do not use a flat hex. Use a linear gradient from `primary` (#6dddff) to `primary-container` (#00d2fd) at a 135° angle to give the "Neon Blue" a sense of energy and physical glow.

---

## 3. Typography: Editorial Authority
We utilize a dual-typeface system to balance technical precision with modern "tech-brutalist" aesthetics.

- **The Display Voice:** `Space Grotesk` is used for all `display` and `headline` roles. Its quirky, geometric terminals feel like code but read like high-end fashion. Use wide tracking (-2%) on large headlines to create a "compressed" high-tech look.
- **The Functional Voice:** `Inter` handles all `title`, `body`, and `label` roles. It provides maximum legibility for specs, prices, and descriptions.
- **Hierarchy as Brand:** Use `display-lg` for product names in hero sections to create an "Editorial" feel. Use `label-sm` in all-caps with 5% letter-spacing for technical specs to mimic a blueprint or HUD.

---

## 4. Elevation & Depth
In a dark theme, shadows are not just "darker"—they are the absence of light.

- **The Layering Principle:** Depth is achieved by "stacking" surface tiers. A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft "recessed" look, perfect for secondary content.
- **Ambient Glows (Not Shadows):** For floating items, use a "Neon Shadow." Instead of a black shadow, use a 4% opacity version of `primary` (#6dddff) with a 40px blur. This makes the component look like it is emitting light onto the surface below.
- **The Ghost Border:** If a border is required for accessibility, it must be `outline-variant` (#484847) at **15% opacity**. This creates a suggestion of an edge without breaking the "Monolith" aesthetic.

---

## 5. Components

### Buttons (High-Velocity Interaction)
- **Primary:** Gradient (`primary` to `primary-container`). `Rounded-md` (0.375rem). Text: `title-sm` (Inter, Bold). Hover effect: Increase glow (drop-shadow with primary color) and 1.02x scale.
- **Secondary:** Transparent background with a `Ghost Border`. Text: `primary`.
- **Tertiary:** Text only. Use `label-md` in all-caps.

### Cards & Lists (The Modern Spec Sheet)
- **Rule:** Forbid divider lines. Use `surface-container-low` for the card body and `surface-container-high` for the "footer" or "header" section of the card.
- **Hover:** Cards should shift from `surface-container` to `surface-container-highest` on hover, accompanied by a subtle 1px "Neon Glow" top-border (the only exception to the no-line rule).

### Input Fields
- **Style:** `surface-container-highest` background. No border. 
- **Focus State:** 1px `primary` bottom-border only. This mimics the "scanning" line of a high-tech interface.

### Interactive "HUD" Elements (Gaming Specific)
- **Status Chips:** Use `tertiary` (#82a3ff) for "In Stock" and `error` (#ff716c) for "Limited Edition." 
- **Performance Gauges:** Use linear progress bars with `primary` gradients to display specs like "Clock Speed" or "Frame Rate."

---

## 6. Do's and Don'ts

### Do:
- **Do use intentional asymmetry.** If you have a 3-column grid, let one element span 2 columns to break the "template" feel.
- **Do use "Breathable" Spacing.** Gaming hardware is complex; the UI shouldn't be. Use `1.5rem` to `2rem` of padding inside containers to let the "Neon Monolith" breathe.
- **Do use color as a beacon.** Use `primary` (#6dddff) sparingly. If everything is blue, nothing is important.

### Don't:
- **Don't use pure #000000.** It creates "smearing" on OLED screens and feels "cheap." Stick to the defined `surface` (#0e0e0e).
- **Don't use 100% opaque lines.** They kill the immersive depth. If you feel you need a line, try using a 1px gap between two different surface colors instead.
- **Don't use standard drop shadows.** They look "dirty" on dark themes. Use tonal layering or ambient glows.