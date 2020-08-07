<template>
  <div class="u-bg-second-light u-h-min-100">
    <TheHeader />
    <template v-if="!$store.state.auth.refreshToken">
      <div>
        未登入
      </div>
    </template>
    <template v-if="$store.state.auth.refreshToken">
      <!-- 點擊搜尋框，隱藏頁籤，效果有點奇怪先拿掉 -->
      <MyNavbar
        :active-class="myNavbarActive"
        @active="changeMyNavbar"
      />
      <main
        class="content"
        :class="{
          'u-pb-lg': $store.state.playquee.playerStatus !== 'stop'
        }"
      >
        <!-- search 框 -->
        <div
          class="u-d-flex u-justify-content-between u-align-items-stretch
          u-px-15 u-mt-20 u-mb-21"
        >
          <div class="search">
            <div class="search__img" />
            <input
              v-model="filterText"
              type="text"
              class="search__input"
              :placeholder="`在${searchPlaceholder}中尋找`"
              @focus="handleFocus"
              @focusout="handleFocusOut"
            >
          </div>
          <div class="close">
            <button
              class="close__btn u-text-center"
              @click.prevent="cancelSearch"
            >
              取消
            </button>
          </div>
        </div>
        <transition
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <component
            :is="myNavbarActive"
            :filter-text="filterText"
          />
        </transition>
      </main>
    </template>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import MyNavbar from '@/components/MyMusic/MyNavbar.vue';
import MyRecently from '@/components/MyMusic/MyRecently.vue';
import MyTracks from '@/components/MyMusic/MyTracks.vue';
import MyAlbums from '@/components/MyMusic/MyAlbums.vue';
import MyArtists from '@/components/MyMusic/MyArtists.vue';

export default {
  name: 'MyMusic',
  components: {
    TheHeader,
    MyNavbar,
    MyRecently,
    MyTracks,
    MyAlbums,
    MyArtists,
  },
  data() {
    return {
      items: [],
      myNavbarActive: 'MyRecently',
      isFocusOnSearch: false,
      filterText: '',
      isTrackModalShow: false,
      isAddPlaylistShow: false,
    };
  },
  computed: {
    searchPlaceholder() {
      let str = '';

      switch (this.myNavbarActive) {
        case 'MyRecently':
          str = '最近播放';
          break;
        case 'MyTracks':
          str = '我的最愛';
          break;
        case 'MyAlbums':
          str = '收藏專輯';
          break;
        case 'MyArtists':
          str = '關注歌手';
          break;
        default:
          break;
      }

      return str;
    },
  },
  methods: {
    handleFocus() {
      this.isFocusOnSearch = true;
    },
    handleFocusOut() {
      this.isFocusOnSearch = false;
    },
    cancelSearch() {
      this.filterText = '';
    },
    changeMyNavbar(item) {
      this.myNavbarActive = item;
      this.filterText = '';
    },
  },
};
</script>

<style lang="scss" scoped>
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
    padding: 5px 37px;
    font-size: 12px;
    font-weight: 100;
    color: $base-dark-bg;
    background-color: transparent;
    border-radius: 20px;
    caret-color: $info-text;
    &::placeholder {
      opacity: 0.8;
    }
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
