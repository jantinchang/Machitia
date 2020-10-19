module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  extends: ["plugin:react/recommended"],
  parser: "babel-eslint",
  rules: {
    "react/forbid-prop-types": [2],
    "react/boolean-prop-naming": ["error", { validateNested: true }],
    quotes: [0, "always"],
    semi: [0, "never"],
    "space-before-function-paren": [0, "never"],
    indent: [0, "never"],
    "jsx-a11y/anchor-is-valid": "off",
    "no-script-url": "off",
    camelcase: [
      "error",
      {
        properties: "always",
      },
    ],
    "no-redeclare": [
      2,
      {
        builtinGlobals: true,
      },
    ],
    eqeqeq: [2, "always"],
    "no-unused-vars": [
      2,
      {
        vars: "local",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
    "no-console": [
      2,
      {
        allow: ["none"],
      },
    ],
    "no-alert": [2],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
