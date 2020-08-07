import request from './http';

export default {
  getFollowedArtists(limit) {
    return request.instance.get('me/following', {
      params: {
        type: 'artist',
        limit,
      },
    });
  },
  unfollowArtists(ids) {
    return request.instance.delete('me/following', {
      params: {
        type: 'artist',
        ids,
      },
    });
  },
};
