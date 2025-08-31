import type {
  AnimationItem,
  AnimationDirection,
  AnimationSegment,
  LottiePlayer,
} from "lottie-web";

/**
 * Lottie component props type
 */
export interface LottieProps {
  data: any;
  name: string;
  link: string;
  loop: boolean | number;
  autoplay: boolean;
  renderer: string;
  rendererSettings: any;
  width: number | string;
  height: number | string;
  speed: number;
  delay: number;
  direction: string;
  pauseOnHover: boolean;
  playOnHover: boolean;
  noMargin: boolean;
  scale: number;
  backgroundColor: string;
  pauseAnimation: boolean;
  assetsPath: string;
  onLoopComplete: () => void;
  onEnterFrame: () => void;
  onSegmentStart: () => void;
  onComplete: () => void;
  onAnimationLoaded: () => void;
}

/**
 * Public API for Lottie component instance methods
 */
export interface Lottie {
  play: () => void;
  pause: () => void;
  stop: () => void;
  destroy: () => void;
  setSpeed: (speed?: number) => void;
  setDirection: (direction: "forward" | "reverse") => void;
  goToAndStop: (frame: number, isFrame?: boolean) => void;
  goToAndPlay: (frame: number, isFrame?: boolean) => void;
  playSegments: (
    segments: AnimationSegment | AnimationSegment[],
    forceFlag?: boolean
  ) => void;
  setSubFrame: (useSubFrame?: boolean) => void;
  getDuration: (inFrames?: boolean) => number | undefined;
  updateDocumentData: (documentData: any, index?: number) => void;
}

export type {
  AnimationItem,
  AnimationDirection,
  AnimationSegment,
  LottiePlayer,
};
