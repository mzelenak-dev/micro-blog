import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier,
    },
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
    ],
    rules: {
      "prettier/prettier": "error", // enforce Prettier
      "react/react-in-jsx-scope": "off", // not needed in React 17+
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);