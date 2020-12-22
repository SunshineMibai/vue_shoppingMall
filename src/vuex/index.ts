import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import Common from './common/index.ts'

Vue.use(Vuex);

export default new Vuex.Store({
   
   modules: {
      Common
   },
   plugins: [createPersistedState()]  
});
