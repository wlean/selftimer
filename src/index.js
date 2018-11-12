'use strict';

import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Resocurce from 'vue-resource';
import selftimer from './lib/selftimer.js';

Vue.use(iView);
Vue.use(Resocurce);
Vue.use(selftimer);
import App from './app.vue';
let app = new Vue({
  el: '#app',
  render: h => h(App),
});
window.selftimer = app;
window.lala = {
  map:{},
  on(name, listener){
    if(typeof listener !== 'function') return;
    if(this.map[name]) return this.map[name].push(listener);
    this.map[name] = [listener];
  },
  emit(name, ...args){
    if(!this.map[name] || this.map[name].length == 0) return;
    [].forEach((fn)=>{
      fn(...args);
    });
  }
}