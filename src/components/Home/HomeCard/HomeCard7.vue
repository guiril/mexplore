<template>
  <section class="u-mb-20">
    <h3 class="listTitle u-pl-15">
      熱播西洋歌曲
    </h3>
    <ul class="cardList u-scroll-x">
      <li
        v-for="(item, index) in filteredAmountOfTracks"
        :key="index"
        class="cardList__item"
      >
        <a
          :href="item.href"
          class="cardList__link u-d-block"
        >
          <img
            :src="item.images[0].url"
            :alt="item.name"
            class="cardList__img u-absolute-0"
          >
          <span class="cardList__title u-d-block u-text-ellipsis">
            {{ item.name }}
          </span>
          <span class="cardList__text u-d-block u-text-ellipsis">
            {{ item.artists | formatArtist }}
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import playlists from '@/api/playlists';
// import axios from 'axios';

export default {
  name: 'HomeCard7',
  data() {
    return {
      items: [],
    };
  },
  computed: {
    filteredAmountOfTracks() {
      // 前 12 首歌
      const newTracks = [];

      this.items.forEach((el, index) => {
        if (index < 12) {
          newTracks.push(el.track.album);
        }
      });

      return newTracks;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const vm = this;
      playlists.getPlaylist('37i9dQZEVXbMDoHDwVN2tF')
        .then((res) => {
          vm.items = res.data.tracks.items;
        });
      // axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF')
      //   .then((res) => {
      //     // console.log(res.data);
      //     vm.items = res.data.tracks.items;
      //   });
    },
  },
};
</script>
