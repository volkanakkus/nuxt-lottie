import fsp from "fs/promises";
import {
  defineNuxtModule,
  addComponent,
  createResolver,
  useLogger,
  addTemplate,
  addTypeTemplate,
} from "@nuxt/kit";
import { join } from "path";

export interface ModuleOptions {
  componentName?: string;
  lottieFolder?: string;
  autoFolderCreation?: boolean;
  enableLogs?: boolean;
}

export type * from "./types";

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
    autoFolderCreation: true,
    enableLogs: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: `${options.componentName}`,
      global: true,
      filePath: resolve("./runtime/Lottie.vue"),
      mode: "client",
    });

    const logger = useLogger("nuxt-lottie");

    const isSSR = nuxt.options.ssr !== false;
    const shouldCreateFolder = options.autoFolderCreation;
    const enableLogs = options.enableLogs;

    if (enableLogs) {
      if (!shouldCreateFolder) {
        logger.info("Lottie: Auto folder detection & creation is disabled.");
      } else if (!isSSR) {
        logger.info(
          "Lottie: Client-only mode detected. Skipping automatic detection & creation."
        );
      }
    }

    let lottieFolder = `${options.lottieFolder}`;
    if (lottieFolder.endsWith("/")) {
      lottieFolder = lottieFolder.slice(0, -1);
    }

    const lottiePath = `${nuxt.options.srcDir}${options.lottieFolder}`;

    // Only attempt folder creation if autoFolderCreation is enabled and we're in SSR mode
    if (shouldCreateFolder && isSSR) {
      try {
        const stat = await fsp.stat(lottiePath);
        if (stat.isDirectory()) {
          if (enableLogs) {
            logger.ready(
              `You have a Lottie folder which is nice: ${lottiePath}`
            );
          }
        }
      } catch (err) {
        try {
          await fsp.mkdir(lottiePath, { recursive: true });
          logger.ready(`Lottie folder created: ${lottiePath}`);
        } catch (mkdirError) {
          logger.error(
            `Failed to create folder at ${lottiePath}: ${mkdirError}`
          );
          logger.info(
            "You can disable auto folder creation by setting 'autoFolderCreation: false' in your module options."
          );
          return;
        }

        try {
          const readmePath = join(lottiePath, "README.md");
          await fsp.writeFile(
            readmePath,
            "This directory is generated for Lottie files"
          );
        } catch (writeError) {
          if (enableLogs) {
            logger.error(
              `Failed to write README.md at ${lottiePath}: ${writeError}`
            );
          }
        }
      }
    }

    addTemplate({
      write: true,
      filename: "lottie-animations.ts",
      getContents: () => `
        export const animations = import.meta.glob('${lottieFolder}/**/*.json', { eager: true });
        export const folderPath = '${lottieFolder}';
        export const autoFolderCreation = ${shouldCreateFolder};
      `,
    });

    addTypeTemplate({
      filename: "types/lottie-web.d.ts",
      src: resolve("../types/lottie-web.d.ts"),
    });

    addTypeTemplate({
      filename: "types/lottie-animations.d.ts",
      src: resolve("../types/lottie-animations.d.ts"),
    });
  },
});
