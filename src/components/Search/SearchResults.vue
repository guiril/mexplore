<template>
  <div class="u-pt">
    <ul class="list list--striped">
      <!-- artists -->
      <li
        v-for="item in data.artists"
        :key="item.id"
        class="list__item u-px-15"
        @click.prevent="$emit('set-search-history', item)"
      >
        <a
          href="javascript:void(0)"
          class="list__link"
        >
          <img
            v-if="item.images[0]"
            :src="item.images[0].url"
            :alt="item.name"
            class="list__img list__img--border-circle"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            <span class="list__text">歌手</span>
          </div>
          <span class="list__btn">
            >
          </span>
        </a>
      </li>
      <!-- albums -->
      <li
        v-for="item in data.albums"
        :key="item.id"
        class="list__item u-px-15"
        @click.prevent="$emit('set-search-history', item)"
      >
        <a
          href="javascript:void(0)"
          class="list__link"
        >
          <img
            v-if="item.images[0]"
            :src="item.images[0].url"
            :alt="item.name"
            class="list__img"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            <span class="list__text">專輯</span>
          </div>
          <span class="list__btn">
            >
          </span>
        </a>
      </li>
      <!-- playlists -->
      <li
        v-for="item in data.playlists"
        :key="item.id"
        class="list__item u-px-15"
        @click.prevent="$emit('set-search-history', item)"
      >
        <a
          href="javascript:void(0)"
          class="list__link"
        >
          <img
            v-if="item.images[0]"
            :src="item.images[0].url"
            :alt="item.name"
            class="list__img"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            <span class="list__text">播放清單</span>
          </div>
          <span class="list__btn">
            >
          </span>
        </a>
      </li>
      <!-- tracks -->
      <li
        v-for="(item, index) in data.tracks"
        :key="item.id"
        class="list__item u-px-15"
        @click.prevent="$emit('set-search-history', item)"
      >
        <a
          href="#"
          class="list__link"
          @click.prevent="$emit('playtracks', index)"
        >
          <img
            v-if="item.album.images[0]"
            :src="item.album.images[0].url"
            :alt="item.name"
            class="list__img"
          >
          <div class="list__body">
            <span class="list__title u-text-ellipsis">{{ item.name }}</span>
            <span class="list__text">歌曲‧{{ item.artists | formatArtist }}</span>
          </div>
        </a>
        <button
          class="list__btn"
          @click.prevent="openTrackModal(item)"
        >
          ...
        </button>
      </li>
    </ul>
    <!-- more -->
    <ul class="list">
      <li class="list__item u-px-15">
        <router-link
          :to="{
            name: 'SearchType',
            params: { q: searchText, type: 'artist' }
          }"
          class="list__link"
        >
          <div class="list__body">
            檢視所有歌手
          </div>
          <span class="list__btn">
            >
          </span>
        </router-link>
      </li>
      <li class="list__item u-px-15">
        <router-link
          :to="{
            name: 'SearchType',
            params: { q: searchText, type: 'playlist' }
          }"
          class="list__link"
        >
          <div class="list__body">
            檢視所有播放清單
          </div>
          <span class="list__btn">
            >
          </span>
        </router-link>
      </li>
      <li class="list__item u-px-15">
        <router-link
          :to="{
            name: 'SearchType',
            params: { q: searchText, type: 'album' }
          }"
          class="list__link"
        >
          <div class="list__body">
            檢視所有專輯
          </div>
          <span class="list__btn">
            >
          </span>
        </router-link>
      </li>
      <li class="list__item u-px-15">
        <router-link
          :to="{
            name: 'SearchType',
            params: { q: searchText, type: 'track' }
          }"
          class="list__link"
        >
          <div class="list__body">
            檢視所有歌曲
          </div>
          <span class="list__btn">
            >
          </span>
        </router-link>
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
        @closeTrackAddto="isModalTrackAddtoOpen = false"
      />
    </transition>
  </div>
</template>

<script>
import ModalTrack from '../Modal/ModalTrack.vue';
import ModalTrackAddto from '../Modal/ModalTrackAddto.vue';

export default {
  name: 'SearchResults',
  components: {
    ModalTrack,
    ModalTrackAddto,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    searchText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      track: {},
      isModalTrackOpen: false,
      isModalTrackAddtoOpen: false,
    };
  },
  watch: {
    isModalTrackOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
    isModalTrackAddtoOpen(val) {
      this.$store.dispatch('setModalStatus', val);
    },
  },
  methods: {
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

<style lang="scss" scoped>
.u-pt {
  padding-top: 12px;
}

.list {
  &__link {
    padding: 10px 0;
  }
  &__body {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.17;
    letter-spacing: -0.02px;
    color: #1e2645;
  }
}

.searchResultsMore {
  &__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  &__title {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.17;
    letter-spacing: -0.02px;
    color: #1e2645;
  }
}
</style>
