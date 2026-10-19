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

interface IntroSlideProps {
  slide: LessonSlide;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Python logo scale-in
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoRotate = interpolate(frame, [0, 90], [0, 360], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Title fade in
  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Subtitle (Burmese)
  const subtitleOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Decorative line
  const lineWidth = interpolate(frame, [60, 100], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Fade-out at end
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Gradient glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentPrimary}30 0%, transparent 70%)`,
          transform: `scale(${logoScale})`,
        }}
      />

      {/* Python-inspired logo */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${COLORS.accentPrimary}, ${COLORS.accentSecondary})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          boxShadow: `0 20px 60px ${COLORS.accentPrimary}40`,
          marginBottom: 40,
        }}
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" opacity="0.3" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.heading,
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.textPrimary,
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {slide.headingEn}
        </h1>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentPrimary}, ${COLORS.accentSecondary}, transparent)`,
          borderRadius: 2,
          margin: "24px 0",
        }}
      />

      {/* Burmese subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${interpolate(subtitleY, [0, 1], [20, 0])}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: COLORS.textSecondary,
            margin: 0,
            maxWidth: 800,
            lineHeight: 1.6,
          }}
        >
          {slide.headingMm}
        </p>
      </div>
    </AbsoluteFill>
  );
};
