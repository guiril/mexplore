// import axios from 'axios';
// import { Base64 } from 'js-base64';
// import qs from 'qs';

import auth from '@/api/auth';
// import router from '../../router';
// import Cookies from 'js-cookie';

// const credential = Base64.encode(
//   `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`,
// );

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

      // const RequestBody = auth.type === 'client' ? qs.stringify({
      //   grant_type: 'client_credentials',
      // }) : qs.stringify({
      //   grant_type: 'authorization_code',
      //   code: auth.code,
      //   redirect_uri: process.env.VUE_APP_REDIRECT_URI,
      // });

      // const res = await axios({
      //   method: 'POST',
      //   url: 'https://accounts.spotify.com/api/token',
      //   data: RequestBody,
      //   headers: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //     Authorization: `Basic ${credential}`,
      //   },
      // });

      // const res = await axios.post('https://accounts.spotify.com/api/token', RequestBody, {
      //   headers: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //     Authorization: `Basic ${credential}`,
      //   },
      // });
    } catch (e) {
      console.log(e);
    }
  },
  setAuthToken(context, data) {
    console.log(data);
    context.commit('SET_ACCESS_TOKEN', data.access_token);
    context.commit('SET_REFRESH_TOKEN', data.refresh_token);
    context.commit('SET_EXPIRY_TIME', data.expiry_in);
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
