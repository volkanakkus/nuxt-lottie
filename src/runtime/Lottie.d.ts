export type {
  AnimationDirection,
  AnimationItem,
  AnimationSegment,
  LottiePlayer,
} from "lottie-web";

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
