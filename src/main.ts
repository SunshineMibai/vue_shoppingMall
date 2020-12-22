

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex';
import '@/filters/common_filtter'

import FastClick from 'fastclick'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

import axios from '@/service'
import utils from '@/utils/index.ts'
import VConsole from 'vconsole';
import VueLazyload from 'vue-lazyload'
import jq from 'jquery'

import "@/assets/style/base.scss"
import '@/assets/style/cropper.css'

Vue.use(mandMobile);

Vue.use(VueLazyload, {
  preLoad: 2,
  error: require('@/assets/images/common/sorrow.png'),
  loading: require('@/assets/images/common/loading.jpg'),
  attempt: 1
})

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement: any) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}


(<any>window).utils = utils;
(<any>window).jQuery = jq;
(<any>window).$ = jq;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;



if ((<any>window).utils.globalConfig.isDebug || process.env.NODE_ENV == 'production') {
  new VConsole();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
