/* eslint-disable prettier/prettier */
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error", // Show Prettier formatting issues as ESLint errors
    },
    ignores: [
      "dist/**/*",
      "build/**/*",
      "webpack.config.js",
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
    ],
  },
  prettierConfig, // disables conflicting ESLint formatting rules
]);
