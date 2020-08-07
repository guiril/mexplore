<template>
  <div>
    <ul class="searchResultsList">
      <li
        v-for="(item, index) in filteredTracks"
        :key="index"
        class="list__item u-px-15"
      >
        <a
          href="#"
          class="list__link"
          @click.prevent="playtracks(index)"
        >
          <img
            :src="item.album.images[0].url"
            :alt="item.album.name"
            class="list__img list__img--border-sm"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">
              {{ item.name }}
            </span>
            <span class="list__text u-text-ellipsis">
              {{ item.artists | formatArtist }}
            </span>
          </div>
        </a>
        <button
          class="list__btn"
          @click.prevent="openTrackModal(item)"
        >
          ...
        </button>
      </li>
      <!-- <loading
        :active.sync="isLoading"
        :is-full-page="fullpage"
      /> -->
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
        :track="track"
        @closeTrackAddto="isModalTrackAddtoOpen = false"
      />
    </transition>
  </div>
</template>

<script>
import library from '@/api/library';
import ModalTrack from '../Modal/ModalTrack.vue';
import ModalTrackAddto from '../Modal/ModalTrackAddto.vue';

export default {
  name: 'MyTracks',
  components: {
    ModalTrack,
    ModalTrackAddto,
  },
  props: {
    filterText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bottom: false,
      tracks: {
        items: [],
        limit: 10,
        offset: 0,
        total: 1,
      },
      isTracksMore: null,
      track: {},
      isLoading: false,
      fullpage: false,
      isModalTrackOpen: false,
      isModalTrackAddtoOpen: false,
    };
  },
  computed: {
    tracksAry() {
      const array = [];
      this.tracks.items.forEach((el) => {
        array.push(el.track);
      });
      return array;
    },
    filteredTracks() {
      const vm = this;
      let array = [];
      if (!this.filterText) {
        array = this.tracksAry;
      } else {
      // track name 或 artists 陣列裡面的 name 符合字串
        array = this.tracksAry.filter((el) => el.name.toLowerCase()
          .match(vm.filterText.toLowerCase()));
        // array = this.tracksAry.filter((el) => el.name.toLowerCase()
        //   .match(vm.filterText.toLowerCase()));
      }
      return array;
    },
  },
  watch: {
    isModalOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
    isAddModalOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
    bottom(val) {
      if (val) {
        this.getTracks();
      }
    },
  },
  created() {
    this.getTracks();
    // console.log(this.$route.path);
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    async getTracks() {
      try {
        if (this.tracks.offset < this.tracks.total) {
          // this.isLoading = true;
          const res = await library.getTracks(this.tracks.limit, this.tracks.offset);
          // console.log(res);
          // this.isLoading = false;
          this.tracks.items.push(...res.data.items);
          this.tracks.offset += this.tracks.limit;
          this.tracks.total = res.data.total;
          // this.more = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    playtracks(index) {
      if (!this.tracksAry[index].preview_url) {
        console.log('無法試聽');
      } else {
        this.$store.dispatch('playquee/setPlayquee', this.tracksAry);
        this.$store.dispatch('playquee/setNowplaying', index);
        this.$store.dispatch('playquee/setPlayerStatus', 'playing');
      }
    },
    bottomVisible() {
      const { scrollY } = window; // viewport（視圖）最上方的 Y 座標
      const visible = document.documentElement.clientHeight; // 元素的內部高度，包含 padding
      const pageHeight = document.documentElement.scrollHeight; // 元素內容的高度，包含不可見的部分
      const bottomOfPage = visible + scrollY >= pageHeight;
      // console.log(visible + scrollY, pageHeight);
      return bottomOfPage;
      // return bottomOfPage || pageHeight < visible;
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
