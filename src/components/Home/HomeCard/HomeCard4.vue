<template>
  <section class="u-mb-20">
    <h3 class="listTitle u-pl-15">
      近期上架熱門歌曲
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
            :alt="item.name"
            class="cardList__img u-absolute-0"
          >
          <span class="cardList__title u-d-block u-text-ellipsis">
            {{ item.name }}
          </span>
          <span class="cardList__text u-d-block u-text-ellipsis--lg">
            {{ item.description }}
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import browse from '@/api/browse';
// import axios from 'axios';

export default {
  name: 'HomeCard4',
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
      browse.getCategoriesLists('toplists', 'TW', 6)
        .then((res) => {
          vm.items = res.data.playlists.items;
        });
      // axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
      //   params: {
      //     limit: 6,
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
