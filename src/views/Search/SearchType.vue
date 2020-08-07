<template>
  <div class="u-pb">
    <div class="searchTopbar">
      <button
        class="searchTopbar__btn u-d-block u-w-100"
        @click="gobackSearch"
      >
        <span class="searchTopbar__icon u-pl-15">></span>
        <span class="searchTopbar__text">在{{ type }}中搜尋「{{ q }}」</span>
      </button>
    </div>
    <ul class="list list--striped">
      <li
        v-for="item in items"
        :key="item.id"
        class="list__item u-px-15"
      >
        <a
          href="#"
          class="list__link"
        >
          <img
            v-if="dataType === 'tracks'"
            :src="item.album.images[0].url"
            :alt="item.name"
            class="list__img"
          >
          <img
            v-else
            :src="item.images[0].url"
            :alt="item.name"
            class="list__img"
            :class="{ 'list__img--border-circle': dataType === 'artists'}"
          >
          <div class="list__body">
            <span class="list__title u-d-block u-text-ellipsis">{{ item.name }}</span>
          </div>
          <span
            v-if="dataType === 'tracks'"
            class="list__btn"
          >
            ...
          </span>
          <span
            v-else
            class="list__btn"
          >
            >
          </span>

        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import search from '@/api/search';

export default {
  name: 'SearchType',
  data() {
    return {
      q: null,
      type: null,
      dataType: null,
      items: [],
    };
  },
  mounted() {
    const { type } = this.$route.params;
    switch (type) {
      case 'artist':
        this.type = '歌手';
        this.dataType = 'artists';
        break;
      case 'playlist':
        this.type = '播放清單';
        this.dataType = 'playlists';
        break;
      case 'album':
        this.type = '專輯';
        this.dataType = 'albums';
        break;
      case 'track':
        this.type = '歌曲';
        this.dataType = 'tracks';
        break;
      default:
        break;
    }
    this.q = this.$route.params.q;
    console.log(this.$route.params);
    this.getSearch();
  },
  methods: {
    gobackSearch() {
      this.$router.go(-1);
    },
    getSearch() {
      const vm = this;
      search.search(this.q, this.$route.params.type, 0, 10)
        .then((res) => {
          console.log(res.data[vm.dataType].items);
          vm.items = res.data[vm.dataType].items;
          // console.log(vm.dataType);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchTopbar {
  &__btn {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 12px;
    color: $base-dark-bg;
    @include clearfix;
  }
  &__icon {
    float: left;
  }
}
</style>
