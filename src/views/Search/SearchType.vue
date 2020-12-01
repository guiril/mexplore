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
      <template v-if="dataType === 'tracks'">
        <li
          v-for="(item, index) in items"
          :key="item.id"
          class="list__item u-px-15"
        >
          <a
            href="#"
            class="list__link"
            @click.prevent="playtracks(index)"
          >
            <img
              :src="item.album.images[0].url"
              :alt="item.name"
              class="list__img"
            >
            <div class="list__body">
              <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            </div>
          </a>
          <button
            class="list__btn"
            @click.prevent="openTrackModal(item)"
          >
            ...
          </button>
        </li>
      </template>
      <template v-else>
        <li
          v-for="item in items"
          :key="item.id"
          class="list__item u-px-15"
        >
          <a
            href="javascript:void(0)"
            class="list__link"
          >
            <img
              :src="item.images[0].url"
              :alt="item.name"
              class="list__img"
              :class="{ 'list__img--border-circle': dataType === 'artists'}"
            >
            <div class="list__body">
              <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            </div>
            <span class="list__btn">
              >
            </span>
          </a>
        </li>
      </template>
    </ul>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp animate__fast"
      leave-active-class="animate__animated animate__fadeOutDown animate__fast"
    >
      <ModalTrack
        v-if="isModalTrackOpen"
        :track="track"
        @closeModal="closeTrackModal"
      />
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp animate__fast"
      leave-active-class="animate__animated animate__fadeOutDown animate__fast"
    >
      <ModalTrackAddto
        v-if="isModalTrackAddtoOpen"
        @closeTrackAddto="isModalTrackAddtoOpen = false"
      />
    </transition>
  </div>
</template>

<script>
import search from '@/api/search';
import ModalTrack from '@/components/Modal/ModalTrack.vue';
import ModalTrackAddto from '@/components/Modal/ModalTrackAddto.vue';

export default {
  name: 'SearchType',
  components: {
    ModalTrack,
    ModalTrackAddto,
  },
  data() {
    return {
      q: null,
      type: null,
      dataType: null,
      items: [],
      track: {},
      isModalTrackOpen: false,
      isModalTrackAddtoOpen: false,
    };
  },
  watch: {
    isModalTrackOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
    isModalTrackAddtoOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
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
    playtracks(index) {
      if (!this.items[index].preview_url) {
        console.log('無法試聽');
      } else {
        this.$store.dispatch('playquee/setPlayquee', this.items);
        this.$store.dispatch('playquee/setNowplaying', index);
        this.$store.dispatch('playquee/setPlayerStatus', 'playing');
      }
    },
    openTrackModal(item) {
      this.track = item;
      this.isModalTrackOpen = true;
    },
    closeTrackModal(emit) {
      this.isModalTrackAddtoOpen = emit;
      this.isModalTrackOpen = false;
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
