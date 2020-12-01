import auth from '@/api/auth';

const state = {
  isLoggedin: false,
  accessToken: '',
  refreshToken: '',
  expiryTime: '',
};

const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  },
  SET_REFRESH_TOKEN(state, token) {
    state.refreshToken = token;
  },
  SET_EXPIRY_TIME(state, time) {
    state.expiryTime = time;
  },
};

const actions = {
  async setClientToken(context) {
    try {
      const res = await auth.getClientToken();
      const token = res.data.access_token;
      const expiryTime = res.data.expires_in;

      // console.log(res.data);

      context.commit('SET_ACCESS_TOKEN', token);
      context.commit('SET_EXPIRY_TIME', expiryTime);
    } catch (e) {
      console.log(e);
    }
  },
  setAuthToken(context, data) {
    console.log(data);
    context.commit('SET_ACCESS_TOKEN', data.accessToken);
    context.commit('SET_REFRESH_TOKEN', data.refreshToken);
    context.commit('SET_EXPIRY_TIME', data.expiryIn);
  },
  async refreshToken(context, refreshToken) {
    try {
      const res = await auth.getRefreshToken(refreshToken);
      const token = res.data.access_token;
      const expiryTime = res.data.expires_in;

      context.commit('SET_ACCESS_TOKEN', token);
      context.commit('SET_EXPIRY_TIME', expiryTime);
    } catch (e) {
      console.log(e);
    }
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
