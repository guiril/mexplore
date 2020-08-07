<template>
  <div class="u-d-flex u-justify-content-between u-align-items-stretch u-px-15">
    <div class="search">
      <div class="search__img" />
      <input
        id=""
        v-model="text"
        type="text"
        name=""
        class="search__input"
        placeholder="搜尋"
        @input="getSearch"
      >
    </div>
    <div class="close">
      <button class="close__btn u-text-center">
        取消
      </button>
    </div>
  </div>
</template>

<script>
import search from '@/api/search';

export default {
  name: 'SearchInput',
  props: {
    searchText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      text: this.searchText,
    };
  },
  methods: {
    getSearch() {
      if (this.text) {
        search.search(this.text, 'album,artist,playlist,track', 20)
          .then((res) => {
            console.log(res.data);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100% * (248 / 290);
  position: relative;
  border-radius: 20px;
  &:before {
    width: 100%;
    height: 100%;
    content: '';
    @include absolute(0, 0, 0, 0);
    z-index: 1;
    background-color: rgba(19, 24, 44, 0.2);
    border-radius: 20px;
    opacity: 0.2;
  }
  &__img {
    width: 14px;
    height: 14px;
    @include absolute(calc((100% - 14px) / 2), null, null, 15px);
    background-color: #000;
  }
  &__input {
    width: 100%;
    position: relative;
    z-index: 2;
    padding: 5px 37px;
    font-size: 12px;
    font-weight: 100;
    color: $base-dark-bg;
    background-color: transparent;
    border-radius: 20px;
    caret-color: $info-text;
    &::placeholder {
      opacity: 0.8;
    }
  }
}

.close {
  width: 100% * (42 / 290);
  &__btn {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 100;
    letter-spacing: 0.2px;
    color: rgba(#13182c, .8);
  }
}
</style>
