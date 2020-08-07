import axios from 'axios';
import store from '@/store';

// axioxs 實例
const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    'content-type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // config 是正在發送的請求
  const token = store.state.auth.accessToken;
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return config;
}, (error) => {
  console.log(error);
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => response,
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const statusCode = error.response.status;
    const { refreshToken } = store.state.auth;

    if (statusCode === 401) {
      instance.defaults.headers.common.Authorization = '';
      if (refreshToken) {
        await store.dispatch('auth/refreshToken', refreshToken);
      } else {
        await store.dispatch('auth/setClientToken');
      }
      const token = store.state.auth.accessToken;

      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance(error.config);
    }
    return Promise.reject(error);
  });

export default {
  instance,
};
