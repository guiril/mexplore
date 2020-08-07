module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/helpers/variables", "~@/assets/scss/all";',
      },
    },
  },
};
