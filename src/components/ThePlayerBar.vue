<template>
  <transition
    name="custom-classes-transition"
    leave-active-class="animate__animated animate__slideOutDown animate__faster"
  >
    <div
      v-if="playerStatus !== 'stop'"
      class="playerBar"
    >
      <div class="playerBarProgress">
        <div
          class="playerBarProgress__fg"
          :style="`width: ${progressBarWidth}%`"
        >
          <button class="playerBarProgress__slider" />
        </div>
      </div>
      <div class="playerBarNowplaying">
        <div class="playerBarNowplaying__left">
          <img
            :src="nowplaying.album.images[0].url"
            :alt="nowplaying.album.name"
            class="playerBarNowplaying__img"
          >
        </div>
        <div class="playerBarNowplaying__center">
          <h3 class="playerBarNowplaying__title u-text-ellipsis">
            {{ nowplaying.name }}
          </h3>
          <h4 class="playerBarNowplaying__text">
            {{ nowplaying.artists | formatArtist }}
          </h4>
        </div>
        <div class="playerBarNowplaying__right">
          <button
            class="playerBarNowplaying__btn"
            @click.prevent="controlPlayerStatus('play')"
          >
            <img
              :src="`./static/images/player/${playerImgSrc}.svg`"
              alt=""
            >
          </button>
          <button
            class="playerBarNowplaying__btn"
            @click.prevent="controlPlayerStatus('stop')"
          >
            <img
              src="@/assets/images/player/stop.svg"
              alt="Stop playing music"
            >
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PlayerBar',
  data() {
    return {
      audio: null,
      playerImgSrc: '',
      progressBarWidth: 0,
    };
  },
  computed: {
    playerStatus() {
      return this.$store.state.playquee.playerStatus;
    },
    nowplaying() {
      return this.$store.getters['playquee/nowplayingTrack'];
    },
    currentIndex() {
      return this.$store.state.playquee.currentIndex;
    },
    lastIndex() {
      return this.$store.state.playquee.lastIndex;
    },
  },
  watch: {
    nowplaying(val) {
      if (val && this.playerStatus === 'playing') {
        this.progressBarWidth = 0;
        this.playTrack();
      }
    },
    playerStatus(val) {
      // 變換播放與暫停 icon
      switch (val) {
        case 'playing':
          this.playerImgSrc = 'pause';
          break;
        case 'pause':
          this.playerImgSrc = 'playing';
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.audio = new Audio();
    this.audio.addEventListener('timeupdate', this.eventTimeupdate);
    this.audio.addEventListener('ended', this.eventEnded);
  },
  methods: {
    eventTimeupdate() {
      this.progressBarWidth = (this.audio.currentTime / this.audio.duration) * 100;
    },
    eventEnded() {
      this.progressBarWidth = 0;

      if (this.currentIndex !== this.lastIndex) {
        this.setNextTrack();
        this.playTrack();
      } else {
        this.setNextTrack();
        this.setPlayerStatus('pause');
      }
    },
    playTrack() {
      this.audio.src = this.nowplaying.preview_url;
      this.audio.load();
      this.audio.play();
    },
    controlPlayerStatus(status) {
      const playPromise = this.audio.play();

      if (status === 'play') {
        if (this.playerStatus === 'playing') {
          if (playPromise !== undefined) {
            playPromise.then(() => {
              this.setPlayerStatus('pause');
              this.audio.pause();
            });
          }
        } else if (this.playerStatus === 'pause') {
          this.setPlayerStatus('playing');
          this.audio.play();
        }
      } else if (status === 'stop') {
        this.setPlayerStatus('stop');
        this.audio.pause();
      }
    },
    setNextTrack() {
      const nextTrackIndex = this.$store.getters['playquee/nextIndex'];
      this.$store.dispatch('playquee/setNowplaying', nextTrackIndex);
    },
    setPlayerStatus(status) {
      this.$store.dispatch('playquee/setPlayerStatus', status);
    },
  },
};
</script>

<style lang="scss" scoped>
.playerBar {
  position: fixed;
  right: 0;
  bottom: 73px;
  left: 0;
  z-index: 9;
  &Progress {
    height: 2px;
    background-color: rgba($base-dark-bg, .4);
    border-radius: 2px;
    &__fg {
      height: 100%;
      position: relative;
      background-color: $info-bg;
      border-radius: inherit;
    }
    &__slider {
      width: 8px;
      height: 8px;
      position: absolute;
      top: -3px;
      right: 0;
      background-color: $info-bg;
      border: 1.6px solid $base-light-bg;
      box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.14);
      border-radius: 50%;
    }
  }
  &Nowplaying {
    height: 48px;
    // height: 100vw * (48 / 320);
    display: flex;
    align-items: center;
    color: $light-text;
    background-color: $second-dark-bg;
    box-shadow: 0 -6px 10px 0 rgba(19, 24, 44, 0.06);
    // overflow: hidden;
    &__left {
      width: 48px;
      // width: 60px;
      margin-right: 9px;
    }
    &__center {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-basis: 100% * (177 / 320);
      overflow: hidden;
    }
    &__right {
      display: flex;
      justify-content: flex-end;
      flex-grow: 1;
    }
    &__img {

    }
    &__title {
      margin-bottom: 2px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.17;
      letter-spacing: -0.07px;
    }
    &__text {
      font-size: 9px;
      font-weight: 300;
      line-height: 1.22;
      letter-spacing: -0.02px;
      opacity: .4;
    }
    &__btn {
      flex: 1;
    }
  }
}
</style>
