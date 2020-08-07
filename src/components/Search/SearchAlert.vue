<template>
  <div class="searchText u-text-center">
    <p class="searchText__title searchText__title--sm">
      找不到「{{ searchText }}」
    </p>
    <p class="searchText__subtitle">
      請嘗試用不同拼法或關鍵字再搜尋一次。
    </p>
  </div>
</template>

<script>
export default {
  name: 'SearchAlert',
  props: {
    searchText: {
      type: String,
      default: '',
    },
  },
};
</script>

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
</style>
