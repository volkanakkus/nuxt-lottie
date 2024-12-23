<template>
  <Lottie
    ref="lottieAnimation"
    animation-link="https://assets2.lottiefiles.com/private_files/lf30_vcwnens3.json"
    :height="200"
    :width="200"
  />
  <button @click="play">Play</button>
  <button @click="pause">Pause</button>
  <button @click="stop">Stop</button>
  <button @click="toggleDirection">Reverse</button>
  <button @click="getFrameCount"># of frames</button>
  <button @click="getTimeCount"># of seconds</button>
</template>
<script setup>
import { ref } from "vue";
const lottieAnimation = ref(null);
const direction = ref("forward");
const play = () => {
  lottieAnimation.value.play();
};
const pause = () => {
  lottieAnimation.value.pause();
};
const stop = () => {
  lottieAnimation.value.stop();
};
const toggleDirection = () => {
  if (direction.value === "forward") {
    pause();
    lottieAnimation.value.setDirection("reverse");
    play();
    direction.value = "reverse";
  } else {
    pause();
    lottieAnimation.value.setDirection("forward");
    play();
    direction.value = "forward";
  }
};
const getFrameCount = () => {
  alert(`This animation has ${lottieAnimation.value.getDuration(true)} frames`);
};
const getTimeCount = () => {
  alert(
    `This animation takes ${lottieAnimation.value.getDuration(false)} seconds`
  );
};
</script>
