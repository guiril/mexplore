import request from './request';

export default {
  getAuthUri() {
    return request.instance.get('login');
  },
  getClientToken() {
    return request.instance.get('client');
  },
  getAuthToken(code) {
    return request.instance.post('auth', {
      code,
    });
  },
  getRefreshToken(token) {
    return request.instance.post('refresh', {
      refresh_token: token,
    });
  },
};
