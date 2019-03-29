module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended"],
  rules: {
    "no-console": "error" ,
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
