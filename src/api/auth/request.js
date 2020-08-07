import axios from 'axios';

// axioxs 實例
const instance = axios.create({
  baseURL: 'https://still-brushlands-48583.herokuapp.com/',
});

export default {
  instance,
};
