import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './filters';
import './directives';
import './bus';

Vue.config.productionTip = false;

Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
