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
  highlightType?: "variable" | "string" | "number" | "boolean" | "list";
}

export const LESSON_SLIDES: LessonSlide[] = [
  {
    id: "intro",
    headingEn: "Python Variables & Data Types",
    headingMm: "Python မှာ Variables နဲ့ Data Types တွေကို လေ့လာကြမယ်",
  },
  {
    id: "variables",
    headingEn: "What is a Variable?",
    headingMm: "Variable ဆိုတာ data ကို သိမ်းထားဖို့ နာမည်တစ်ခုပါ",
    codeLines: [
      { text: "# Creating variables" },
      { text: 'name = "Aung Aung"' },
      { text: "age = 25" },
      { text: "is_student = True" },
    ],
    outputLines: [],
    highlightType: "variable",
  },
  {
    id: "strings",
    headingEn: "Strings — Text Data",
    headingMm: "String ဆိုတာ စာသား (text) data အမျိုးအစားပါ",
    codeLines: [
      { text: '# String examples' },
      { text: 'greeting = "Hello, Python!"' },
      { text: "print(greeting)" },
      { text: "print(len(greeting))" },
    ],
    outputLines: ["Hello, Python!", "14"],
    highlightType: "string",
  },
  {
    id: "numbers",
    headingEn: "Numbers — int & float",
    headingMm: "ကိန်းပြည့် (int) နဲ့ ဒဿမကိန်း (float) နှစ်မျိုးရှိပါတယ်",
    codeLines: [
      { text: "# Integer and Float" },
      { text: "count = 10" },
      { text: "price = 19.99" },
      { text: "total = count * price" },
      { text: "print(total)" },
    ],
    outputLines: ["199.9"],
    highlightType: "number",
  },
  {
    id: "booleans",
    headingEn: "Booleans — True / False",
    headingMm: "Boolean ဆိုတာ True ဒါမှမဟုတ် False ပဲ ဖြစ်နိုင်ပါတယ်",
    codeLines: [
      { text: "# Boolean values" },
      { text: "is_active = True" },
      { text: "is_empty = False" },
      { text: "print(10 > 5)" },
      { text: "print(3 == 7)" },
    ],
    outputLines: ["True", "False"],
    highlightType: "boolean",
  },
  {
    id: "lists",
    headingEn: "Lists — Ordered Collections",
    headingMm: "List ဆိုတာ data အများကြီးကို စုထားလို့ ရတဲ့ အမျိုးအစားပါ",
    codeLines: [
      { text: "# List example" },
      { text: 'fruits = ["apple", "banana", "cherry"]' },
      { text: "print(fruits[0])" },
      { text: "fruits.append(\"mango\")" },
      { text: "print(len(fruits))" },
    ],
    outputLines: ["apple", "4"],
    highlightType: "list",
  },
  {
    id: "outro",
    headingEn: "Great Job! Keep Practicing!",
    headingMm: "ကောင်းပါပြီ! ဆက်ပြီး လေ့ကျင့်ပါ!",
  },
];

// ============================================================
// TIMING — Frames per slide (at 30fps, total = 1800 frames = 60s)
// ============================================================

export const SLIDE_TIMINGS = {
  intro: { start: 0, duration: 180 },         // 0–6s
  variables: { start: 180, duration: 270 },    // 6–15s
  strings: { start: 450, duration: 270 },      // 15–24s
  numbers: { start: 720, duration: 270 },      // 24–33s
  booleans: { start: 990, duration: 270 },     // 33–42s
  lists: { start: 1260, duration: 270 },       // 42–51s
  outro: { start: 1530, duration: 270 },       // 51–60s
} as const;
