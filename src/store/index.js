import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';
import playquee from './modules/playquee';
import library from './modules/library';

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: 'spotify_app_state',
  reducer: (state) => ({
    auth: state.auth,
  }),
});

export default new Vuex.Store({
  state: {
    isModalShow: false,
  },
  mutations: {
    SET_MODAL(state, payload) {
      state.isModalShow = payload;
    },
  },
  actions: {
    setModalStatus(context, status) {
      context.commit('SET_MODAL', status);
    },
  },
  modules: {
    auth,
    playquee,
    library,
  },
  plugins: [
    persistedState,
  ],
});
