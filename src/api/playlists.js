import request from './http';

export default {
  addToPlaylist(id, uris) {
    return request.instance.post(`playlists/${id}/tracks`, null, {
      params: {
        uris,
      },
    });
  },
  createPlaylist(userId, name) {
    return request.instance.post(`users/${userId}/playlists`, {
      name,
      public: false,
    });
  },
  getPlaylist(id) {
    return request.instance.get(`playlists/${id}`);
  },
  getUserPlaylists(limit, offset) {
    return request.instance.get('me/playlists', {
      params: {
        limit,
        offset,
      },
    });
  },
};
