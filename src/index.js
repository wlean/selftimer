'use strict';

import Vue from 'vue';
import App from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Resocurce from 'vue-resource';
import selftimer from './lib/selftimer.js';

Vue.use(iView);
Vue.use(Resocurce);
Vue.use(selftimer);
let app = new Vue({
  el: '#app',
  render: h => h(App),
});
window.selftimer = app;