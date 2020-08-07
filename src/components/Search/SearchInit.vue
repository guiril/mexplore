<template>
  <div class="searchText u-text-center">
    <p class="searchText__title">
      想播什麼就播
    </p>
    <p class="searchText__subtitle">
      搜尋藝人、歌曲、專輯和更多內容。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.searchText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  color: $base-dark-bg;
  &__title {
    font-size: 18px;
    line-height: 1.11;
    letter-spacing: 0.07px;
    &--sm {
      font-size: 16px;
    }
  }
  &__subtitle {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.17;
    letter-spacing: 0.05px;
    opacity: .8;
  }
}

.searchTitle {
  margin-top: 24px;
  margin-bottom: 11px;
  &__text {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.14;
    color: $info-text;
  }
}
</style>
