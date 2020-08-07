const state = {
  playerStatus: 'stop',
  playqueeList: [],
  currentIndex: null,
  lastIndex: null,
};

const getters = {
  nowplayingTrack: (state) => state.playqueeList[state.currentIndex],
  prevIndex: (state) => ((state.currentIndex === 0)
    ? state.lastIndex : state.currentIndex - 1),
  nextIndex: (state) => ((state.currentIndex === state.lastIndex)
    ? 0 : state.currentIndex + 1),
};

const mutations = {
  SET_PLAYER_STATUS(state, status) {
    state.playerStatus = status;
  },
  SET_PLAYQUEE(state, list) {
    state.playqueeList = list;
  },
  SET_LAST_INDEX(state, index) {
    state.lastIndex = index;
  },
  SET_NOWPLAYING(state, index) {
    state.currentIndex = index;
  },
};

const actions = {
  setPlayerStatus(context, status) {
    context.commit('SET_PLAYER_STATUS', status);
  },
  setPlayquee(context, tracks) {
    context.commit('SET_PLAYQUEE', tracks);
    context.commit('SET_LAST_INDEX', tracks.length - 1);
  },
  setNowplaying(context, index) {
    context.commit('SET_NOWPLAYING', index);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
