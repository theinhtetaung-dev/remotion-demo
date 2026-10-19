import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONTS, CodeLine } from "../config";

interface SyntaxHighlighterProps {
  lines: CodeLine[];
  startFrame: number;
  framesPerLine: number;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  lines,
  startFrame,
  framesPerLine,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {lines.map((line, index) => {
        const lineFrame = startFrame + index * framesPerLine;
        const relativeFrame = frame - lineFrame;

        // Line visibility
        const lineOpacity = interpolate(
          relativeFrame,
          [-1, 0, 8],
          [0, 0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        // Line slide-in from left
        const lineX = relativeFrame >= 0
          ? interpolate(
              spring({
                frame: Math.max(0, relativeFrame),
                fps,
                config: { damping: 15, stiffness: 120 },
              }),
              [0, 1],
              [20, 0]
            )
          : 20;

        // Typing cursor blink
        const isCurrentLine =
          relativeFrame >= 0 &&
          (index === lines.length - 1 || frame < lineFrame + framesPerLine);
        const cursorOpacity = isCurrentLine
          ? Math.sin(frame * 0.3) > 0
            ? 1
            : 0
          : 0;

        // Highlight glow for current line
        const glowOpacity = isCurrentLine
          ? interpolate(relativeFrame, [0, 15], [0.15, 0.05], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 0;

        const indent = line.indent ?? 0;
        const tokens = tokenize(line.text);

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              opacity: lineOpacity,
              transform: `translateX(${lineX}px)`,
              padding: "6px 12px",
              borderRadius: 8,
              background: `${COLORS.accentPrimary}${Math.round(glowOpacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
              position: "relative",
            }}
          >
            {/* Line number */}
            <span
              style={{
                fontFamily: FONTS.code,
                fontSize: 16,
                color: COLORS.textMuted,
                width: 32,
                textAlign: "right",
                marginRight: 20,
                userSelect: "none",
              }}
            >
              {index + 1}
            </span>

            {/* Indent */}
            {indent > 0 && (
              <span style={{ width: indent * 24 }} />
            )}

            {/* Syntax-highlighted tokens */}
            <span
              style={{
                fontFamily: FONTS.code,
                fontSize: 22,
                lineHeight: 1.6,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {tokens.map((token, ti) => (
                <span
                  key={ti}
                  style={{
                    color: token.color,
                    whiteSpace: "pre",
                  }}
                >
                  {token.text}
                </span>
              ))}
            </span>

            {/* Blinking cursor */}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 24,
                backgroundColor: COLORS.accentPrimary,
                marginLeft: 2,
                opacity: cursorOpacity,
                borderRadius: 1,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// Simple Python tokenizer for syntax highlighting
// ============================================================

interface Token {
  text: string;
  color: string;
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    "def",
    "class",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "return",
    "import",
    "from",
    "as",
    "in",
    "not",
    "and",
    "or",
    "is",
    "with",
    "try",
    "except",
    "finally",
    "raise",
    "pass",
    "break",
    "continue",
    "lambda",
    "yield",
    "global",
    "nonlocal",
    "assert",
    "del",
  ];
  const builtins = ["print", "len", "range", "type", "int", "float", "str", "list", "dict", "set", "bool", "input", "append"];
  const booleans = ["True", "False", "None"];

  // Comment line
  if (line.trimStart().startsWith("#")) {
    return [{ text: line, color: COLORS.syntaxComment }];
  }

  let i = 0;
  while (i < line.length) {
    // Whitespace
    if (line[i] === " " || line[i] === "\t") {
      let ws = "";
      while (i < line.length && (line[i] === " " || line[i] === "\t")) {
        ws += line[i];
        i++;
      }
      tokens.push({ text: ws, color: COLORS.syntaxVariable });
      continue;
    }

    // String (double or single quoted)
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let str = quote;
      i++;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\") {
          str += line[i];
          i++;
        }
        if (i < line.length) {
          str += line[i];
          i++;
        }
      }
      if (i < line.length) {
        str += line[i];
        i++;
      }
      tokens.push({ text: str, color: COLORS.syntaxString });
      continue;
    }

    // Number
    if (/[0-9]/.test(line[i])) {
      let num = "";
      while (i < line.length && /[0-9.]/.test(line[i])) {
        num += line[i];
        i++;
      }
      tokens.push({ text: num, color: COLORS.syntaxNumber });
      continue;
    }

    // Identifier / keyword
    if (/[a-zA-Z_]/.test(line[i])) {
      let ident = "";
      while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
        ident += line[i];
        i++;
      }

      if (keywords.includes(ident)) {
        tokens.push({ text: ident, color: COLORS.syntaxKeyword });
      } else if (booleans.includes(ident)) {
        tokens.push({ text: ident, color: COLORS.syntaxBoolean });
      } else if (builtins.includes(ident)) {
        // Check if followed by ( to color as function
        tokens.push({ text: ident, color: COLORS.syntaxFunction });
      } else {
        tokens.push({ text: ident, color: COLORS.syntaxVariable });
      }
      continue;
    }

    // Operators & punctuation
    const ops = ["==", "!=", "<=", ">=", "**", "//", "+=", "-=", "*=", "/="];
    let matched = false;
    for (const op of ops) {
      if (line.substring(i, i + op.length) === op) {
        tokens.push({ text: op, color: COLORS.syntaxOperator });
        i += op.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Single char operators
    if ("=+-*/<>!%&|^~".includes(line[i])) {
      tokens.push({ text: line[i], color: COLORS.syntaxOperator });
      i++;
      continue;
    }

    // Brackets / parens
    if ("()[]{}".includes(line[i])) {
      tokens.push({ text: line[i], color: COLORS.textSecondary });
      i++;
      continue;
    }

    // Other punctuation (comma, colon, dot)
    tokens.push({ text: line[i], color: COLORS.textSecondary });
    i++;
  }

  return tokens;
}
