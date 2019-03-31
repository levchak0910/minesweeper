module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["warn", 2],
    "comma-dangle": ["error", "always-multiline"],
    quotes: ["error", "double"],
    "max-len": ["error", 150],
    "consistent-return": "off",
    eqeqeq: "off",
    "no-alert": "off",
    "no-continue": "off",
    "import/extensions": "off",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
  },

  parserOptions: {
    parser: "babel-eslint",
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "@vue/airbnb",
  ],
};
