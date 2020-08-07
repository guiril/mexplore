<template>
  <nav class="navbar u-fixed-bottom">
    <ul class="navbarMenu">
      <router-link
        class="navbarMenu__item"
        tag="li"
        to="/"
        exact
      >
        <a
          class="navbarMenu__link"
          href="javascript:void(0)"
        >
          <img
            src="../assets/images/nav-home.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--normal"
          >
          <img
            src="../assets/images/nav-home-active.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--active"
          >
          <span class="navbarMenu__text">首頁</span>
        </a>
      </router-link>
      <router-link
        class="navbarMenu__item"
        tag="li"
        to="/search"
      >
        <a
          class="navbarMenu__link"
          href="javascript:void(0)"
        >
          <img
            src="../assets/images/nav-search.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--normal"
          >
          <img
            src="../assets/images/nav-search-active.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--active"
          >
          <span class="navbarMenu__text">搜尋</span>
        </a>
      </router-link>
      <router-link
        class="navbarMenu__item"
        tag="li"
        to="/my-music"
      >
        <a
          to="my-music"
          class="navbarMenu__link"
          href="javascript:void(0)"
        >
          <img
            src="../assets/images/nav-mymusic.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--normal"
          >
          <img
            src="../assets/images/nav-mymusic-active.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--active"
          >
          <span class="navbarMenu__text">我的音樂</span>
        </a>
      </router-link>
      <router-link
        class="navbarMenu__item"
        tag="li"
        to="/playlist"
      >
        <a
          to="playlist"
          class="navbarMenu__link"
          href="javascript:void(0)"
        >
          <img
            src="../assets/images/nav-playlist.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--normal"
          >
          <img
            src="../assets/images/nav-playlist-active.svg"
            alt=""
            class="navbarMenu__img navbarMenu__img--active"
          >
          <span class="navbarMenu__text">播放清單</span>
        </a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      navbarStatus: '',
    };
  },
  methods: {
    isActive(item) {
      this.navbarStatus = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  // height: 64px;
  height: 73px;
  background: $base-dark-bg;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
}

.navbarMenu {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__item {
    height: 100%;
    flex: 1;
    &:active,
    &--active {
      .navbarMenu__text {
        color: $info-text;
      }
      .navbarMenu__img--normal {
        display: none;
      }
      .navbarMenu__img--active {
        display: initial;
      }
    }
  }
  &__link {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
  }
  &__img {
    width: 18px;
    margin-bottom: 4px;
    &--active {
      display: none;
    }
  }
  &__text {
    font-size: 8px;
    // font-family: 'Roboto', sans-serif;
    font-weight: 300;
    line-height: 1.25;
    letter-spacing: 0.03px;
    color: rgba($light-text, .6);
  }
}
</style>
