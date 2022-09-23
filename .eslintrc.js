module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-console": "on",
  },
  settings: {
    react: {
      version: "18.2.0",
    },
  },
};
