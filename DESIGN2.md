# SignalScope Frontend Design System

> **Status:** Proposed / implementation-ready  
> **Project:** SignalScope — Telling Real From Synthetic in the Age of Generative Media  
> **Scope:** Frontend only  
> **Primary task:** BUG-005 — Research & Define Frontend Design System  
> **Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4.0, shadcn/ui  
> **Design direction:** Monochrome forensic / precision interface  
> **Last updated:** 2026-09-12

---

## 1. Purpose

This document is the **single source of truth for SignalScope's frontend visual language**.

Every new page, component, state, animation, or UI refinement should follow this document unless a deliberate design decision is made and recorded.

SignalScope is an AI-powered image authenticity analysis product. The interface must make sophisticated computer-vision analysis feel **simple, trustworthy, calm, and technically credible**.

The design should communicate:

- precision
- evidence over decoration
- confidence without false certainty
- technical credibility
- speed and responsiveness
- visual clarity
- accessibility

The UI must **never imply that a prediction is absolute proof**.

Use:

> **Likely AI-generated**  
> **Confidence: 88%**

Do not use:

> **100% FAKE**  
> **Definitely AI**

This follows the project's responsible-UX requirement.

---

## 2. Design References & Synthesis

This system is an original SignalScope design direction informed by publicly observable patterns from:

1. **Vercel / Geist** — black-and-white precision, strong typography, restrained borders, compact controls, high-contrast surfaces.
2. **Linear** — extremely disciplined spacing, dark product surfaces, restrained accent usage, dense technical UI, precise hierarchy.
3. **Supabase** — developer-oriented information architecture, explicit surface/border tokens, structured dashboards, accessible semantic color usage.
4. **getdesign.md** — the DESIGN.md methodology: encode palette, typography, spacing, radius, elevation, components, and motion as reusable rules rather than ad-hoc styling.
5. **Awwwards** — interaction references for hover, scroll, page transitions, loading/preloader continuity, and micro-interactions.

These are **references, not copies**. SignalScope must not reproduce another product's branding, logo, exact layouts, or proprietary visual identity.

### Selected direction

**Vercel precision + Linear restraint + Supabase product clarity + Awwwards-level motion discipline.**

The final SignalScope identity is intentionally more forensic than a marketing site:

> **Monochrome first. Evidence first. Motion second.**

---

## 3. Design Principles

### 3.1 Evidence over decoration

Every visual element should help the user:

- upload an image
- understand processing
- interpret the verdict
- inspect evidence
- understand confidence
- recover from an error

Avoid decorative UI that competes with the analysis.

### 3.2 Calm confidence

The product should feel confident without pretending the model is infallible.

Use measured labels:

- Likely AI-generated
- Likely real
- Confidence: 88%
- Analysis complete
- Evidence available

Avoid:

- Fake
- Guaranteed
- Proven
- 100% certain

### 3.3 Monochrome hierarchy

Color is not the primary hierarchy mechanism.

Use:

1. contrast
2. typography
3. spacing
4. borders
5. surface elevation
6. motion

Color should be reserved for semantic states or a deliberately approved future brand accent.

### 3.4 Technical but approachable

SignalScope should look credible to:

- journalists
- fact-checkers
- platforms
- technical users
- everyday users

Do not expose unnecessary ML jargon in the primary flow.

### 3.5 Progressive disclosure

Show the most important information first:

```text
Verdict
  ↓
Confidence
  ↓
Image
  ↓
Evidence
  ↓
Technical details
```

Advanced details should be available without overwhelming first-time users.

---

# 4. Visual Language

## 4.1 Overall aesthetic

**Keywords**

- forensic
- monochrome
- precise
- editorial
- technical
- minimal
- calm
- high signal-to-noise
- modern developer tooling

**Avoid**

- excessive gradients
- neon cyberpunk styling
- glassmorphism everywhere
- giant decorative blobs
- excessive rounded cards
- excessive shadows
- animated backgrounds
- rainbow AI aesthetics
- unnecessary 3D

---

# 5. Color System

SignalScope uses a **near-monochrome foundation**.

## 5.1 Light theme

| Token | Hex | Purpose |
|---|---|---|
| `--bg` | `#FAFAFA` | Application canvas |
| `--surface` | `#FFFFFF` | Cards, panels, upload areas |
| `--surface-subtle` | `#F5F5F5` | Secondary surfaces |
| `--surface-hover` | `#F0F0F0` | Hover state |
| `--ink` | `#171717` | Primary text / primary action |
| `--text-secondary` | `#525252` | Secondary text |
| `--text-muted` | `#737373` | Metadata / captions |
| `--border` | `#E5E5E5` | Default border |
| `--border-strong` | `#D4D4D4` | Emphasized border |
| `--focus` | `#171717` | Keyboard focus |
| `--inverse` | `#FFFFFF` | Text on dark surfaces |

## 5.2 Dark theme

| Token | Hex | Purpose |
|---|---|---|
| `--bg` | `#09090B` | Application canvas |
| `--surface` | `#111113` | Cards / panels |
| `--surface-subtle` | `#18181B` | Secondary surfaces |
| `--surface-hover` | `#202023` | Hover state |
| `--ink` | `#FAFAFA` | Primary text |
| `--text-secondary` | `#A1A1AA` | Secondary text |
| `--text-muted` | `#71717A` | Metadata |
| `--border` | `#27272A` | Default border |
| `--border-strong` | `#3F3F46` | Emphasized border |
| `--focus` | `#FAFAFA` | Keyboard focus |
| `--inverse` | `#09090B` | Text on light surfaces |

## 5.3 Semantic states

Semantic colors must be used sparingly and never become the visual identity.

| State | Light | Dark | Usage |
|---|---|---|---|
| Success | `#166534` | `#4ADE80` | Successful upload / completed operation |
| Warning | `#A16207` | `#FACC15` | Caution / uncertain state |
| Error | `#B91C1C` | `#F87171` | Validation / system error |
| Info | `#1D4ED8` | `#60A5FA` | Informational messages |

For verdicts, **do not depend on color alone**. Always pair state with:

- text
- icon
- confidence value
- supporting context

---

# 6. Typography

## 6.1 Primary typeface

Preferred:

**Geist Sans**

Fallback:

```text
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Geist is selected because its developer-oriented design and strong readability fit SignalScope's technical/forensic positioning.

## 6.2 Monospace

Use:

**Geist Mono**

Fallback:

```text
ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
```

Use monospace for:

- analysis IDs
- model versions
- technical metadata
- timestamps
- file metadata
- API/status information
- small technical eyebrows

Do not use monospace for normal paragraphs.

## 6.3 Type scale

| Token | Size | Line height | Weight | Usage |
|---|---:|---:|---:|---|
| `display-xl` | 56px | 1.02 | 600 | Landing hero |
| `display-lg` | 48px | 1.05 | 600 | Major hero |
| `heading-xl` | 36px | 1.10 | 600 | Page heading |
| `heading-lg` | 28px | 1.20 | 600 | Result heading |
| `heading-md` | 22px | 1.30 | 600 | Section heading |
| `heading-sm` | 18px | 1.40 | 600 | Card heading |
| `body-lg` | 16px | 1.50 | 400 | Main body |
| `body-md` | 14px | 1.45 | 400 | UI / body |
| `body-sm` | 13px | 1.40 | 400 | Secondary copy |
| `caption` | 12px | 1.35 | 500 | Metadata |
| `mono-sm` | 12px | 1.35 | 500 | Technical labels |

### Typography rules

- Headings use slight negative tracking.
- Body copy uses normal tracking.
- Never use all-caps for long text.
- Uppercase is acceptable for tiny technical eyebrows.
- Do not use more than 3 font weights on one screen.

Example:

```text
SIGNAL ANALYSIS
Likely AI-generated
Confidence 88%
```

---

# 7. Spacing System

Use a **4px base grid**.

| Token | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |

### Layout rule

Prefer fewer, larger spacing decisions over many arbitrary values.

Example:

```text
Page
 ├─ Header: 24px
 ├─ Hero: 48–96px
 ├─ Upload module: 32px internal
 ├─ Result sections: 48px
 └─ Footer: 64px
```

---

# 8. Layout & Grid

## 8.1 Maximum content width

```text
max-width: 1200px
```

For analysis-heavy screens:

```text
max-width: 1280px
```

## 8.2 Page gutters

Desktop:

```text
32px
```

Tablet:

```text
24px
```

Mobile:

```text
16px
```

## 8.3 Grid

Use:

- 12-column desktop grid
- 8-column tablet grid
- 4-column mobile grid

Do not force every section into a visible grid.

---

# 9. Borders & Radius

SignalScope uses restrained geometry.

| Token | Radius |
|---|---:|
| `radius-sm` | 6px |
| `radius-md` | 8px |
| `radius-lg` | 12px |
| `radius-xl` | 16px |
| `radius-pill` | 999px |

### Rules

- Cards: 12px
- Inputs: 8px
- Buttons: 8px
- Badges: pill only when semantically appropriate
- Upload zone: 12–16px
- Modals: 16px
- Do not make every element a pill.

---

# 10. Elevation & Shadows

The product should feel mostly **flat and precise**.

### Level 0

No shadow.

Use for:

- normal cards
- sections
- upload area

### Level 1

```css
0 1px 2px rgb(0 0 0 / 0.05)
```

Use for:

- dropdowns
- small floating controls

### Level 2

```css
0 8px 30px rgb(0 0 0 / 0.08)
```

Use sparingly for:

- modal
- command/search overlay
- elevated result panel

Avoid large blurred shadows on normal cards.

---

# 11. Navigation

## Desktop

Header should be minimal:

```text
SIGNALSCOPE                       Analyze   History   About   [Theme]
```

If authentication exists:

```text
SIGNALSCOPE                    Analyze  History  [Account]
```

### Header rules

- 56–64px height
- subtle bottom border or transparent-to-solid transition
- no oversized navigation
- active route uses stronger text weight
- keyboard focus must be visible

### Mobile

Use:

```text
SIGNALSCOPE                         Menu
```

Keep navigation simple.

---

# 12. Landing Page

The landing page should immediately explain the product.

### Hero hierarchy

```text
[technical eyebrow]

Telling Real From
Synthetic.

Analyze an image and receive a calibrated
AI-generated probability with visual evidence.

[ Analyze an Image ]

                         [minimal analysis visual]
```

Alternative product-facing copy:

```text
See the signal behind the image.

Upload an image. SignalScope estimates whether
it is real or AI-generated and shows the evidence.
```

### Hero visual

Do not use a generic AI robot/brain illustration.

Use a **forensic analysis composition**:

```text
IMAGE
  ↓
PREPROCESSING
  ↓
DETECTOR
  ↓
CONFIDENCE
  ↓
EVIDENCE
```

The visual can be represented with:

- image crop
- thin measurement lines
- subtle scan line
- confidence value
- heatmap overlay

The visual must remain secondary to the upload CTA.

---

# 13. Upload Experience

The upload experience is the most important interaction.

## Default state

```text
┌─────────────────────────────────────────┐
│                                         │
│             Drop image here             │
│                                         │
│       JPG, PNG, WEBP · up to X MB       │
│                                         │
│            [ Choose Image ]             │
│                                         │
└─────────────────────────────────────────┘
```

### Upload zone

- dashed or subtle solid border
- no oversized icon
- drag target expands visually on hover/drag
- keyboard accessible
- button remains visible
- support click-to-upload

### Drag-over state

Change only:

- border contrast
- surface tone
- small scale/opacity transition

Do not use bouncing animations.

---

# 14. Image Preview

After upload:

```text
┌──────────────────────────────┐
│                              │
│          IMAGE               │
│                              │
└──────────────────────────────┘

filename.jpg
2.4 MB · 2048 × 1365

[ Analyze Image ]   [ Replace ]
```

### Preview rules

- preserve aspect ratio
- use `object-fit: contain`
- do not crop the user's evidence by default
- show filename and basic metadata
- provide a clear remove/replace action

---

# 15. Analysis State

The analysis state must make waiting feel intentional.

Project context defines the sequence:

```text
✓ Image received
✓ Preprocessing
● Running detector
○ Preparing result
```

Use this exact conceptual structure.

### Recommended visual

```text
SIGNAL ANALYSIS

✓ Image received
✓ Preprocessing
● Running detector
○ Preparing result

Analyzing image...
```

### Progress indicator

Prefer:

- determinate progress when backend provides real progress
- staged status when exact progress is unavailable

Never fake a percentage such as `73%` if the backend does not actually provide it.

---

# 16. Loading Motion

### Short operation

Use a subtle spinner or pulsing status indicator.

### Longer operation

Use a staged progress timeline.

### Motion principle

**The animation communicates system state; it does not decorate waiting time.**

Recommended:

```text
opacity: 0.5 → 1
duration: 180–250ms
```

Use a restrained scanning line only in the image analysis region.

Avoid:

- infinite flashy loaders
- bouncing cards
- rapidly changing numbers
- fake terminal logs
- fake progress

---

# 17. Result Experience

The result is the highest-priority screen.

Recommended hierarchy:

```text
ANALYSIS COMPLETE

LIKELY AI-GENERATED
Confidence 88%

[Image]

Why SignalScope thinks this
─────────────────────────────
Evidence explanation

[ View Heatmap ]

Technical details
Model · threshold · processing time
```

### Result card

Use a strong border rather than a heavy shadow.

The verdict should have:

- large text
- confidence value
- short supporting copy
- image preview
- optional evidence CTA

---

# 18. Confidence Visualization

Use a restrained horizontal confidence meter.

Example:

```text
Confidence

88%
━━━━━━━━━━━━━━━━━━░░
```

### Rules

- Do not imply probability is certainty.
- Always label it `Confidence`.
- Show exact value only when it is available.
- Do not invent calibration values.
- Use animation only when the result first appears.

### Reveal

```text
0% → actual confidence
```

Use a 500–700ms ease-out animation.

Respect `prefers-reduced-motion`.

---

# 19. Explanation & Evidence

If explainability is enabled, use the project architecture:

```text
Prediction
    ↓
Grad-CAM / Attribution
    ↓
Important Regions
    ↓
Artifact Evidence
    ↓
Grounded Explanation
```

The frontend must not invent explanations.

### Evidence UI

```text
Why this result?

SignalScope detected patterns associated with
synthetic imagery in highlighted regions.

[ Show evidence ]

[ View heatmap ]
```

Only display evidence returned by the backend/model.

### Heatmap

Use:

- original image as the base
- localized overlay
- adjustable opacity
- optional legend
- clear label such as `Model attention / attribution`

Do not present heatmap intensity as proof.

---

# 20. Result States

## Likely AI-generated

```text
LIKELY AI-GENERATED
Confidence 88%
```

## Likely real

```text
LIKELY REAL
Confidence 91%
```

## Low-confidence / ambiguous

If supported:

```text
INCONCLUSIVE
Confidence 52%

The model does not have strong evidence for either class.
```

Do not force an overconfident binary interpretation when the product/model does not support it.

---

# 21. Error Handling

Errors should be concise and actionable.

### Invalid file

```text
Image format not supported.

Please upload a JPG, PNG, or WEBP image.

[ Choose another image ]
```

### File too large

```text
This image is too large to analyze.

Choose a smaller image and try again.
```

### Analysis failure

```text
We couldn't complete the analysis.

Your image was not given a result.

[ Try again ]
```

### Backend unavailable

```text
SignalScope is temporarily unavailable.

Please try again in a moment.
```

Never expose:

- stack traces
- raw API errors
- internal model paths
- server implementation details

---

# 22. Buttons

## Primary

Dark/ink background with high-contrast text.

```text
[ Analyze Image ]
```

Height:

```text
40–44px
```

Radius:

```text
8px
```

Hover:

- slightly lighter/darker surface
- translateY: `-1px` maximum
- 120–180ms

## Secondary

Bordered surface.

```text
[ Replace Image ]
```

## Tertiary

Text action.

```text
View Evidence →
```

Do not use more than one visually dominant primary CTA per section.

---

# 23. Inputs

Inputs should be quiet and functional.

```text
┌────────────────────────────────┐
│ Search history...              │
└────────────────────────────────┘
```

Rules:

- 8px radius
- 1px border
- visible focus ring
- clear labels
- placeholder is not the label
- errors appear below the field

---

# 24. Cards

Cards are used for grouping information, not decoration.

### Standard card

```text
background: surface
border: 1px solid border
radius: 12px
padding: 24px
```

### Avoid card nesting

Bad:

```text
Card
 └─ Card
     └─ Card
```

Prefer:

```text
Page section
 ├─ Heading
 ├─ Content
 └─ Supporting metadata
```

Use cards only when a visual boundary improves comprehension.

---

# 25. History Page

If history is enabled, use a technical table/list rather than large cards.

```text
ANALYSIS HISTORY

Image        Verdict             Confidence      Date
────────────────────────────────────────────────────────
photo.jpg    Likely real         91%             Sep 12
scene.webp   Likely AI-generated 88%             Sep 12
```

Mobile should transform rows into stacked list items.

Use monospace for:

- analysis ID
- model version
- timestamps

---

# 26. Status & Badges

Badges are compact metadata, not decorative pills.

Examples:

```text
ANALYSIS COMPLETE
MODEL V1
JPEG
2.4 MB
```

Use uppercase only for short labels.

---

# 27. Iconography

Preferred:

- Lucide icons
- simple geometric icons
- 16px or 18px for UI
- 20–24px for major actions

Rules:

- icons should support text
- do not use icon-only buttons without accessible labels
- avoid mixed icon styles
- use stroke-based icons consistently

---

# 28. Image Analysis Visual Language

SignalScope should have a recognizable visual vocabulary.

### Approved motifs

- thin measurement lines
- image bounding frames
- subtle grid
- scan line
- small coordinates
- technical labels
- confidence meters
- heatmap overlays
- mono metadata
- thin dividers

### Avoid

- fake radar graphics
- random circuit boards
- generic neural-network backgrounds
- animated AI brains
- unnecessary particle systems
- glowing neon effects

---

# 29. Motion System

Motion is intentionally subtle.

## 29.1 Motion principles

1. Motion must explain a state change.
2. Motion must not delay interaction.
3. Motion should be short.
4. Motion should be reversible.
5. Respect `prefers-reduced-motion`.
6. Avoid continuous decorative motion.

---

# 30. Motion Tokens

| Token | Duration | Use |
|---|---:|---|
| `motion-fast` | 120ms | hover, color |
| `motion-ui` | 180ms | buttons, controls |
| `motion-standard` | 240ms | panels, cards |
| `motion-result` | 500ms | result reveal |
| `motion-analysis` | 700ms | confidence reveal |
| `motion-slow` | 900ms | rare hero transitions |

Recommended easing:

```css
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
```

---

# 31. Approved Micro-Animations

The animation direction is informed by interaction patterns commonly showcased on Awwwards: hover feedback, scroll reveals, button interactions, transitions, and responsive mobile interactions.

## 31.1 Button hover

```text
Default
   ↓
translateY(-1px)
   +
surface transition
```

Duration: `120–180ms`.

Keep it almost imperceptible.

## 31.2 Upload drag-over

```text
border contrast ↑
surface tone ↑
scale 1.00 → 1.005
```

No bounce.

## 31.3 Page entrance

Use a subtle:

```text
opacity: 0 → 1
transform: translateY(8px) → 0
```

Duration: `240–400ms`.

Apply only to major content groups.

## 31.4 Result reveal

Sequence:

```text
Result container
      ↓
Verdict
      ↓
Confidence
      ↓
Evidence CTA
```

Stagger:

```text
60–90ms
```

Do not stagger every text line.

## 31.5 Confidence meter

Animate from zero to the actual model confidence.

Duration:

```text
500–700ms
```

Only after the real result is received.

## 31.6 Heatmap reveal

Use:

```text
opacity 0 → 1
```

with a subtle mask/clip reveal.

Do not make the heatmap pulse continuously.

## 31.7 Image hover

Desktop only:

```text
scale: 1 → 1.01
```

Duration:

```text
180–240ms
```

No aggressive zoom.

## 31.8 Navigation transition

Use a small opacity/position transition when changing route.

Do not use full-screen cinematic page transitions for the analysis workflow.

---

# 32. Scroll Animations

Scroll animation should be used mainly on:

- landing-page feature sections
- explanatory content
- evidence education sections

Recommended:

```text
opacity: 0 → 1
translateY: 16px → 0
```

Trigger once when the element enters the viewport.

Avoid:

- parallax everywhere
- scroll-jacking
- 3D transformations
- animations that make text difficult to read

The core upload → analysis → result flow should remain fast and stable.

---

# 33. Accessibility & Reduced Motion

All interactive elements must support keyboard navigation.

Requirements:

- visible focus state
- semantic HTML
- accessible labels
- keyboard-accessible upload
- drag/drop must have a click alternative
- sufficient contrast
- status changes announced where appropriate
- no information conveyed by color alone

### Reduced motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or minimize:

- entrance transforms
- confidence animations
- hover transforms
- scroll reveals
- decorative motion

Keep state changes understandable without animation.

---

# 34. Responsive Behavior

## Mobile

Priority:

```text
Verdict
↓
Confidence
↓
Image
↓
Evidence
↓
Technical details
```

Rules:

- one-column layout
- 16px page gutters
- minimum 44px touch targets
- no hover-dependent information
- avoid horizontal overflow
- analysis status remains visible
- heatmap controls become stacked

## Tablet

Use:

- 24px gutters
- two-column layouts where useful
- compact navigation

## Desktop

Use:

- 32px gutters
- 1200–1280px content width
- split image/result layouts when space allows

---

# 35. Responsive Result Layout

Desktop:

```text
┌──────────────────────┬─────────────────────────┐
│                      │ LIKELY AI-GENERATED    │
│       IMAGE          │ Confidence 88%         │
│                      │                         │
│                      │ Evidence                │
│                      │ Technical details       │
└──────────────────────┴─────────────────────────┘
```

Mobile:

```text
LIKELY AI-GENERATED
Confidence 88%

[ IMAGE ]

Why this result?

[ View Evidence ]

Technical details
```

---

# 36. Component Architecture

Follow the existing project structure:

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── analyze/
│   │   └── page.tsx
│   ├── history/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── upload/
│   ├── analysis/
│   ├── result/
│   ├── explanation/
│   ├── heatmap/
│   └── ui/
│
└── lib/
    ├── api.ts
    ├── types.ts
    └── utils.ts
```

This structure is defined in the SignalScope project context.

---

# 37. Component Rules

## Upload

Responsibilities:

- file selection
- drag/drop
- validation
- preview
- replacement
- accessible errors

## Analysis

Responsibilities:

- request lifecycle
- loading state
- analysis progress/stages
- retry

## Result

Responsibilities:

- verdict
- confidence
- image
- result metadata

## Explanation

Responsibilities:

- grounded evidence
- human-readable explanation
- uncertainty language

## Heatmap

Responsibilities:

- overlay
- opacity control
- localized evidence visualization

## UI

Responsibilities:

- buttons
- inputs
- dialogs
- badges
- tooltips
- typography primitives

---

# 38. Design Tokens in Tailwind

All UI should consume semantic tokens.

Preferred:

```tsx
className="bg-background text-foreground border-border"
```

Avoid:

```tsx
className="bg-[#171717] text-[#fafafa]"
```

Avoid arbitrary colors unless adding or updating a token.

Recommended token categories:

```text
background
surface
surface-subtle
surface-hover
foreground
foreground-secondary
foreground-muted
border
border-strong
focus
success
warning
error
info
```

---

# 39. shadcn/ui Usage

Use shadcn/ui where it provides useful primitives:

- Button
- Dialog
- Alert
- Tooltip
- Dropdown
- Badge
- Progress
- Skeleton

Customize them to match SignalScope tokens.

Do not import components simply because they exist.

SignalScope should feel like one product, not a default shadcn demo.

---

# 40. Skeleton Loading

For content-heavy areas, use skeletons rather than replacing the whole screen.

Example:

```text
┌─────────────────────────────┐
│ ███████████████             │
│ ███████                     │
│                             │
│ ███████████████████         │
└─────────────────────────────┘
```

Rules:

- subtle neutral surface
- no rainbow shimmer
- short animation
- respect reduced motion

---

# 41. Empty States

History empty state:

```text
NO ANALYSES YET

Your analyzed images will appear here.

[ Analyze an Image ]
```

Avoid illustrations unless they communicate useful context.

---

# 42. Trust & Responsible UX

SignalScope is an AI authenticity detector.

Therefore the UI must explicitly avoid overclaiming.

### Required language

```text
Likely AI-generated
Likely real
Confidence
Model assessment
Visual evidence
```

### Avoid

```text
Definitely fake
Proven fake
Guaranteed real
100% authentic
```

### Evidence disclaimer

Where appropriate:

> SignalScope provides a probabilistic model assessment. Results may be affected by image quality, compression, editing, and generators not represented in training data.

This aligns with the project's requirement that the result be treated as a probabilistic assessment rather than an accusation.

---

# 43. Performance Rules

Animations must not compromise analysis usability.

Prefer:

- CSS transforms
- opacity
- compositor-friendly animations
- lazy-loaded heavy visuals
- optimized image previews
- minimal JavaScript animation
- no unnecessary animation libraries

Avoid:

- animating layout properties such as width/height when transform can be used
- large continuous canvas animations
- excessive blur
- heavy 3D scenes

If an animation is not noticeable on a normal laptop, it is probably better than one that steals attention.

---

# 44. Do / Don't

## Do

- use strong typography
- use 1px borders
- use whitespace
- use monochrome surfaces
- use restrained motion
- show system state clearly
- show confidence honestly
- make evidence inspectable
- use consistent spacing
- make the interface keyboard accessible

## Don't

- use neon gradients as the main identity
- use excessive rounded cards
- use giant shadows
- use fake progress
- use fake evidence
- animate everything
- rely on hover for essential actions
- call uncertain predictions "definite"
- expose internal errors
- introduce arbitrary colors

---

# 45. Reference-to-SignalScope Mapping

| Reference | Borrow | Do Not Copy |
|---|---|---|
| Vercel / Geist | monochrome precision, typography, grid discipline, restrained controls | Vercel branding, exact layouts |
| Linear | visual restraint, dense product UI, subtle hierarchy, technical feel | Linear accent/brand identity |
| Supabase | semantic tokens, developer UX, structured surfaces, dashboard patterns | Supabase green as primary SignalScope identity |
| Awwwards | hover feedback, reveal transitions, loading continuity, micro-interactions | heavy experimental motion that harms usability |
| getdesign.md | tokenized DESIGN.md methodology | treating third-party analyses as official brand guidelines |

---

# 46. Reference Sources

These are research references used to define this system.

### getdesign.md

- https://getdesign.md/
- https://getdesign.md/design-md
- https://getdesign.md/vercel/design-md
- https://getdesign.md/linear.app/design-md
- https://getdesign.md/supabase/design-md

### Vercel / Geist

- https://vercel.com/geist/introduction
- https://vercel.com/geist/typography
- https://examples.vercel.com/geist/colors
- https://vercel.com/font

### Linear

- https://linear.app/brand

### Supabase

- https://supabase.com/design-system
- https://supabase.com/design-system/docs/color-usage

### Awwwards interaction references

- https://www.awwwards.com/inspiration/interactive-homepage-range-rak
- https://www.awwwards.com/inspiration/hover-animation-4
- https://www.awwwards.com/inspiration/button-animation-form-studio
- https://www.awwwards.com/inspiration/mobile-scroll-and-interactions-noomo-labs
- https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf

These references are inspiration and research inputs, not copied implementations.

---

# 47. Implementation Checklist

## Foundation

- [ ] Configure semantic color tokens.
- [ ] Configure Geist Sans / fallback stack.
- [ ] Configure Geist Mono.
- [ ] Configure 4px spacing system.
- [ ] Configure radius scale.
- [ ] Configure elevation tokens.
- [ ] Configure motion tokens.
- [ ] Configure light/dark themes.

## Components

- [ ] Header
- [ ] Button
- [ ] Upload dropzone
- [ ] Image preview
- [ ] Progress/status timeline
- [ ] Result card
- [ ] Confidence meter
- [ ] Evidence section
- [ ] Heatmap viewer
- [ ] Error alert
- [ ] Technical metadata
- [ ] History list/table

## UX

- [ ] Keyboard-accessible upload
- [ ] Drag/drop feedback
- [ ] File validation
- [ ] Loading state
- [ ] Error state
- [ ] Result state
- [ ] Confidence animation
- [ ] Evidence reveal
- [ ] Responsive layouts
- [ ] Reduced-motion support

---

# 48. Definition of Done for BUG-005

BUG-005 is considered complete when:

- [ ] A clear monochrome design direction is documented.
- [ ] Vercel/Geist influence is reflected in typography, spacing, borders, and precision.
- [ ] Linear influence is reflected in restraint and technical product hierarchy.
- [ ] Supabase influence is reflected in semantic surface/token organization and developer-oriented UX.
- [ ] Awwwards-inspired motion patterns are defined without sacrificing usability.
- [ ] Colors are tokenized.
- [ ] Typography is tokenized.
- [ ] Spacing is tokenized.
- [ ] Radius is tokenized.
- [ ] Shadows/elevation are defined.
- [ ] Components have implementation rules.
- [ ] Upload, analysis, result, explanation, and heatmap states are specified.
- [ ] Responsive behavior is specified.
- [ ] Accessibility and reduced motion are specified.
- [ ] Responsible AI language is specified.
- [ ] The document can be given directly to an AI coding assistant.

---

# 50. AI Coding Assistant Rule

Before creating or modifying frontend UI:

1. Read this `DESIGN.md`.
2. Reuse existing components before creating new ones.
3. Use semantic design tokens.
4. Do not introduce arbitrary colors.
5. Do not introduce a second typography system.
6. Do not introduce a new radius scale.
7. Do not add animation unless it serves a clear interaction purpose.
8. Respect `prefers-reduced-motion`.
9. Preserve the SignalScope responsible-UX language.
10. Do not invent model confidence, evidence, or analysis progress.
11. Keep frontend/backend/ML concerns separated.
12. Follow the React file-upload integration and project-setup rules in Section 50.
13. Verify the existing project setup before installing or reconfiguring dependencies.
14. Place the reusable file-upload component in the configured UI component path, normally `/components/ui`.
15. Keep `FileUploadDemo` separate from backend/API logic.
16. Use Aceternity text animations only according to Section 51.
17. Do not introduce decorative text animation into the analysis/result workflow.
18. If a design decision conflicts with this file, update this file first and document the reason.

---

# 50. React File Upload Integration & Project Setup

This section adds the required implementation guidance for integrating the SignalScope React file-upload component into the frontend.

## 50.1 Required project setup

The frontend must use:

- React
- TypeScript
- Tailwind CSS v4.0
- shadcn/ui project structure

Before implementing the file-upload component, verify that these technologies are present in the project.

If any are missing, the AI coding assistant should:

1. Inspect the existing project before changing it.
2. Prefer the shadcn CLI for shadcn/ui setup and component configuration.
3. Provide step-by-step setup instructions for any missing requirement.
4. Avoid replacing an existing working setup unnecessarily.

The implementation should preserve the existing SignalScope architecture and the folder structure defined in this document.

## 50.2 Determine the component and style paths

Before creating files, inspect the project configuration and determine:

- The configured components path.
- The configured UI components path.
- The location of global styles.
- The Tailwind CSS v4 configuration/import location.
- The TypeScript path aliases.

For a standard SignalScope setup, the expected structure is:

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── analyze/
│   │   └── page.tsx
│   ├── history/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── upload/
│   ├── analysis/
│   ├── result/
│   ├── explanation/
│   ├── heatmap/
│   ├── FileUploadDemo.tsx
│   └── ui/
│       └── file-upload.tsx
│
└── lib/
    ├── api.ts
    ├── types.ts
    └── utils.ts
```

If the project's configured component path is different, the assistant must use the existing project convention rather than blindly creating duplicate structures.

## 50.3 `/components/ui` requirement

The reusable file-upload component should live in:

```text
/components/ui/file-upload.tsx
```

The demo/integration component should live in:

```text
/components/FileUploadDemo.tsx
```

If `/components/ui` does not exist, explain that it is the conventional shadcn/ui location for reusable low-level UI primitives and create/configure it consistently with the project's shadcn configuration.

Do not create a second competing component directory without a clear reason.

## 50.4 Required dependencies

The file-upload implementation may require:

```text
motion
@tabler/icons-react
react-dropzone
```

Install them with:

```bash
npm install motion @tabler/icons-react react-dropzone
```

If the project uses another package manager, use its equivalent command instead of mixing package managers.

The assistant must verify whether these dependencies are already installed before adding them.

## 50.5 File-upload component responsibilities

The reusable file-upload component must support the SignalScope upload requirements:

- Click-to-upload.
- Drag-and-drop.
- Keyboard-accessible upload.
- File validation.
- Clear error states.
- Image preview.
- File replacement/removal.
- Drag-over visual feedback.
- Accessible labels and status communication.
- Responsive behavior.
- Light/dark theme compatibility.

The component should remain reusable and should not contain backend/ML-specific logic.

The upload component should emit or expose the selected file to the parent flow. The parent or API layer is responsible for sending the file to the backend.

## 50.6 How drag-and-drop works

Use `react-dropzone` to manage drag-and-drop and file selection.

Conceptually:

```text
User drags image
        ↓
Dropzone detects drag-over
        ↓
Upload area changes subtly
        ↓
User drops image
        ↓
File is validated
        ↓
Valid file → preview
Invalid file → accessible error
        ↓
User selects "Analyze Image"
        ↓
Parent analysis flow sends file to API
```

The visual drag-over state must follow the SignalScope motion rules:

```text
Border contrast ↑
Surface tone ↑
Scale 1.00 → 1.005
```

Do not add bouncing, flashing, or decorative animations.

## 50.7 FileUploadDemo usage

The demo component should demonstrate the reusable upload component without coupling it to the backend.

Expected relationship:

```text
/components/ui/file-upload.tsx
        ↓
Reusable upload primitive
        ↓
/components/FileUploadDemo.tsx
        ↓
Page-level usage
```

A page may import the demo component using the project's configured alias, for example:

```tsx
import { FileUploadDemo } from "@/components/FileUploadDemo";
```

Then render:

```tsx
<FileUploadDemo />
```

The exact import alias must follow the project's TypeScript configuration.

For the actual SignalScope analysis flow, prefer connecting the reusable upload component to the `/analyze` page rather than making the demo component responsible for API communication.

## 50.8 Tailwind CSS v4 compatibility

The implementation must be compatible with Tailwind CSS v4.0.

Before adding Tailwind configuration, inspect the existing v4 setup and follow its current conventions.

Do not introduce an unnecessary second Tailwind configuration system.

SignalScope semantic design tokens must remain the source of truth:

```text
background
surface
surface-subtle
surface-hover
foreground
foreground-secondary
foreground-muted
border
border-strong
focus
success
warning
error
info
```

Avoid hard-coded colors inside the file-upload component.

The component must work in both light and dark themes using the semantic tokens defined by SignalScope.

## 50.9 Light/dark mode

The upload component must visually adapt to both themes.

Light mode should use the existing light tokens.

Dark mode should use the existing dark tokens.

Do not create separate upload-specific colors unless a new semantic token is genuinely required.

Drag-over, focus, error, and success states must remain understandable in both themes and must not rely on color alone.

## 50.10 shadcn/ui integration rule

The file-upload component should fit naturally into the shadcn/ui architecture.

Use shadcn/ui primitives where useful, but do not force unrelated shadcn components into the upload experience.

The final component must look like SignalScope rather than an untouched shadcn demo.

## 50.11 Setup instructions for an AI coding assistant

When starting from a new or incomplete frontend, the assistant should follow this order:

```text
1. Inspect package.json
        ↓
2. Inspect Next.js / React / TypeScript setup
        ↓
3. Inspect Tailwind CSS version and globals.css
        ↓
4. Inspect shadcn configuration and component paths
        ↓
5. Configure missing requirements
        ↓
6. Verify /components and /components/ui paths
        ↓
7. Install missing dependencies
        ↓
8. Create file-upload component
        ↓
9. Create FileUploadDemo
        ↓
10. Integrate into the Analyze page
        ↓
11. Verify light/dark mode
        ↓
12. Verify keyboard and drag/drop accessibility
        ↓
13. Run the application and fix errors
```

The assistant must not assume the project is configured correctly without inspecting it first.

## 50.12 Separation of concerns

Keep responsibilities separated:

```text
file-upload.tsx
    → file selection and UI

FileUploadDemo.tsx
    → demonstration/integration state

analyze/page.tsx
    → analysis workflow

lib/api.ts
    → backend communication

lib/types.ts
    → TypeScript contracts

backend / ML
    → actual prediction and evidence
```

The upload component must never invent:

- model confidence
- analysis progress
- evidence
- heatmap results
- AI verdicts

Those values must come from the actual analysis system.

## 50.13 File-upload integration acceptance criteria

The file-upload integration is complete when:

- [ ] React, TypeScript, Tailwind CSS v4.0, and shadcn/ui are verified.
- [ ] Existing component and style paths are identified.
- [ ] `/components/ui` is correctly configured or intentionally mapped to the project's existing component path.
- [ ] `/components/ui/file-upload.tsx` exists.
- [ ] `/components/FileUploadDemo.tsx` exists.
- [ ] Required dependencies are installed only when missing.
- [ ] Click-to-upload works.
- [ ] Drag-and-drop works.
- [ ] Keyboard upload works.
- [ ] Invalid files produce clear errors.
- [ ] Image preview works.
- [ ] Replace/remove behavior works.
- [ ] Drag-over feedback follows SignalScope motion rules.
- [ ] Light mode works.
- [ ] Dark mode works.
- [ ] Tailwind CSS v4 conventions are respected.
- [ ] The component uses semantic SignalScope tokens.
- [ ] No backend or ML logic is embedded in the upload UI.
- [ ] `FileUploadDemo` can be imported and rendered from a page.
- [ ] The application runs without TypeScript, build, or runtime errors.

---

# 51. Aceternity Text Animation Integration

SignalScope may use selected Aceternity UI text-animation patterns to enhance the landing-page hero while preserving the product's forensic, monochrome, and restrained visual identity.

Reference:
- https://ui.aceternity.com/blocks/text-animations

## 51.1 Preferred animation

Preferred pattern:

```text
Blur Fade In / subtle word reveal
```

Use the animation primarily for the landing-page hero heading.

Example:

```text
Telling Real From
Synthetic.
```

The words should appear with a subtle blur-to-clear and opacity reveal rather than a dramatic or flashy effect.

## 51.2 Approved usage

The animation may be used for:

- Landing-page hero heading.
- Optional landing-page supporting text.
- Short introductory statements where the animation improves visual hierarchy.

Do not animate every text element.

Do not use the animation for:

- Analysis status messages.
- Verdicts.
- Confidence values.
- Evidence explanations.
- Technical metadata.
- Error messages.
- Accessibility-critical instructions.

Important analysis information must remain immediately readable and must not depend on animation.

## 51.3 Visual requirements

The Aceternity animation must be adapted to SignalScope's existing design system.

It must remain:

- Monochrome.
- Precise.
- Technical.
- Editorial.
- Calm.
- Minimal.

Do not introduce:

- Neon colors.
- Colorful text effects.
- Glowing text.
- Large text distortion.
- Excessive blur.
- Continuous looping.
- Aggressive typewriter effects.
- Decorative animation that competes with the upload CTA.

## 51.4 Motion requirements

The animation must follow the existing SignalScope motion principles:

- Motion should explain a state or entrance.
- Motion must not delay interaction.
- Motion should be short.
- Motion should be reversible where practical.
- Respect `prefers-reduced-motion`.
- Avoid continuous decorative motion.

For the hero text, use a short entrance/reveal animation and allow the animation to finish naturally.

Do not make the user wait for the animation before the "Analyze an Image" action becomes usable.

## 51.5 Implementation

Use the project's existing animation dependency when possible.

If the selected Aceternity implementation requires Motion and Motion is not already installed, use:

```bash
npm install motion
```

If an Aceternity component requires another dependency, verify whether it is already installed before adding it.

The implementation must be compatible with:

- React.
- TypeScript.
- Tailwind CSS v4.0.
- shadcn/ui.
- SignalScope semantic design tokens.

Do not introduce a second animation system solely for text animation.

## 51.6 Accessibility

The animation must respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- Remove or minimize blur transitions.
- Remove unnecessary transforms.
- Show the complete text immediately or with a minimal opacity transition.
- Keep all text readable without animation.

The animation must never hide or delay essential information.

## 51.7 AI coding assistant rule

Before adding an Aceternity text animation:

1. Read this `DESIGN.md`.
2. Check whether Motion is already installed.
3. Reuse the existing SignalScope animation/token system.
4. Adapt the Aceternity example instead of copying unrelated styling.
5. Keep the animation limited to approved areas.
6. Preserve SignalScope's monochrome visual identity.
7. Test light mode and dark mode.
8. Test mobile responsiveness.
9. Test `prefers-reduced-motion`.
10. Ensure the upload CTA remains immediately usable.

Aceternity UI is an implementation reference, not a replacement for the SignalScope design system.

---

# 52. Final Design Direction

SignalScope should feel like a **forensic instrument disguised as a simple web application**.

The visual equation is:

```text
Vercel precision
      +
Linear restraint
      +
Supabase product clarity
      +
Awwwards interaction discipline
      +
SignalScope forensic purpose
      =
Monochrome AI image-analysis interface
```

The final experience should be:

> **quiet, precise, trustworthy, fast, and evidence-driven.**

The design should make sophisticated AI analysis feel understandable without making the underlying uncertainty disappear.
