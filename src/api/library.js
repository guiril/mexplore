import request from './http';

export default {
  getTracks(limit, offset) {
    return request.instance.get('me/tracks', {
      params: {
        limit,
        offset,
      },
    });
  },
  getAlbums(limit, offset) {
    return request.instance.get('me/albums', {
      params: {
        limit,
        offset,
      },
    });
  },
  removeAlbums(ids) {
    return request.instance.delete('me/albums', {
      params: {
        ids,
      },
    });
  },
};
