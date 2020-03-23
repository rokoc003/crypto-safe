module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
