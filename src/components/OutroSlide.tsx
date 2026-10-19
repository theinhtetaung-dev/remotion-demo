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

interface OutroSlideProps {
  slide: LessonSlide;
}

export const OutroSlide: React.FC<OutroSlideProps> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Checkmark animation
  const checkScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Title
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Topics learned badges
  const topics = [
    "React + Video",
    "Composition",
    "Sequence",
    "useCurrentFrame",
    "interpolate",
  ];

  // Pulsing glow
  const glowPulse = Math.sin(frame * 0.05) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentSuccess}15 0%, transparent 70%)`,
          opacity: glowPulse,
        }}
      />

      {/* Success checkmark circle */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.accentSuccess}, ${COLORS.accentSecondary})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${checkScale})`,
          boxShadow: `0 15px 50px ${COLORS.accentSuccess}40`,
          marginBottom: 32,
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Heading */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [25, 0])}px)`,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.textPrimary,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {slide.headingEn}
        </h2>
      </div>

      {/* Burmese text */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 26,
          color: COLORS.textSecondary,
          margin: "16px 0 36px 0",
          opacity: subtitleOpacity,
          lineHeight: 1.6,
        }}
      >
        {slide.headingMm}
      </p>

      {/* Topics badges */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {topics.map((topic, index) => {
          const badgeFrame = 70 + index * 10;
          const badgeOpacity = interpolate(
            frame,
            [badgeFrame, badgeFrame + 15],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const badgeScale = spring({
            frame: Math.max(0, frame - badgeFrame),
            fps,
            config: { damping: 12, stiffness: 120 },
          });

          return (
            <div
              key={topic}
              style={{
                opacity: badgeOpacity,
                transform: `scale(${badgeScale})`,
                background: `${COLORS.accentPrimary}15`,
                border: `1px solid ${COLORS.accentPrimary}40`,
                borderRadius: 12,
                padding: "10px 22px",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 16,
                  color: COLORS.accentPrimary,
                  fontWeight: 600,
                }}
              >
                ✓ {topic}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
