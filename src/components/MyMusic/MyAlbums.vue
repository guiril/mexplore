<template>
  <div>
    <ul class="list">
      <li
        v-for="item in items"
        :key="item.album.id"
        class="list__item u-px-15"
      >
        <a
          href="javascript:void(0)"
          class="list__link list__link--pr"
        >
          <img
            :src="item.album.images[0].url"
            :alt="item.album.name"
            class="list__img"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">
              {{ item.album.name }}
            </span>
            <span class="list__text u-text-ellipsis">
              {{ item.album.artists | formatArtist }}
            </span>
          </div>
        </a>
        <button
          class="list__btn list__btn--txt"
          :class="{
            'list__btn--txt--active': item.album.id === removeItem.id
          }"
          @click="removeAlbum(item.album)"
        >
          <span v-if="removeItem && item.album.id !== removeItem.id">收藏中</span>
          <span v-else>取消收藏</span>
        </button>
      </li>
    </ul>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <template v-if="removeItem.name">
        <div class="alert u-fixed">
          <div class="alert__dialog">
            <div class="alert__content">
              <div class="alert__header">
                <h3 class="alert__title">
                  取消收藏專輯
                </h3>
                <p class="alert__text">
                  確定要從收藏專輯中取消收藏<br>{{ removeItem.name }} 這張專輯嗎？
                </p>
              </div>
              <div class="alert__footer">
                <button
                  class="alert__btn"
                  @click="confirmRemove(false)"
                >
                  繼續收藏
                </button>
                <button
                  class="alert__btn alert__btn--active"
                  @click="confirmRemove(true)"
                >
                  取消收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition>
    <Backdrop
      v-if="removeItem.name"
    />
  </div>
</template>

<script>
import Backdrop from '@/components/Backdrop.vue';
import library from '@/api/library';

export default {
  name: 'MyAlbums',
  components: {
    Backdrop,
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
      items: [],
      removeItem: {},
    };
  },
  watch: {
    bottom(val) {
      if (val) {
        this.getAlbums();
      }
    },
  },
  created() {
    this.getAlbums();
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    async getAlbums() {
      try {
        const res = await library.getAlbums(20, 0);
        this.items = res.data.items;
      } catch (e) {
        console.log(e);
      }
    },
    async removeAlbums(ids) {
      try {
        await library.removeAlbums(ids);
        this.removeItem = {};
        this.getAlbums(); // 消失動畫
      } catch (e) {
        console.log(e);
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
    removeAlbum(item) {
      this.removeItem = item;
    },
    confirmRemove(isRemove) {
      if (!isRemove) {
        this.removeItem = {};
      } else {
        this.removeAlbums(this.removeItem.id);
      }
    },
  },
};
</script>
