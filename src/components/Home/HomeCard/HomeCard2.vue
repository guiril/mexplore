<template>
  <section class="u-mb-20">
    <h3 class="listTitle u-pl-15">
      放鬆一下，來點音樂
    </h3>
    <ul class="cardList u-scroll-x">
      <li
        v-for="item in items"
        :key="item.id"
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
        </a>
        <span class="cardList__title u-d-block u-text-ellipsis">
          {{ item.name }}
        </span>
        <span
          class="cardList__text cardList__text--lg u-d-block u-text-ellipsis--lg"
          v-html="item.description"
        >
          <!-- {{ item.description }} -->
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import browse from '@/api/browse';
// import axios from 'axios';
// import { Base64 } from 'js-base64';
// import qs from 'qs';

export default {
  name: 'HomeCard2',
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
      browse.getCategoriesLists('chill', 'TW', 12)
        .then((res) => {
          vm.items = res.data.playlists.items;
        });
      // axios.get('https://api.spotify.com/v1/browse/categories/chill/playlists', {
      //   params: {
      //     limit: 12,
      //     country: 'TW',
      //   },
      // })
      //   .then((res) => {
      //     // console.log(res.data);
      //     vm.items = res.data.playlists.items;
      //   });
    },
  },
};
</script>
