export default defineNuxtConfig({
  modules: ["../src/module"],
  devtools: { enabled: true },

  lottie: {
    componentName: "Lottie", // Optional: Customize the component name
    lottieFolder: "/assets/lottie", // Optional: Customize the Lottie folder path
    autoFolderCreation: true, // Optional: Auto create lottie folder (default: true)
    enableLogs: true, // Optional: Enable console logs from module (default: true)
    defaults: {
      scale: 1,
      autoplay: true,
    }, // Optional: Set default prop values for all <Lottie> instances
  },

  compatibilityDate: "2025-01-09",
});
