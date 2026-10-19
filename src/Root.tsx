import React from "react";
import { Composition } from "remotion";
import { PythonLesson } from "./PythonLesson";
import { VIDEO_CONFIG } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WhatIsRemotion"
        component={PythonLesson}
        durationInFrames={VIDEO_CONFIG.fps * VIDEO_CONFIG.durationInSeconds}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="PythonLesson"
        component={PythonLesson}
        durationInFrames={VIDEO_CONFIG.fps * VIDEO_CONFIG.durationInSeconds}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
