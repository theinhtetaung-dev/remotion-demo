import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

export const ParticleBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Generate deterministic particles (no randomness at render time)
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      // Use sine-based pseudo-random for deterministic results
      const seed = (i + 1) * 127.1;
      const prand = (s: number) => ((Math.sin(s) * 43758.5453) % 1 + 1) % 1;

      result.push({
        x: prand(seed) * 1920,
        y: prand(seed + 1) * 1080,
        size: 2 + prand(seed + 2) * 4,
        speed: 0.2 + prand(seed + 3) * 0.6,
        opacity: 0.1 + prand(seed + 4) * 0.25,
        delay: prand(seed + 5) * 200,
      });
    }
    return result;
  }, []);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, ${COLORS.accentPrimary}08 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${COLORS.accentSecondary}06 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, ${COLORS.accentTertiary}04 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => {
        const adjustedFrame = frame + particle.delay;
        const yOffset = Math.sin(adjustedFrame * particle.speed * 0.02) * 30;
        const xOffset = Math.cos(adjustedFrame * particle.speed * 0.015) * 20;
        const pulseOpacity =
          particle.opacity *
          (0.5 + 0.5 * Math.sin(adjustedFrame * 0.03 + i));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particle.x + xOffset,
              top: particle.y + yOffset,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: COLORS.accentPrimary,
              opacity: pulseOpacity,
              boxShadow: `0 0 ${particle.size * 3}px ${COLORS.accentPrimary}40`,
            }}
          />
        );
      })}

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.textMuted}05 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.textMuted}05 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </AbsoluteFill>
  );
};
