// ============================================================
// THEME & CONFIG — Edit these values to customize the video
// ============================================================

export const VIDEO_CONFIG = {
  fps: 30,
  durationInSeconds: 60,
  width: 1920,
  height: 1080,
} as const;

export const COLORS = {
  // Background
  bgPrimary: "#0f0f1a",
  bgSecondary: "#161625",
  bgCard: "#1c1c2e",
  bgCardHover: "#22223a",

  // Accent
  accentPrimary: "#7c5cfc",
  accentSecondary: "#38bdf8",
  accentTertiary: "#f472b6",
  accentSuccess: "#34d399",
  accentWarning: "#fbbf24",

  // Text
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",

  // Syntax Highlighting
  syntaxKeyword: "#c084fc",    // purple
  syntaxString: "#34d399",     // green
  syntaxNumber: "#fbbf24",     // amber
  syntaxComment: "#64748b",    // slate
  syntaxFunction: "#38bdf8",   // sky blue
  syntaxVariable: "#f1f5f9",   // white
  syntaxOperator: "#f472b6",   // pink
  syntaxType: "#fb923c",       // orange
  syntaxBoolean: "#fb923c",    // orange
} as const;

export const FONTS = {
  heading: "'Inter', sans-serif",
  body: "'Inter', sans-serif",
  code: "'JetBrains Mono', 'Fira Code', monospace",
} as const;

// ============================================================
// LESSON CONTENT — Edit to change what the video teaches
// ============================================================

export interface CodeLine {
  text: string;
  indent?: number;
}

export interface LessonSlide {
  id: string;
  headingEn: string;
  headingMm: string;
  descriptionMm?: string;
  codeLines?: CodeLine[];
  outputLines?: string[];
  highlightType?: string;
}

export const LESSON_SLIDES: LessonSlide[] = [
  {
    id: "intro",
    headingEn: "What is Remotion?",
    headingMm: "React ဖြင့် Programmatic Video များ ဖန်တီးခြင်း",
  },
  {
    id: "overview",
    headingEn: "React for Video Creation",
    headingMm: "Remotion သည် React code ဖြင့် video များကို render လုပ်ပေးပါသည်",
    codeLines: [
      { text: "// Define video with React" },
      { text: "import { AbsoluteFill } from 'remotion';" },
      { text: "export const MyVideo = () => {" },
      { text: "  return <AbsoluteFill>Hello Remotion!</AbsoluteFill>;" },
      { text: "};" },
    ],
    outputLines: ["Rendering 1080p Video...", "Frame rate: 30 FPS"],
    highlightType: "react",
  },
  {
    id: "composition",
    headingEn: "<Composition /> Component",
    headingMm: "Video ၏ Resolution, FPS နှင့် ကြာချိန်ကို သတ်မှတ်ပါသည်",
    codeLines: [
      { text: "<Composition" },
      { text: '  id="IntroVideo"' },
      { text: "  component={MyVideo}" },
      { text: "  durationInFrames={1800}" },
      { text: "  fps={30} width={1920} height={1080}" },
      { text: "/>" },
    ],
    outputLines: ["Duration: 60s (1800 frames)", "Resolution: 1920x1080 (16:9)"],
    highlightType: "composition",
  },
  {
    id: "sequence",
    headingEn: "<Sequence /> for Timelines",
    headingMm: "Scene များကို timeline ပေါ်တွင် အချိန်အပိုင်းအခြားဖြင့် စီစဉ်ခြင်း",
    codeLines: [
      { text: "<Sequence from={0} durationInFrames={90}>" },
      { text: '  <TitleSlide title="Welcome" />' },
      { text: "</Sequence>" },
      { text: "<Sequence from={90} durationInFrames={120}>" },
      { text: "  <MainContent />" },
      { text: "</Sequence>" },
    ],
    outputLines: ["Scene 1: 0s - 3s", "Scene 2: 3s - 7s"],
    highlightType: "sequence",
  },
  {
    id: "frame",
    headingEn: "useCurrentFrame() Hook",
    headingMm: "လက်ရှိရောက်ရှိနေသော frame number ကို ရယူပေးပါသည်",
    codeLines: [
      { text: "const frame = useCurrentFrame();" },
      { text: "const { fps } = useVideoConfig();" },
      { text: "const seconds = frame / fps;" },
      { text: "console.log(`Current frame: ${frame}`);" },
    ],
    outputLines: ["Current frame: 75", "Time: 2.50s"],
    highlightType: "hook",
  },
  {
    id: "interpolate",
    headingEn: "interpolate() for Animations",
    headingMm: "Frame အလိုက် smooth animations များကို တွက်ချက်ဖန်တီးခြင်း",
    codeLines: [
      { text: "const opacity = interpolate(" },
      { text: "  frame," },
      { text: "  [0, 30]," },
      { text: "  [0, 1]," },
      { text: "  { extrapolateRight: 'clamp' }" },
      { text: ");" },
    ],
    outputLines: [
      "frame 0  -> opacity: 0.0",
      "frame 15 -> opacity: 0.5",
      "frame 30 -> opacity: 1.0",
    ],
    highlightType: "animation",
  },
  {
    id: "outro",
    headingEn: "Start Building with Remotion!",
    headingMm: "React စွမ်းအားဖြင့် အံ့သြဖွယ် Video များကို ဖန်တီးလိုက်ပါ!",
  },
];

// ============================================================
// TIMING — Frames per slide (at 30fps, total = 1800 frames = 60s)
// ============================================================

export const SLIDE_TIMINGS = {
  intro: { start: 0, duration: 180 },          // 0–6s
  overview: { start: 180, duration: 270 },     // 6–15s
  composition: { start: 450, duration: 270 },  // 15–24s
  sequence: { start: 720, duration: 270 },     // 24–33s
  frame: { start: 990, duration: 270 },        // 33–42s
  interpolate: { start: 1260, duration: 270 }, // 42–51s
  outro: { start: 1530, duration: 270 },       // 51–60s
} as const;
