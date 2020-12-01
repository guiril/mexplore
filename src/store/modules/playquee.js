const state = {
  playerStatus: 'stop',
  playqueeList: [],
  nowPlayingTrack: {
    id: null,
    index: null,
  },
  currentId: null,
  currentIndex: null,
  lastIndex: null,
};

const getters = {
  // nowplayingTrack: (state) => state.playqueeList[state.currentIndex],
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
  SET_NOW_PLAYING(state, track) {
    state.nowPlayingTrack = {
      id: track.id,
      index: track.index,
    };
  },
  // SET_NOWPLAYING(state, track) {
  //   state.currentId = track.id;
  //   state.currentIndex = track.index;
  // },
};

const actions = {
  setPlayerStatus(context, status) {
    context.commit('SET_PLAYER_STATUS', status);
  },
  setPlayquee(context, tracks) {
    context.commit('SET_PLAYQUEE', tracks);
    context.commit('SET_LAST_INDEX', tracks.length - 1);
  },
  setNowPlaying(context, track) {
    console.log(track, state.nowPlayingTrack);
    context.commit('SET_NOW_PLAYING', track);
  },
  // setNowplaying(context, track) {
  //   // 如果點擊同一首歌曲：
  //   // 目前正在播放 => 暫停
  //   // 目前暫停播放 => 繼續播放
  //   if (track.id === state.currentId) {
  //     if (state.playerStatus === 'playing') {
  //       context.commit('SET_PLAYER_STATUS', 'pause');
  //     } else if (state.playerStatus === 'pause') {
  //       context.commit('SET_PLAYER_STATUS', 'playing');
  //     }
  //   } else {
  //     context.commit('SET_NOWPLAYING', track);
  //   }
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
