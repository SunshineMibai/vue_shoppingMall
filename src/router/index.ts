import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/vuex/index.ts'

import Home from './home';
import UserCenter from './user_center'
import ShopingCart from './shoping_cart'
import Product from './product'




const routes = [
  ...Home,
  ...UserCenter,
  ...ShopingCart,
  ...Product
];
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to: any, form: any, next: any) => {
  document.title = to.meta.title
  if (to.meta.isLogin) {
    if (store.state.Common.user_code == '') {
      next({
        path: '/UserLogin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router;
