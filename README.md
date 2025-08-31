![nuxt-lottie-social-card](https://raw.githubusercontent.com/volkanakkus/nuxt-lottie/assets/cover.png)

# Nuxt Lottie

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Lottie - Easily integrate Lottie animations into your Nuxt project.  
- Compatibility: ```Nuxt >= 3```

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features
- 🗂️ Automatic Imports
- 🎨 Nested Folder Support
- 🛠️ Programmatic Control
- 💚 Nuxt 4 Ready

## Quick Setup

Since this module is listed in the [Nuxt Modules](https://nuxt.com/modules/lottie) directory, you can easily add it to your project using the following command:

```bash
npx nuxi module add lottie
```

That's it ✨ Now you can use the `<Lottie>` component in your Vue files. That prompt will automatically install the module and add it to your `nuxt.config.ts` file.

#### Manual Installation

If you prefer manual installation, you can add `nuxt-lottie` to your project using your preferred package manager.

```bash
# Using yarn
yarn add nuxt-lottie

# Using npm
npm install nuxt-lottie

# Using pnpm
pnpm add nuxt-lottie
```

Then add the module to the `modules` section of your `nuxt.config.ts` file.

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-lottie'
  ],
  lottie: {
    componentName: 'Lottie', // Optional: Customize the component name
    lottieFolder: '/assets/lottie', // Optional: Customize the Lottie folder path
    autoFolderCreation: true, // Optional: Auto create lottie folder (default: true)
    enableLogs: true // Optional: Enable console logs from module (default: true)
  }
})
```

### 3. Verify Folder Structure

After installation, ensure that the `assets/lottie` folder exists. If it doesn't, the module will automatically create it for you. You can change the folder path using the `lottieFolder` option in the `nuxt.config.ts` file.

**Note:** If you're not going to use auto imports or prefer to manage folders manually, you can disable automatic folder creation by setting `autoFolderCreation: false` in your module options.

```
your-project/
├── assets/
│   └── lottie/
│       └── README.md
├── nuxt.config.ts
└── ...
```

## Usage

There are 3 ways to use <Lottie> component:
- 1: Using `name` prop with automatic imports of Lottie JSON files
- 2: Using `data` prop with provided Lottie JSON object
- 3: Using `link` prop with Lottie JSON link from CDN or any other source
 
Priority is given to the `name` prop, then `data` prop, and finally `link` prop.

## 1. Using `name` prop with automatic imports of JSON files

### 1.1 Add Lottie Animations

Place your `.json` animation files inside the `assets/lottie` folder. You can organize them into nested folders as needed.

```
assets/
└── lottie/
    ├── rocket.json
    └── nested/
        └── spaceship.json
```

### 1.2 Use the `<Lottie>` Component

Import and use the `<Lottie>` component in your Vue files.

```vue
<template>
  <!-- Using a top-level animation -->
  <Lottie name="rocket" />

  <!-- Using a nested animation -->
  <Lottie name="nested/spaceship" />
</template>
```

## 2. Using `data` prop with JSON object

```vue
<template>
  <Lottie :data="HelloJSON"  />
</template>

<script setup lang="ts">
import HelloJSON from './hello.json'
</script>
```

## 3. Using `link` prop with link to JSON file

```vue
<template>
  <Lottie link="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"  />
</template>
```



## Programmatic Control

You can control the animation using methods exposed by the `<Lottie>` component. Use `ref` to access these methods.

Additionally, you can import the type of the Lottie component for better TypeScript support.

```vue
<template>
  <Lottie ref="awesomeLottie" name="awesome" />
  <button @click="playAnimation">Play Animation</button>
  <button @click="pauseAnimation">Pause Animation</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Lottie } from 'nuxt-lottie'

const awesomeLottie = ref<Lottie | null>(null)

const playAnimation = () => {
  awesomeLottie.value?.play()
}

const pauseAnimation = () => {
  awesomeLottie.value?.pause()
}
</script>
```

## Module Options

You can configure the module behavior in your `nuxt.config.ts` file:

| Option             | Type    | Default Value     | Description                                                                                                                    |
| ------------------ | ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| componentName      | String  | "Lottie"         | Customize the component name (e.g., set to "LottieAnimation" to use `<LottieAnimation>` instead of `<Lottie>`)               |
| lottieFolder       | String  | "/assets/lottie" | Customize the Lottie folder path where animations are stored                                                                   |
| autoFolderCreation | Boolean | true             | Automatically create the lottie folder if it doesn't exist. You can disable for client-only apps or manual folder management          |
| enableLogs         | Boolean | true             | Enable terminal logs from the module during development. Disable if you like silence.                                       |

## `<Lottie>` Props: 

| Prop             | Type              | Default Value | Description                                                                                                        |
| ---------------- | ----------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| name             | String   | null        |  The name of the animation file without the `.json` extension. Supports nested paths (e.g., `"folder/animation"`).            |
| data             | Object            | {}            | The lottie animation data provided as a JSON object                                                                |
| link             | String            | ''            | A URL link to the Lottie animation data (eg: `Lottie Animation URL` on lottiefiles.com)                            |
| width            | Number or String  | "100%"        | Width of the lottie animation container (Numbers correspond to pixel values)                                       |
| height           | Number or String  | "100%"        | Height of the lottie animation container (Numbers correspond to pixel values)                                      |
| speed            | Number            | "1"           | Speed of the lottie animation                                                                                      |
| direction        | String            | "forward"     | Animation play direction                                                                                           |
| loop             | Number or Boolean | true          | The number of instances that the lottie animation should run (true is infinite)                                    |
| autoplay        | Boolean           | true          | Start animation on component load                                                                                  |
| delay            | Number            | 0             | Delay the animation play state by some milliseconds                                                                |
| pause-animation  | Boolean           | false         | Prop to pass reactive variables so that you can control animation pause and play                                   |
| pause-on-hover   | Boolean           | false         | Whether to pause the animation on hover                                                                            |
| play-on-hover    | Boolean           | false         | Whether to play the animation when you hover                                                                       |
| background-color | String            | transparent   | Background color of the container                                                                                  |
| no-margin        | Boolean           | false         | Prevent the lottie from auto centering in the container. This gives you better control on placement within your UI |
| scale            | Number            | 1             | Scale the animation (might cause blurriness)                                                                       |
| assets-path      | String            | ""            | URL to the image asset you need to use in your Lottie animation                                                    |
| renderer         | String            | "svg"         | Set the renderer                                                                                                   |
| renderer-settings| Object            | {}            | Options for if you want to use an existing canvas to draw (can be ignored on most cases)                           |

## Events

A few events are emitted from the component.

- onComplete
  - If your animation has a finite amount of loops you can use this event to know when the animation has completed.
- onLoopComplete
  - If your animation has a finite amount of loops you can use this event to know when the animation has completed a loop.
- onEnterFrame
  - This event is fired every frame of the animation. There will be 60 events fired per second if your lottie animation runs at 60fps.
- onSegmentStart
  - This event is fired when the animation enters a segment.
- onAnimationLoaded
  - This event is fired when the animation has loaded. This should let you know when you can start referencing the methods for the component.

## Methods

You can control the animation with the following methods. These methods can be called by assigning a `ref` value to the `<Lottie>` component. 

- play
  - Plays the animation
- pause
  - Pauses the animation
- stop
  - Stops the animation. This will also reset the animation to the first frame. Look at the demo for some examples.
- destroy
  - You can call this method to destroy the animation. It will remove the animation from the DOM.
- setSpeed(speed)
  - You can call this method to change the speed of your animation.
- setDirection(direction)
  - You can call this method to change the direction of your animation.
- getDuration(inFrames)
  - You can call this method to get the duration of your animation.
- goToAndStop(frameNumber, isFrames)
  - You can call this method to go to a specific frame of your animation. The animation will be stopped at the end of this call.
- goToAndPlay(frameNumber, isFrames)
  - You can call this method to go to a specific frame of your animation. The animation will be played from this frame.
- playSegments(segments, forceFlag)
  - You can call this method to play a specific segment of your animation.
- setSubFrame(subFrame)
  - You can call this method to set the subframe value.
- updateDocumentData(documentData, index)
  - This method updates text on text layers.
  

## Development

```bash
# Clone the repository
git clone https://github.com/volkanakkus/nuxt-lottie.git
cd nuxt-lottie

# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run build

# Develop the docs
npm run dev:docs
```

---

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-lottie/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-lottie

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-lottie.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-lottie

[license-src]: https://img.shields.io/npm/l/nuxt-lottie.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-lottie

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com

This software is licensed under the [MIT License](./LICENSE) | @volkanakkus | Special thanks to [@megasanjay](https://github.com/megasanjay) 💚
