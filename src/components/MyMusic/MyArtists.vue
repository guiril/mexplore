<template>
  <div>
    <ul class="list">
      <li
        v-for="item in artists"
        :key="item.id"
        class="list__item u-px-15"
      >
        <a
          href="javascript:void(0)"
          class="list__link"
        >
          <div class="list__img list__img--border-circle">
            <img
              :src="item.images[0].url"
              :alt="item.name"
            >
          </div>
          <div class="list__body">
            <span class="list__title">
              {{ item.name }}
            </span>
          </div>
        </a>
        <button
          class="list__btn list__btn--txt"
          :class="{
            'list__btn--txt--active': item.id === unfollowArtistTem.id
          }"
          @click="unfollowArtist(item)"
        >
          <span v-if="unfollowArtistTem && item.id !== unfollowArtistTem.id">關注中</span>
          <span v-else>取消關注</span>
        </button>
      </li>
    </ul>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <template v-if="unfollowArtistTem.name">
        <div class="alert u-fixed">
          <div class="alert__dialog">
            <div class="alert__content">
              <div class="alert__header">
                <h3 class="alert__title">
                  取消關注歌手
                </h3>
                <p class="alert__text">
                  確定要從關注歌手中取消關注<br>{{ unfollowArtistTem.name }} 嗎？
                </p>
              </div>
              <div class="alert__footer">
                <button
                  class="alert__btn"
                  @click="confirmUnfollow(false)"
                >
                  繼續關注
                </button>
                <button
                  class="alert__btn alert__btn--active"
                  @click="confirmUnfollow(true)"
                >
                  取消關注
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </transition>
    <Backdrop
      v-if="unfollowArtistTem.name"
    />
  </div>
</template>

<script>
import Backdrop from '@/components/Backdrop.vue';
import follow from '@/api/follow';

export default {
  name: 'MyArtists',
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
      artists: [],
      unfollowArtistTem: {},
    };
  },
  created() {
    this.getFollowedArtists();
  },
  methods: {
    async getFollowedArtists() {
      try {
        const res = await follow.getFollowedArtists();
        this.artists = res.data.artists.items;
      } catch (e) {
        console.log(e);
      }
    },
    async unfollowArtists(ids) {
      try {
        await follow.unfollowArtists(ids);
        this.unfollowArtistTem = {};
        this.getFollowedArtists(); // 消失動畫
      } catch (e) {
        console.log(e);
      }
    },
    unfollowArtist(artist) {
      this.unfollowArtistTem = artist;
    },
    confirmUnfollow(isUnfollow) {
      if (!isUnfollow) {
        this.unfollowArtistTem = {};
      } else {
        this.unfollowArtists(this.unfollowArtistTem.id);
      }
    },
  },
};
</script>
