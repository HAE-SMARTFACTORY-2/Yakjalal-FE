import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.vue"],
    plugins: {
      vue,
      prettier,
    },
    languageOptions: {
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          useTabs: false,
          tabWidth: 2,
          trailingComma: "all",
          printWidth: 80,
          bracketSpacing: true,
          endOfLine: "auto",
        },
      ],
    },
  },
];
