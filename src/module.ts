import {
  defineNuxtModule,
  addComponent,
  createResolver,
  addTemplate,
} from "@nuxt/kit";

export interface ModuleOptions {
  componentName?: string;
  lottieFolder?: string;
}

export type {
  Lottie,
  LottieProps,
  AnimationItem,
  AnimationDirection,
  AnimationSegment,
  LottiePlayer,
} from "./types";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-lottie",
    configKey: "lottie",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {
    componentName: "Lottie",
    lottieFolder: "/assets/lottie",
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: `${options.componentName}`,
      global: true,
      filePath: resolve("./runtime/Lottie.vue"),
      mode: "client",
    });

    let lottieFolder = `${options.lottieFolder}`;
    if (lottieFolder.endsWith("/")) {
      lottieFolder = lottieFolder.slice(0, -1);
    }

    addTemplate({
      write: true,
      filename: "lottie-animations.ts",
      getContents: () => `
        export const animations = import.meta.glob('${lottieFolder}/**/*.json', { eager: true });
        export const folderPath = '${lottieFolder}';
      `,
    });
  },
});
