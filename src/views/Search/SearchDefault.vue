<template>
  <div class="content u-d-flex u-flex-column u-pb">
    <div class="u-d-flex u-justify-content-between u-align-items-stretch u-px-15">
      <div class="search">
        <div class="search__img" />
        <input
          v-model="searchText"
          v-focus
          type="text"
          class="search__input"
          placeholder="搜尋"
          @input="getSearch"
        >
        <button
          class="search__clearInput"
          @click="clearSearchText"
        />
      </div>
      <div class="close">
        <button class="close__btn u-text-center">
          取消
        </button>
      </div>
    </div>
    <SearchInit v-if="!searchText && searchHistory.length === 0" />
    <SearchHistory
      v-else-if="!searchText && searchHistory.length !== 0"
      :search-history="searchHistory"
      @clearSearchHistory="clearSearchHistory"
      @clearAllSearchHistory="clearAllSearchHistory"
    />
    <SearchAlert
      v-else-if="searchText && !isGetResults"
      :search-text="searchText"
    />
    <SearchResults
      v-else-if="searchText && isGetResults"
      :data="data"
      :search-text="searchText"
      @setSearchHistory="setSearchHistory"
      @playtracks="playtracks"
    />
  </div>
</template>

<script>
import search from '@/api/search';
import SearchInit from '@/components/Search/SearchInit.vue';
import SearchHistory from '@/components/Search/SearchHistory.vue';
import SearchAlert from '@/components/Search/SearchAlert.vue';
import SearchResults from '@/components/Search/SearchResults.vue';

export default {
  name: 'SearchDefault',
  components: {
    SearchInit,
    SearchHistory,
    SearchAlert,
    SearchResults,
  },
  data() {
    return {
      searchText: '',
      data: {
        albums: [],
        artists: [],
        playlists: [],
        tracks: [],
      },
      searchHistory: [],
      isGetResults: false,
    };
  },
  watch: {
    searchText(val) {
      if (!val) {
        this.data = {
          albums: [],
          artists: [],
          playlists: [],
          tracks: [],
        };
        this.isGetResults = false;
      }
    },
  },
  created() {
    this.getSearchHistory();
  },
  methods: {
    getSearch() {
      const vm = this;
      if (this.searchText) {
        search.search(this.searchText, 'album,artist,playlist,track', 0, 2)
          .then((res) => {
            console.log(res.data);
            if (res.data.albums.total === 0 && res.data.artists.total === 0
              && res.data.playlists.total === 0 && res.data.tracks.total === 0) {
              vm.isGetResults = false;
            } else {
              vm.isGetResults = true;
            }
            vm.data.albums = res.data.albums.items;
            vm.data.artists = res.data.artists.items;
            vm.data.playlists = res.data.playlists.items;
            vm.data.tracks = res.data.tracks.items;
          });
      }
    },
    clearSearchText() {
      this.searchText = '';
    },
    playtracks(index) {
      this.$store.dispatch('playquee/setPlayquee', [this.data.tracks[index]]);
      this.$store.dispatch('playquee/setNowplaying', 0);
    },
    setLocalStorage() {
      localStorage.setItem('search-history', JSON.stringify(this.searchHistory));
    },
    getSearchHistory() {
      const searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];
      this.searchHistory = searchHistory;
    },
    setSearchHistory(item) {
      const isExistence = this.searchHistory.some((el) => el.id === item.id);

      if (!isExistence) {
        this.searchHistory.push(item);
        this.setLocalStorage();
      }
    },
    clearSearchHistory(id) {
      const index = this.searchHistory.findIndex((el) => el.id === id);
      this.searchHistory.splice(index, 1);
      this.setLocalStorage();
    },
    clearAllSearchHistory() {
      this.searchHistory = [];
      this.setLocalStorage();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: calc(100% - 88px);
  padding-top: 20px;
}

.search {
  width: 100% * (248 / 290);
  position: relative;
  border-radius: 20px;
  &:before {
    width: 100%;
    height: 100%;
    content: '';
    @include absolute(0, 0, 0, 0);
    z-index: 1;
    background-color: rgba(19, 24, 44, 0.2);
    border-radius: 20px;
    opacity: 0.2;
  }
  &__img {
    width: 14px;
    height: 14px;
    @include absolute(calc((100% - 14px) / 2), null, null, 15px);
    background-color: #000;
  }
  &__input {
    width: 100%;
    position: relative;
    z-index: 2;
    padding: 5px 27px 5px 37px;
    font-size: 12px;
    font-weight: 100;
    color: $base-dark-bg;
    background-color: transparent;
    border-radius: 20px;
    caret-color: $info-text;
    &:focus {
      font-size: 12px;
    }
    &::placeholder {
      opacity: 0.8;
    }
  }
  &__clearInput {
    width: 14px;
    height: 14px;
    @include absolute(calc((100% - 14px) / 2), 7px, null, null,);
    z-index: 3;
    border-radius: 50%;
    background-color: #000;
  }
}

.close {
  width: 100% * (42 / 290);
  &__btn {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 100;
    letter-spacing: 0.2px;
    color: rgba(#13182c, .8);
  }
}

</style>
