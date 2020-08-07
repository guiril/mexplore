<template>
  <div>
    <ul class="list">
      <li
        v-for="(item, index) in tracks.items"
        :key="index"
        class="list__item u-px-15"
      >
        <a
          href="#"
          class="list__link"
          @click.prevent="playtracks(index)"
        >
          <img
            :src="item.track.album.images[0].url"
            :alt="item.track.album.name"
            class="list__img list__img--border-sm"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">
              {{ item.track.name }}
            </span>
            <span class="list__text u-text-ellipsis">
              {{ item.track.artists | formatArtist }}
            </span>
          </div>
        </a>
        <button
          class="list__btn list__btn--circle"
          @click="openTrackModal(item.track)"
        >
          ...
        </button>
      </li>
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
import player from '@/api/player';
import ModalTrack from '../Modal/ModalTrack.vue';
import ModalTrackAddto from '../Modal/ModalTrackAddto.vue';

export default {
  name: 'MyRecently',
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
      tracks: {
        items: [],
      },
      track: {},
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
  },
  watch: {
    isModalTrackOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
    isModalTrackAddtoOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
  },
  created() {
    this.getCurrentlyPlayed();
  },
  methods: {
    async getCurrentlyPlayed() {
      try {
        const res = await player.recentlyPlayed();
        this.tracks.items = res.data.items;
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
