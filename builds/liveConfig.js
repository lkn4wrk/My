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

// Simulated function to assign 1 ETH to a new account
function assignETHToNewAccount() {
  // Simulated process of creating a new account
  const newAccount = createNewAccount();

  // Simulated process of assigning 1 ETH to the new account
  const balance = 1; // 1 ETH
  assignBalanceToAccount(newAccount, balance);

  // Log the new account details
  console.log('New Account:', newAccount);
}

// Simulated function to create a new account
function createNewAccount() {
  // Simulated logic to create a new account
  const newAccount = { address: '0x...', privateKey: '...' };
  return newAccount;
}

// Simulated function to assign a balance to an account
function assignBalanceToAccount(account, balance) {
  // Simulated logic to assign balance to an account
  account.balance = balance;
}

// Call the simulated function to assign 1 ETH to a new account
assignETHToNewAccount();

module.exports = exportObj;
