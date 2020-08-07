import request from './http';

export default {
  recentlyPlayed() {
    return request.instance.get('me/player/recently-played');
  },
};
