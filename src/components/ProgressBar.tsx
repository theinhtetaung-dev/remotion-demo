import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../config";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const width = interpolate(progress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: `${COLORS.bgCardHover}`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${COLORS.accentPrimary}, ${COLORS.accentSecondary})`,
          borderRadius: "0 2px 2px 0",
          boxShadow: `0 0 12px ${COLORS.accentPrimary}60`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};
