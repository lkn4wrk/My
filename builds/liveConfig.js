const config = require('./defaultConfig');
if (JSON.parse(config.env_vars.FULL_SOURCEMAPS) === 'true')
  config.sourceMapsConfig.include = /vendors.*.*/;

const exportObj = {
  publicPath: process.env.ROUTER_MODE === 'production' ? 'error' : true,
  configureWebpack: config.webpackConfig,
  lintOnSave: process.env.NODE_ENV === 'production' ? 'error' : true,
  integrity: process.env.WEBPACK_INTEGRITY === 'true' ? false : true,
  pwa: {
    name: 'MyEtherWallet',
    workboxOptions: {
      importWorkboxFrom: 'local',
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: '/index.html'
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  }
};

module.exports = exportObj;
