<template>
  <section class="u-mb-20">
    <h3 class="listTitle u-pl-15">
      最新發行歌曲
    </h3>
    <ul class="cardList cardList--lg u-scroll-x">
      <li
        v-for="(item, id) in items"
        :key="id"
        class="cardList__item"
      >
        <a
          :href="item.href"
          class="cardList__link u-d-block"
        >
          <img
            :src="item.images[0].url"
            alt=""
            class="cardList__img u-absolute-0"
          >
          <span class="cardList__title u-d-block u-text-ellipsis">{{ item.name }}</span>
          <span class="cardList__text u-d-block u-text-ellipsis">
            {{ item.artists | formatArtist }}
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
// import axios from 'axios';
import browse from '@/api/browse';
// import { Base64 } from 'js-base64';
// import qs from 'qs';

export default {
  name: 'HomeCard1',
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const vm = this;
      browse.getNewReleases('TW', 24)
        .then((res) => {
          // console.log(res.data.albums.items);
          vm.items = res.data.albums.items;
        });
    },
  },
};
</script>
