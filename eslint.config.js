import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: ["dist/**", "node_modules/**"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrors: "none",
      },
    ],
  },
});
