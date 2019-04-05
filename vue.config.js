module.exports = {
  pluginOptions: {
    quasar: {
      theme: "mat",
    },
  },
  transpileDependencies: [
    // eslint-disable-next-line
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/,
  ],
};
