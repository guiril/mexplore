<template>
  <div class="u-fixed subModal">
    <h2 class="subModal__title u-text-center">
      新增至播放清單
    </h2>
    <ul class="list list--dark-bg u-px-15 u-scroll-y">
      <li
        v-for="item in usersPlaylists"
        :key="item.id"
        class="list__item"
      >
        <a
          href="#"
          class="list__link"
          @click.prevent="addToPlaylist(item)"
        >
          <img
            v-if="item.images[0]"
            :src="item.images[0].url"
            :alt="item.name"
            class="list__img"
          >
          <div class="list__body">
            <span class="list__title">
              {{ item.name }}
            </span>
            <span class="list__text">
              {{ item.tracks.total }} 首歌曲
            </span>
          </div>
        </a>
      </li>
    </ul>
    <div class="subModal__bottom">
      <button
        class="subModal__btn subModal__btn--new"
        @click="goCreatPlaylist"
      >
        新播放清單
      </button>
      <button
        class="subModal__btn subModal__btn--close"
        @click.prevent="closeTrackAddto"
      >
        取消
      </button>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <template v-if="isCreateAlertOpen">
        <div class="alert u-fixed">
          <div class="alert__dialog alert__dialog--top">
            <div class="alert__content">
              <div class="alert__header">
                <h3 class="alert__title">
                  建立新播放清單
                </h3>
                <p class="alert__text">
                  為新播放清單命名
                </p>
              </div>
              <div class="alert__body u-px-15">
                <input
                  v-model="newPlaylistName"
                  v-focus
                  type="text"
                  class="alert__input"
                  placeholder="播放清單名稱"
                >
              </div>
              <div class="alert__footer">
                <button
                  class="alert__btn"
                  @click="closeCreateAlert"
                >
                  取消
                </button>
                <button
                  class="alert__btn"
                  :class="{
                    'alert__btn--active': newPlaylistName
                  }"
                  :disabled="createDisabled"
                  @click="createPlaylist"
                >
                  建立
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition>
    <Backdrop v-if="isCreateAlertOpen" />
  </div>
</template>

<script>
import user from '@/api/user';
import playlists from '@/api/playlists';
import Backdrop from '@/components/Backdrop.vue';

export default {
  name: 'ModalAddTo',
  components: {
    Backdrop,
  },
  props: {
    track: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      id: '',
      playlists: [],
      isCreateAlertOpen: false,
      newPlaylistName: '',
      createDisabled: true,
    };
  },
  computed: {
    usersPlaylists() {
      const vm = this;
      const newAry = [];
      this.playlists.forEach((el) => {
        if (el.owner.id === vm.id) {
          newAry.push(el);
        }
      });
      return newAry;
    },
  },
  watch: {
    newPlaylistName(val) {
      if (val) {
        this.createDisabled = false;
      } else {
        this.createDisabled = true;
      }
    },
  },
  created() {
    this.getUser();
    this.getUserPlaylists();
  },
  methods: {
    async getUser() {
      try {
        const res = await user.getUser();
        this.id = res.data.id;
      } catch (e) {
        console.log(e);
      }
    },
    async getUserPlaylists() {
      try {
        // 取得收藏全部的播放清單
        // 再使用 computed 過濾
        // total
        const res = await playlists.getUserPlaylists();
        this.playlists = res.data.items;
      } catch (e) {
        console.log(e);
      }
    },
    async addToPlaylist(playlist) {
      // 要檢查歌曲是否存在於播放清單
      const { uri } = this.track;
      console.log(playlist);
      try {
        await playlists.addToPlaylist(playlist.id, uri);
        this.$bus.$emit('alertMessage', `已加入 ${playlist.name}`);
        this.closeTrackAddto();
      } catch (e) {
        console.log(e);
      }
    },
    closeTrackAddto() {
      this.$emit('closeTrackAddto');
    },
    goCreatPlaylist() {
      this.isCreateAlertOpen = true;
    },
    async createPlaylist() {
      if (!this.newPlaylistName) {
        return;
      }
      try {
        const res = await playlists.createPlaylist(this.id, this.newPlaylistName);
        const playlist = res.data;
        this.addToPlaylist(playlist);
        this.isCreateAlertOpen = false;
        // this.$bus.$emit('alertMessage', `已加入 ${this.newPlaylistName}`);
        // this.closeTrackAddto();
      } catch (e) {
        console.log(e);
      }
    },
    closeCreateAlert() {
      this.newPlaylistName = '';
      this.isCreateAlertOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.subModal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 16px;
  background-color: $base-dark-bg;
  .list {
    margin-bottom: 76px;
    flex-grow: 1;
  }
  &__title {
    margin-bottom: 65px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    color: $light-text;
    opacity: 0.9;
  }
  &__bottom {
    padding-right: 27px;
    padding-left: 27px;
  }
  &__btn {
    width: 100%;
    display: block;
    padding: 9px;
    font-size: 12px;
    color: $light-text;
    &--new {
      margin-bottom: 26px;
      font-weight: 600;
      line-height: 1.33;
      letter-spacing: 0.02px;
      background-color: $info-bg;
      border-radius: 22px;
    }
    &--close {
      font-weight: 500;
      line-height: 1.17;
      letter-spacing: 0.05px;
      opacity: 0.8;
    }
  }
}
</style>
