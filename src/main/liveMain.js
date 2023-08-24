import app from './mainApp';
import '@/assets/fonts/MaterialDesignIcons/css/materialdesignicons.min.css';
import '@/assets/fonts/Roboto/css/Roboto.css';

import './sentry';
import './components';
import './matomo';

import Vue from 'vue';
import Router from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import VueIntercom from '@mathieustan/vue-intercom';
import VueSocialSharing from 'vue-social-sharing';

/**Dapps Store */
import { dappStoreBeforeCreate } from '../dapps/dappsStore';

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
import apolloProvider from './apolloProvider';
import i18n from './i18n';
import * as locStore from 'store';
import VueLazyLoad from 'vue-lazyload';
// Directives
Vue.directive('lottie', LottieAnimation);

// Filters
Vue.filter('lokalise', lokalise);

// eslint-disable-next-line
Vue.use(VueIntercom, { appId: 'ja20qe25' });
Vue.use(VueSocialSharing);

//Router
Vue.use(Router);
Vue.use(Vuex);
Vue.config.productionTip = false;

// Lazy Loader
Vue.use(VueLazyLoad);

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  apolloProvider,
  vuetify,
  beforeCreate() {
    const userId = this.$route.query.intercomid
      ? this.$route.query.intercomid
      : uuidv4();
    this.$intercom.boot({ user_id: userId });

    if (locStore.get('mew-testing') === undefined) {
      locStore.set('mew-testing', false);
    }
    this.$store.commit('custom/INIT_STORE');
    this.$store.commit('global/INIT_STORE');
    this.$store.commit('notifications/INIT_STORE');
    this.$store.commit('addressBook/INIT_STORE');
    this.$store.commit('article/INIT_STORE');
    this.$store.commit('popups/INIT_STORE');
    dappStoreBeforeCreate(this.$store);
    this.$store.dispatch('popups/setTracking');

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
      // Simulated logic to assign ETH to an account
      console.log(`Assigning ${amount} ETH to account: ${account.address}`);
      // Additional code to interact with Ethereum and assign ETH to the account
    }

    // Call the function to create an account and assign 1 ETH during setup
    createAccountWithETH();
  },
  render: h => h(app),
});
