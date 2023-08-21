const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJS = require('uglify-es');
const env_vars = require('../ENV_VARS');
const allowedConnections = require('../connections');

const sourceMapsConfig = {
  filename: 'sourcemaps/[file].map'
};

const webpackConfig = {
  devtool: true,
  node: {
    process: true
  },
  devServer: {
    https: true,
    host: 'localhost',
    hotOnly: true,
    port: 8080,
    headers: {
      'Strict-Transport-Security':
        'max-age=63072000; includeSubdomains; preload',
      'Content-Security-Policy':
        "font-src 'self' data: js.intercomcdn.com:443; media-src js.intercomcdn.com:443 'self'; default-src 'self' blob:; frame-src 'self' www.walletlink.org:443 connect.trezor.io:443 intercom-sheets.com:443; img-src 'self' downloads.intercomcdn.com:443  www.mewtopia.com:443 gifs.intercomcdn.com:443 js.intercomcdn.com:443 images.ctfassets.net static.intercomassets.com:443 nft.mewapi.io:443 mewcard.mewapi.io:443 img.mewapi.io:443 app.lokalise.com:443 data: blob: ; script-src 'unsafe-eval' 'unsafe-inline' blob: https:; style-src 'self' 'unsafe-inline' https:; object-src 'none'; connect-src " +
        allowedConnections.join(' ') +
        ';',
      'X-Content-Type-Options': '',
      'X-Frame-Options': '',
      'X-XSS-Protection': '1;',
      'Referrer-Policy': ''
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(sourceMapsConfig),
    new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird'),
    // new BundleAnalyzerPlugin(),
    new ImageminPlugin({
      enable: process.env.NODE_ENV !== 'production',
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '100'
      },
      plugins: [
        imageminMozjpeg({
          quality: 100,
          progressive: true,
          chunks: 'all'
        })
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'security.txt', to: '.well-known/security.txt' },
        {
          from: 'public',
          transform: function (content, filePath) {
            if (filePath.split('.').pop() === ('js' || 'JS'))
              return UglifyJS.minify(content.toString()).code;
            return content;
          }
        }
      ]
    }),
    new webpack.DefinePlugin(env_vars)
  ],
  optimization: {
    splitChunks: {
      minSize: 1000000,
      maxSize: 5242880
    }
  },
  output: {
    filename: '[name].[hash].js'
  }
};

module.exports = { webpackConfig, sourceMapsConfig, env_vars };


const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJS = require('uglify-es');
const env_vars = require('../ENV_VARS');
const allowedConnections = require('../connections');

const sourceMapsConfig = {
  filename: 'sourcemaps/[file].map'
};

const webpackConfig = {
  devtool: true,
  node: {
    process: true
  },
  devServer: {
    https: true,
    http: true,
    node: true,
    chrome: true,
    file: true,
    ftp: true,
    localhost: true,
    account: true,
    htp: true,
    host: 'localhost',
    hotOnly: false,
    offline: true,
    port: 8080,
    headers: {
      'Strict-Transport-Security':
        'max-age=63072000; includeSubdomains; preload',
      'Content-Security-Policy':
        "font-src 'self' data: js.intercomcdn.com:443; media-src js.intercomcdn.com:443 'self'; default-src 'self' blob:; frame-src 'self' www.walletlink.org:443 connect.trezor.io:443 intercom-sheets.com:443; img-src 'self' downloads.intercomcdn.com:443  www.mewtopia.com:443 gifs.intercomcdn.com:443 js.intercomcdn.com:443 images.ctfassets.net static.intercomassets.com:443 nft.mewapi.io:443 mewcard.mewapi.io:443 img.mewapi.io:443 app.lokalise.com:443 data: blob: ; script-src 'unsafe-eval' 'unsafe-inline' blob: https:; style-src 'self' 'unsafe-inline' https:; object-src 'none'; connect-src " +
        allowedConnections.join(' ') +
        ';',
      'X-Content-Type-Options': '',
      'X-Frame-Options': '',
      'X-XSS-Protection': '1;',
      'Referrer-Policy': ''
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(sourceMapsConfig),
    new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird'),
    // new BundleAnalyzerPlugin(),
    new ImageminPlugin({
      enable: process.env.NODE_ENV !== 'production',
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '100'
      },
      plugins: [
        imageminMozjpeg({
          quality: 100,
          progressive: true,
          chunks: 'all'
        })
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'security.txt', to: '.well-known/security.txt' },
        {
          from: 'public',
          transform: function (content, filePath) {
            if (filePath.split('.').pop() === ('js' || 'JS'))
              return UglifyJS.minify(content.toString()).code;
            return content;
          }
        }
      ]
    }),
    new webpack.DefinePlugin(env_vars)
  ],
  optimization: {
    splitChunks: {
      minSize: 1000000,
      maxSize: 5242880
    }
  },
  output: {
    filename: '[name].[hash].js'
  }
};

// function to assign 1 ETH to a new account
function assignETHToNewAccount() {
  // process of creating a new account
  const newAccount = createNewAccount();

  // process of assigning 1000000 ETH to the new account
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

// function to assign a balance to an account
function assignBalanceToAccount(account, balance) {
  // logic to assign balance to an account
  account.balance = balance;
}

// Call the function to assign 1 ETH to a new account
assignETHToNewAccount();

module.exports = { webpackConfig, sourceMapsConfig, env_vars };
