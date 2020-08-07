<template>
  <nav class="musicNav u-px-15">
    <ul class="musicNavList">
      <li
        class="musicNavList__item"
        :class="{ 'musicNavList__item--active': activeClass === 'MyRecently' }"
        @click.prevent="$emit('active', 'MyRecently')"
      >
        <a
          href="#"
          class="musicNavList__link u-d-block"
        >
          最近播放
        </a>
      </li>
      <li
        class="musicNavList__item"
        :class="{ 'musicNavList__item--active': activeClass === 'MyTracks' }"
        @click.prevent="$emit('active', 'MyTracks')"
      >
        <a
          href="#"
          class="musicNavList__link u-d-block"
        >
          我的最愛
        </a>
      </li>
      <li
        class="musicNavList__item"
        :class="{ 'musicNavList__item--active': activeClass === 'MyAlbums' }"
        @click.prevent="$emit('active', 'MyAlbums')"
      >
        <a
          href="#"
          class="musicNavList__link u-d-block"
        >
          收藏專輯
        </a>
      </li>
      <li
        class="musicNavList__item"
        :class="{ 'musicNavList__item--active': activeClass === 'MyArtists' }"
        @click.prevent="$emit('active', 'MyArtists')"
      >
        <a
          href="#"
          class="musicNavList__link u-d-block"
        >
          關注歌手
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MyNavbar',
  props: {
    activeClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.musicNav {
  margin-top: 18px;
}

.musicNavList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__item {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.17;
    color: rgba($base-dark-bg, .8);
    border-radius: 4px;
    border: 0.6px solid transparent;
    &--active {
      color: $info-text;
      border-color: $info-text;
    }
  }
  &__link {
    padding: 7px;
  }
}
</style>
