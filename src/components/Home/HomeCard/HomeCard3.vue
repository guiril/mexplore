<template>
  <section class="u-mb-20">
    <h3 class="listTitle u-pl-15">
      熱門排行榜
    </h3>
    <ul class="singleList u-scroll-x">
      <li
        v-for="(item, index) in filteredAmountOfTracks"
        :key="item.id"
        class="singleList__item"
        @click.prevent="playtracks(index)"
      >
        <div class="singleList__left">
          <span class="singleList__order u-d-block">{{ index + 1 }}</span>
        </div>
        <div class="singleList__center">
          <img
            :src="item.album.images[0].url"
            alt=""
            class="singleList__img"
          >
        </div>
        <div class="singleList__right">
          <span class="singleList__title u-d-block u-text-ellipsis">
            {{ item.name }}
          </span>
          <span class="singleList__text u-d-block u-text-ellipsis">
            {{ item.artists | formatArtist }}
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import playlists from '@/api/playlists';
// import axios from 'axios';

export default {
  name: 'HomeCard3',
  data() {
    return {
      items: [],
    };
  },
  computed: {
    filteredAmountOfTracks() {
      // 隨機選 12 首歌
      // const originAry = this.items;
      // const copyOrigAry = originAry.map((el) => el);

      // const newTracks = [];

      // for (let i = copyOrigAry.length - 1; i > 0; i -= 1) {
      //   const j = Math.floor(Math.random() * (i + 1));
      //   [copyOrigAry[i], copyOrigAry[j]] = [copyOrigAry[j], copyOrigAry[i]];
      // }

      // copyOrigAry.forEach((el, index) => {
      //   if (index < 12) {
      //     newTracks.push(el.track);
      //   }
      // });

      // 前 12 首歌
      const newTracks = [];

      this.items.forEach((el, index) => {
        if (index < 12) {
          newTracks.push(el.track);
        }
      });

      return newTracks;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        const res = await playlists.getPlaylist('37i9dQZEVXbMnZEatlMSiu');
        this.items = res.data.tracks.items;
      } catch (e) {
        console.log(e);
      }
    },
    playtracks(index) {
      if (!this.items[index].track.preview_url) {
        console.log('無法試聽');
      } else {
        this.$store.dispatch('playquee/setPlayquee', this.filteredAmountOfTracks);
        this.$store.dispatch('playquee/setNowplaying', index);
        this.$store.dispatch('playquee/setPlayerStatus', 'playing');
      }
    },
  },
};
</script>
