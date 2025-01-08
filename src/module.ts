import fsp from "fs/promises";
import {
  defineNuxtModule,
  addComponent,
  createResolver,
  useLogger,
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
    nuxt.options.runtimeConfig.public.lottieFolder = options.lottieFolder;

    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: `${options.componentName}`,
      global: true,
      filePath: resolve("./runtime/Lottie.vue"),
    });

    const logger = useLogger("nuxt-lottie");

    const srcDir = nuxt.options.srcDir;
    logger.info(`Current srcDir: ${srcDir}`);

    const lottiePath = `${nuxt.options.srcDir}${options.lottieFolder}`;

    try {
      const stat = await fsp.stat(lottiePath);
      if (stat.isDirectory()) {
        logger.info(`You have Lottie folder which is nice`);
        return;
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

    if (nuxt.options.dev) {
      nuxt.hook("builder:watch", (filePath, event) => {
        if (filePath.startsWith(join(lottiePath))) {
          if (event === "update") {
            logger.log(`${filePath} changed`);
          } else if (event === "remove") {
            logger.log(`${filePath} removed`);
          }
        }
      });
    }
  },
});
