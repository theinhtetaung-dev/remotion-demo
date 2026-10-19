

## 💡 What is Remotion?

**[Remotion](https://www.remotion.dev/)** is an open-source framework that lets developers **create videos programmatically using React, HTML, CSS, and TypeScript/JavaScript**. 

Instead of manually editing clips, keyframes, and titles in traditional GUI-based software (like Adobe Premiere Pro, Final Cut, or After Effects), Remotion treats video production as web development:

### ⚙️ How Remotion Works

1. **Every Frame is a React Component**: Your video is built with standard React components, flexbox, CSS grids, SVGs, canvas, and typography.
2. **Deterministic Frame-by-Frame Rendering**: 
   - Remotion steps through time frame-by-frame (`0, 1, 2, ... N`) at your configured frame rate (e.g. 30 FPS).
   - In each frame, Remotion renders the DOM snapshot using a headless Chromium browser.
   - Because frames are rendered deterministically, there are **no dropped frames, stutter, or desyncs** in the final output.
3. **Math & Physics Instead of Keyframing**:
   - Rather than dragging keyframes on a timeline, animations are computed mathematically based on the current frame number using utilities like `interpolate()` and `spring()`.
4. **Programmatic & Scalable**:
   - Videos can accept dynamic props, query APIs, connect to databases, and render on-demand via the CLI, Node.js scripts, or serverless infrastructure ([Remotion Lambda](https://www.remotion.dev/docs/lambda)).

### 🧩 Core Remotion Concepts Used in This Project

| Concept | Purpose & Usage in This Project |
| :--- | :--- |
| **`<Composition />`** | Declares a renderable video entity with specified resolution (1920x1080), framerate (30 FPS), and duration (1800 frames / 60 seconds). Defined in [`src/Root.tsx`](src/Root.tsx). |
| **`<AbsoluteFill />`** | A built-in layout container that automatically pins elements to 100% width and height of the canvas, preventing sizing discrepancies. |
| **`<Sequence />`** | Manages scene timing by mounting and unmounting slides at specific frame offsets (`from` and `durationInFrames`). |
| **`useCurrentFrame()`** | React hook returning the active frame number. Drives typing animations, cursor blinking, and slide progress. |
| **`useVideoConfig()`** | React hook providing video metadata (`fps`, `durationInFrames`, `width`, `height`) for dynamic calculations. |
| **`spring()` & `interpolate()`** | Creates smooth, physics-based slide entrances and numerical value transitions without CSS transition quirks. |
| **Remotion Studio** | An interactive browser preview tool (`npm run dev`) featuring timeline scrubbing, audio playback, and instant hot-reloading. |

### 🚀 Why Use Remotion?

- 📦 **Reusability & Modularity**: Build a component once (e.g. `<CodeSlide />`, `<SyntaxHighlighter />`) and reuse it across multiple scenes or videos.
- 🎨 **Familiar Web Tech**: Leverage CSS variables, Google Fonts (`@remotion/google-fonts`), Lucide icons, and modern design systems.
- 🔀 **Git-Friendly & Version Controlled**: Video changes exist as clean git diffs and pull requests instead of opaque binary project files.
- 🤖 **Automation**: Generate personalized, localized, or automated data videos on a CI/CD pipeline or cloud renderer.

---

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
- **Easily Configurable**: All timings, content, typography, and palette centralized in [`src/config.ts`](src/config.ts).

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

Open [`src/config.ts`](src/config.ts) to tweak:
- `VIDEO_CONFIG`: Frame rate, resolution, duration.
- `COLORS`: Theme colors, accents, and syntax highlighting tokens.
- `LESSON_SLIDES`: Text, code snippets, outputs, and Burmese translations.
- `SLIDE_TIMINGS`: Frame ranges for each scene.

---

Built with ❤️ using Remotion and React.
