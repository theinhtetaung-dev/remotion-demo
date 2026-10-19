import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { LESSON_SLIDES, SLIDE_TIMINGS, COLORS } from "./config";
import { IntroSlide } from "./components/IntroSlide";
import { CodeSlide } from "./components/CodeSlide";
import { OutroSlide } from "./components/OutroSlide";
import { ProgressBar } from "./components/ProgressBar";
import { ParticleBackground } from "./components/ParticleBackground";

export const PythonLesson: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Animated background particles */}
      <ParticleBackground />

      {/* Progress bar at top */}
      <ProgressBar progress={frame / durationInFrames} />

      {/* Intro slide */}
      <Sequence
        from={SLIDE_TIMINGS.intro.start}
        durationInFrames={SLIDE_TIMINGS.intro.duration}
      >
        <IntroSlide slide={LESSON_SLIDES[0]} />
      </Sequence>

      {/* Content slides */}
      {LESSON_SLIDES.slice(1, -1).map((slide) => {
        const timing = SLIDE_TIMINGS[slide.id as keyof typeof SLIDE_TIMINGS];
        return (
          <Sequence
            key={slide.id}
            from={timing.start}
            durationInFrames={timing.duration}
          >
            <CodeSlide slide={slide} />
          </Sequence>
        );
      })}

      {/* Outro slide */}
      <Sequence
        from={SLIDE_TIMINGS.outro.start}
        durationInFrames={SLIDE_TIMINGS.outro.duration}
      >
        <OutroSlide slide={LESSON_SLIDES[LESSON_SLIDES.length - 1]} />
      </Sequence>
    </AbsoluteFill>
  );
};
