module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mexplore/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/helpers/variables", "~@/assets/scss/all";',
      },
    },
  },
};
