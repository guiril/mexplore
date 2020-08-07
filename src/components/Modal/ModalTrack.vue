<template>
  <div class="modal">
    <div class="modal__dialog">
      <div class="modal__header">
        <div class="modal__img">
          <img
            :src="track.album.images[0].url"
            :alt="track.album.name"
            class="searchResultsList"
          >
        </div>
        <span class="modal__title">
          {{ track.name }}
        </span>
        <span class="modal__text">
          {{ track.artists | formatArtist }}
        </span>
      </div>
      <div class="modal__body">
        <ul class="modalList">
          <li class="modalList__item">
            <a
              href="#"
              class="modalList__link u-d-block"
              @click.prevent="$emit('closeModal', true);"
            >
              <span class="modalList__icon u-d-block" />新增到播放清單
            </a>
          </li>
          <li class="modalList__item">
            <a
              href="#"
              class="modalList__link u-d-block"
            >
              <span class="modalList__icon" />前往歌手
            </a>
          </li>
          <li class="modalList__item">
            <a
              href="#"
              class="modalList__link u-d-block"
            >
              <span class="modalList__icon" />前往專輯
            </a>
          </li>
          <li class="modalList__item">
            <a
              href="#"
              class="modalList__link u-d-block"
            >
              <span class="modalList__icon" />儲存到我的最愛
            </a>
          </li>
          <li class="modalList__item">
            <a
              href="#"
              class="modalList__link u-d-block"
            >
              <span class="modalList__icon" />分享
            </a>
          </li>
        </ul>
      </div>
      <div class="modal__footer">
        <button
          class="modal__close"
          @click.prevent="$emit('closeModal', false)"
        >
          關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalTrack',
  components: {
  },
  props: {
    track: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 12;
  &__dialog {
    padding-top: 48px;
    padding-bottom: 17px;
    color: $light-text;
    background-color: rgba($base-dark-bg, .94);
    border-radius: 12px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
  &__img {
    width: 120px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1.5px solid rgba($light-text, 0.2);
    opacity: 0.9;
  }
  &__title {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.08px;
    opacity: 0.9;
  }
  &__text {
    font-size: 12px;
    font-weight: 300;
    line-height: 0.92;
    letter-spacing: -0.02px;
    opacity: 0.6;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  &__footer {
    text-align: center;
  }
  &__close {
    padding: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.17;
    letter-spacing: 0.05px;
    opacity: .8;
  }
}

.modalList {
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.17;
  letter-spacing: -0.07px;
  opacity: 0.6;
  // &__item {
  //   text-align: center;
  // }
  &__link {
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 40px;
  }
  &__icon {
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    background-color: $light-text;
  }
}
</style>
