import request from './http';

export default {
  getNewReleases(country, limit) {
    return request.instance.get('browse/new-releases', {
      params: {
        country,
        limit,
      },
    });
  },
  getCategoriesLists(category, country, limit) {
    return request.instance.get(`browse/categories/${category}/playlists`, {
      params: {
        country,
        limit,
      },
    });
  },
  getFeaturedPlaylists(country, limit) {
    return request.instance.get('browse/featured-playlists', {
      params: {
        country,
        limit,
      },
    });
  },
};
