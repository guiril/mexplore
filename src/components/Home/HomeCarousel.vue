<template>
  <section class="carousel u-px-15 u-mb-16">
    <ul class="carouselList">
      <li class="carouselList">
        <h4 class="carouselList__subtitle">
          推薦歌單
        </h4>
        <h3 class="carouselList__title">
          新生代嘻哈新人！抖音平台而大紅大紫的歌手，絕非蜜桃貓朵佳（Doja Cat）
        </h3>
        <img
          src="https://picsum.photos/290/194"
          alt=""
          class="carouselList__img"
        >
      </li>
    </ul>
    <div class="carousel__indicator">
      <button class="carousel__indicatorBtn carousel__indicatorBtn--active" />
      <button class="carousel__indicatorBtn" />
      <button class="carousel__indicatorBtn" />
      <button class="carousel__indicatorBtn" />
      <button class="carousel__indicatorBtn" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeCarousel',
};
</script>

<style lang="scss" scoped>
.carousel {
  &__indicator {
    text-align: right;
    &Btn {
      width: 4px;
      height: 4px;
      margin-left: 6px;
      background-color: $info-bg;
      border-radius: 50%;
      &--active {
        width: 16px;
        border-radius: 30px;
      }
    }
  }
}

.carouselList {
  &__item {

  }
  &__title {
    margin-bottom: 7px;
    font-size: 16px;
    line-height: 1.25;
    letter-spacing: 0.2px;
    color: $base-dark-text;
  }
  &__subtitle {
    margin-bottom: 5px;
    font-size: 10px;
    line-height: 1.2;
    color: $info-text;
  }
  &__img {
    width: 100%;
    border-radius: 8px;
  }

}
</style>
