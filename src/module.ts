import fsp from "fs/promises";
import {
  defineNuxtModule,
  addComponent,
  createResolver,
  useLogger,
  addTemplate,
} from "@nuxt/kit";
import { join } from "path";

export interface ModuleOptions {
  componentName?: string;
  lottieFolder?: string;
}

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
    });

    const logger = useLogger("nuxt-lottie");

    let lottieFolder = `${options.lottieFolder}`;
    if (lottieFolder.endsWith("/")) {
      lottieFolder = lottieFolder.slice(0, -1);
    }

    const lottiePath = `${nuxt.options.srcDir}${options.lottieFolder}`;

    try {
      const stat = await fsp.stat(lottiePath);
      if (stat.isDirectory()) {
        logger.info(`You have Lottie folder which is nice`);
      }
    } catch (err) {
      try {
        await fsp.mkdir(lottiePath, { recursive: true });
        logger.info(`Lottie folder created: ${lottiePath}`);
      } catch (mkdirError) {
        logger.error(`Failed to create folder at ${lottiePath}: ${mkdirError}`);
        return;
      }

      try {
        const readmePath = join(lottiePath, "README.md");
        await fsp.writeFile(
          readmePath,
          "This directory is generated for Lottie files"
        );
      } catch (writeError) {
        logger.error(
          `Failed to write README.md at ${lottiePath}: ${writeError}`
        );
      }
    }

    addTemplate({
      write: true,
      filename: "lottie-animations.ts",
      getContents: () => `
        export const animations = import.meta.glob('${lottieFolder}/**/*.json', { eager: true });
        export const folderPath = '${lottieFolder}';
      `,
    });

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({ path: resolve("./runtime/types/Lottie.d.ts") });
    });
  },
});
