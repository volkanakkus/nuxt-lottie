<template>
  <client-only>
    <Vue3Lottie
      v-if="isVite"
      ref="Vue3LottieSource"
      :animation-data="animationName"
      v-bind="$attrs"
      v-on="$attrs"
    />
    <span v-else> Lottie animations are only available in Vite. </span>
  </client-only>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Vue3Lottie, type AnimationSegment } from "vue3-lottie";
import { animations, folderPath } from "#build/lottie-animations";

// Define the props
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: null,
  },
} as Partial<(typeof Vue3Lottie)["props"]>);

const isVite = import.meta.env !== undefined;

const animationName = computed(() => {
  if (!props.name || !isVite) {
    return null;
  }

  const animation = animations[`${folderPath}/${props.name}.json`]?.default;
  return animation ?? null;

  return null;
});

//Methods
const Vue3LottieSource = ref(null as null | typeof Vue3Lottie);
const play = () => {
  return Vue3LottieSource.value?.play();
};

const pause = () => {
  return Vue3LottieSource.value?.pause();
};

const stop = () => {
  return Vue3LottieSource.value?.stop();
};

const destroy = () => {
  return Vue3LottieSource.value?.destroy();
};

const setSpeed = (speed?: number) => {
  return Vue3LottieSource.value?.setSpeed(speed);
};

const setDirection = (direction: "forward" | "reverse") => {
  return Vue3LottieSource.value?.setDirection(direction);
};

const goToAndStop = (frame: number, isFrame?: boolean) => {
  return Vue3LottieSource.value?.goToAndStop(frame, isFrame);
};

const goToAndPlay = (frame: number, isFrame?: boolean) => {
  return Vue3LottieSource.value?.goToAndPlay(frame, isFrame);
};

const playSegments = (
  segments: AnimationSegment | AnimationSegment[],
  forceFlag?: boolean
) => {
  return Vue3LottieSource.value?.playSegments(segments, forceFlag);
};

const setSubFrame = (useSubFrame?: boolean) => {
  return Vue3LottieSource.value?.setSubFrame(useSubFrame);
};

const getDuration = (inFrames?: boolean) => {
  return Vue3LottieSource.value?.getDuration(inFrames);
};

const updateDocumentData = (documentData: any, index?: number) => {
  return Vue3LottieSource.value?.updateDocumentData(documentData, index);
};

defineExpose({
  play,
  pause,
  stop,
  destroy,
  setSpeed,
  setDirection,
  goToAndStop,
  goToAndPlay,
  playSegments,
  setSubFrame,
  getDuration,
  updateDocumentData,
});
</script>

<style scoped></style>
