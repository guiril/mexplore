import request from './http';

export default {
  search(q, type, offset, limit) {
    return request.instance.get('search', {
      params: {
        q,
        type,
        offset,
        limit,
      },
    });
  },
};
