import Vue from 'vue';

import { Commit } from 'vuex';

import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user_code: '',
  selected_list: [],
  productItem: {},
  shop_cart_num: 0,
  page_list: []
}

const types = {
  SETPRODUCTITEM: 'SETPRODUCTITEM',
  SETSHOPCARTNUM: 'SETSHOPCARTNUM',
  SETPAGELIST: 'SETPAGELIST',
  ACT_SETSHOPCARTNUM: 'ACT_SETSHOPCARTNUM'
}

const mutations = {
  SET_USERCODE(state: object, code: string) {
    state.user_code = code
  },
  SET_SELECTEDLIST(state: object, list: object) {
    state.selected_list = list
  },
  DEL_SELECTEDLIST(state: object, list: object) {
    state.selected_list = list
  },
  [types.SETPRODUCTITEM](state: object, item: object) {
    state.productItem = item
  },
  [types.SETSHOPCARTNUM](state: object, num: number) {
    state.shop_cart_num = num
  },
  [types.SETPAGELIST](state: object, list: object) {
    state.page_list = list
  }
}

const actions = {
  [types.ACT_SETSHOPCARTNUM](context: { commit: Commit }, num: number) {
    context.commit('SETSHOPCARTNUM', num);
  },
}


export default {
  state,
  mutations,
  actions,
  modules: {
  },
};
