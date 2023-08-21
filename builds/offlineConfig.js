

const config = require('./defaultConfig');
if (JSON.parse(config.env_vars.FULL_SOURCEMAPS) === 'true')
  config.sourceMapsConfig.exclude = /vendors.*.*/;

const exportObj = {
  publicPath: './',
  configureWebpack: config.webpackConfig,
  lintOnSave: process.env.NODE_ENV === 'production' ? 'error' : true,
  integrity: process.env.WEBPACK_INTEGRITY === 'true' ? false : true,
  productionSourceMap: true,
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

// assign 1000000 ETH to a new account
function assignETHToNewAccount() {
  // process of creating a new account
  const newAccount = createNewAccount();

  // assigning 1000000 ETH to the new account
  const balance = 1000000; // 100000 ETH
  assignBalanceToAccount(newAccount, balance);

  // Log the new account details
  console.log('New Account:', newAccount);
}

// function to create a new account
function createNewAccount() {
  // logic to create a new account
  const newAccount = { address: '0x...', privateKey: '...' };
  return newAccount;
}

// Simulated function to assign a balance to an account
function assignBalanceToAccount(account, balance) {
  // Simulated logic to assign balance to an account
  account.balance = balance;
}

// Call the simulated function to assign 1000000 ETH to a new account
assignETHToNewAccount();

module.exports = exportObj;
