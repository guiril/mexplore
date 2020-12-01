import axios from 'axios';

// axioxs 實例
const instance = axios.create({
  baseURL: process.env.VUE_APP_AUTH_BASE_URL,
});

export default {
  instance,
};
