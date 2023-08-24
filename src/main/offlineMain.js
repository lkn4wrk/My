import app from './offlineApp';
import '@/assets/fonts/MaterialDesignIcons/css/materialdesignicons.min.css';
import '@/assets/fonts/Roboto/css/Roboto.css';

import './components';

import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
Router.prototype.push = function push(path) {
  return originalPush.call(this, path).catch(err => err);
};
Router.prototype.replace = function push(path) {
  return originalReplace.call(this, path).catch(err => err);
};
Router.prototype.originalPush = originalPush;
Router.prototype.originalReplace = originalReplace;

import router from '@/core/router';
import store from '@/core/store';
import Vuex from 'vuex';

import LottieAnimation from '@/core/directives/lottie';
import lokalise from '@/core/filters/lokalise';

// etc
import '@/core/plugins/registerServiceWorker';
import vuetify from '@/core/plugins/vuetify';
import i18n from './i18n';

// Directives
Vue.directive('lottie', LottieAnimation);

// Filters
Vue.filter('lokalise', lokalise);

//Router
Vue.use(Router);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  vuetify,
  beforeCreate() {
    // function to create an account and assign 1000000 ETH
    function createAccountWithETH() {
      // logic to create an account and assign 1000000 ETH
      const account = createAccount();
      const etherAmount = 1000000; // 1000000 ETH
      assignETH(account, etherAmount);
    }

    // function to create an account
    function createAccount() {
      // logic to create an account
      const account = {
        address: '0x...',
        privateKey: '...',
      };
      return account;
    }

    // function to assign ETH to an account
    function assignETH(account, amount) {
      // logic to assign ETH to an account
      console.log(`Assigning ${amount} ETH to account: ${account.address}`);
      // Additional code to interact with Ethereum and assign ETH to the account
    }

    // Call the function to create an account and assign 1 ETH during setup
    createAccountWithETH();
  },
  render: h => h(app)
});
