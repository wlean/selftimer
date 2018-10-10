'use strict';

import Vue from 'vue';
import App from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Resocurce from 'vue-resource';

Vue.use(iView);
Vue.use(Resocurce);
let app = new Vue({
  el: '#app',
  render: h => h(App),
});