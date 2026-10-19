import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../config";

interface OutputPanelProps {
  lines: string[];
  startFrame: number;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  lines,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel entrance
  const panelOpacity = interpolate(
    frame,
    [startFrame - 10, startFrame],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const panelScale = spring({
    frame: Math.max(0, frame - startFrame + 10),
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <div
      style={{
        opacity: panelOpacity,
        transform: `scale(${interpolate(panelScale, [0, 1], [0.95, 1])})`,
        background: COLORS.bgCard,
        borderRadius: 16,
        border: `1px solid ${COLORS.bgCardHover}`,
        padding: "24px 28px",
        height: "100%",
        boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
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
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: COLORS.accentSuccess,
            boxShadow: `0 0 8px ${COLORS.accentSuccess}80`,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.code,
            fontSize: 13,
            color: COLORS.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Output
        </span>
      </div>

      {/* Output lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((line, index) => {
          const lineStartFrame = startFrame + index * 15;
          const relFrame = frame - lineStartFrame;

          const lineOpacity = interpolate(relFrame, [-1, 0, 8], [0, 0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const lineX = relFrame >= 0
            ? interpolate(
                spring({
                  frame: Math.max(0, relFrame),
                  fps,
                  config: { damping: 15, stiffness: 120 },
                }),
                [0, 1],
                [15, 0]
              )
            : 15;

          return (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                transform: `translateX(${lineX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 14,
                  color: COLORS.accentSuccess,
                }}
              >
                ▶
              </span>
              <span
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 20,
                  color: COLORS.accentSuccess,
                  lineHeight: 1.6,
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
