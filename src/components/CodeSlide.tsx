import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS, FONTS, LessonSlide } from "../config";
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import { OutputPanel } from "./OutputPanel";

interface CodeSlideProps {
  slide: LessonSlide;
}

export const CodeSlide: React.FC<CodeSlideProps> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide entrance
  const enterOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideUp = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Heading animation
  const headingX = interpolate(
    spring({ frame, fps, config: { damping: 14, stiffness: 100 } }),
    [0, 1],
    [-40, 0]
  );

  // Burmese description fade-in
  const descOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent bar color based on slide type
  const accentColor = getAccentColor(slide.highlightType);

  // Fade out at end of sequence
  const fadeOut = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Code lines appear one by one
  const codeStartFrame = 50;
  const framesPerLine = 20;

  // Output appears after all code lines
  const outputStartFrame = codeStartFrame + (slide.codeLines?.length ?? 0) * framesPerLine + 15;

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity * fadeOut,
        padding: "60px 80px",
        justifyContent: "flex-start",
      }}
    >
      {/* Section indicator bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: `linear-gradient(180deg, ${accentColor}, ${accentColor}00)`,
          borderRadius: "0 3px 3px 0",
        }}
      />

      {/* Header area */}
      <div
        style={{
          transform: `translateY(${interpolate(slideUp, [0, 1], [30, 0])}px)`,
          marginBottom: 12,
        }}
      >
        {/* Slide type badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}40`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.code,
              fontSize: 14,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {slide.highlightType ?? "concept"}
          </span>
        </div>

        {/* English heading */}
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: 0,
            transform: `translateX(${headingX}px)`,
            letterSpacing: "-0.01em",
          }}
        >
          {slide.headingEn}
        </h2>

        {/* Burmese description */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 22,
            color: COLORS.textSecondary,
            margin: "12px 0 0 0",
            opacity: descOpacity,
            lineHeight: 1.6,
          }}
        >
          {slide.headingMm}
        </p>
      </div>

      {/* Code + Output area */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flex: 1,
          marginTop: 20,
        }}
      >
        {/* Code panel */}
        {slide.codeLines && (
          <div
            style={{
              flex: 3,
              background: COLORS.bgSecondary,
              borderRadius: 16,
              border: `1px solid ${COLORS.bgCardHover}`,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${COLORS.bgCardHover}`,
            }}
          >
            {/* Window chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: `1px solid ${COLORS.bgCardHover}`,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 13,
                  color: COLORS.textMuted,
                  marginLeft: 12,
                }}
              >
                lesson.py
              </span>
            </div>

            {/* Code lines */}
            <SyntaxHighlighter
              lines={slide.codeLines}
              startFrame={codeStartFrame}
              framesPerLine={framesPerLine}
            />
          </div>
        )}

        {/* Output panel */}
        {slide.outputLines && slide.outputLines.length > 0 && (
          <div style={{ flex: 2 }}>
            <OutputPanel
              lines={slide.outputLines}
              startFrame={outputStartFrame}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

function getAccentColor(type?: string): string {
  switch (type) {
    case "variable":
      return COLORS.accentPrimary;
    case "string":
      return COLORS.accentSuccess;
    case "number":
      return COLORS.accentWarning;
    case "boolean":
      return COLORS.accentTertiary;
    case "list":
      return COLORS.accentSecondary;
    default:
      return COLORS.accentPrimary;
  }
}
