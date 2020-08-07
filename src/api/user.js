import request from './http';

export default {
  getUser() {
    return request.instance.get('me');
  },
};
