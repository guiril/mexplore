<template>
  <div>
    <div class="searchTitle u-pl-15">
      <h2 class="searchTitle__text">
        最近的搜尋
      </h2>
    </div>
    <ul class="list">
      <li
        v-for="item in searchHistory"
        :key="item.id"
        class="list__item u-px-15"
      >
        <a
          href="javascript:void(0)"
          class="list__link"
        >
          <img
            v-if="item.type === 'track' && item.album.images"
            :src="item.album.images[0].url"
            alt=""
            class="list__img"
          >
          <img
            v-else-if="item.images"
            :src="item.images[0].url"
            alt=""
            class="list__img"
            :class="{ 'u-border-circle': item.type === 'artist' }"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            <span
              v-if="item.type === 'track'"
              class="list__text"
            >
              {{ item.artists | formatArtist }}
            </span>
            <span
              v-else-if="item.type === 'artist'"
              class="list__text"
            >
              歌手
            </span>
            <span
              v-else-if="item.type === 'album'"
              class="list__text"
            >
              專輯
            </span>
            <span
              v-else-if="item.type === 'playlist'"
              class="list__text"
            >
              播放清單
            </span>
          </div>
          <button
            class="list__btn"
            @click.prevent="$emit('clearSearchHistory', item.id);"
          >
            X
          </button>
        </a>
      </li>
    </ul>
    <div class="searchClear u-text-center">
      <button
        class="searchClear__btn"
        @click.prevent="$emit('clearAllSearchHistory')"
      >
        清除最近的搜尋內容
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.searchTitle {
  margin-top: 24px;
  margin-bottom: 11px;
  &__text {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.14;
    color: $info-text;
  }
}

.searchClear {
  margin-top: 16px;
  &__btn {
    width: 132px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 9px;
    line-height: 1.33;
    color: rgba($info-text, .9);
    border: 1px solid rgba($info-text, .6);
    border-radius: 20px;
  }
}
</style>
