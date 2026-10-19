# remotion-demo: Python Variables & Data Types Lesson

A 60-second educational video project created with [Remotion](https://www.remotion.dev/) and React, introducing Python variables and data types to beginners with bilingual English headings and Burmese explanations.

## 🎬 Features

- **60-Second 16:9 Video (1920x1080 @ 30 FPS)**
- **7 Animated Slides**:
  1. Intro (animated logo and glowing backdrop)
  2. Variables Concept (`name`, `age`, `is_student`)
  3. Strings (`print()`, `len()`)
  4. Numbers (`int` and `float` calculations)
  5. Booleans (`True`, `False`, comparisons)
  6. Lists (indexing, `.append()`)
  7. Outro (checklist & recap)
- **Syntax Highlighting & Step-by-Step Typing Animations**
- **Bilingual Content**: English headings paired with clear Burmese descriptions.
- **Modern Dark Aesthetic**: Custom particle background, glowing window chrome, progress bar, and fluid physics spring transitions.
- **Easily Configurable**: All timings, content, typography, and palette centralized in `src/config.ts`.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run dev
```

Opens Remotion Studio at `http://localhost:3000`.

### Render Video (MP4)

```bash
npm run build
```

The exported MP4 video will be saved to `out/python-lesson.mp4`.

### Render Still Image (Thumbnail)

```bash
npm run render:still
```

## 🛠 Customization

Open `src/config.ts` to tweak:
- `VIDEO_CONFIG`: Frame rate, resolution, duration.
- `COLORS`: Theme colors, accents, and syntax highlighting tokens.
- `LESSON_SLIDES`: Text, code snippets, outputs, and Burmese translations.
- `SLIDE_TIMINGS`: Frame ranges for each scene.

---

Built with ❤️ using Remotion and React.
