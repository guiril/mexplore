<template>
  <div>
    <TheHeader />
    <main
      class="u-pt"
      :class="{
        'u-pb-lg': $store.state.playquee.playerStatus !== 'stop'
      }"
    >
      <div class="headline u-px-15">
        <h2 class="headline__title">
          瀏覽
        </h2>
        <div class="headline__hr" />
      </div>
      <HomeCarousel />
      <HomeCard1 />
      <HomeCard2 />
      <HomeCard3 />
      <HomeCard4 />
      <HomeCard5 />
      <HomeCard6 />
      <HomeCard7 />
      <HomeCard8 />
      <section>
        <h3 class="listTitle u-pl-15">
          值得收藏的好音樂
        </h3>
      </section>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import HomeCarousel from '@/components/Home/HomeCarousel.vue';
import HomeCard1 from '@/components/Home/HomeCard/HomeCard1.vue';
import HomeCard2 from '@/components/Home/HomeCard/HomeCard2.vue';
import HomeCard3 from '@/components/Home/HomeCard/HomeCard3.vue';
import HomeCard4 from '@/components/Home/HomeCard/HomeCard4.vue';
import HomeCard5 from '@/components/Home/HomeCard/HomeCard5.vue';
import HomeCard6 from '@/components/Home/HomeCard/HomeCard6.vue';
import HomeCard7 from '@/components/Home/HomeCard/HomeCard7.vue';
import HomeCard8 from '@/components/Home/HomeCard/HomeCard8.vue';

export default {
  name: 'Home',
  components: {
    TheHeader,
    HomeCarousel,
    HomeCard1,
    HomeCard2,
    HomeCard3,
    HomeCard4,
    HomeCard5,
    HomeCard6,
    HomeCard7,
    HomeCard8,
  },
};
</script>

<style lang="scss" scoped>
.u-pt {
  padding-top: 22px;
}

.headline {
  margin-bottom: 7px;
  &__title {
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 1.09;
    color: $second-dark-text;
  }
  &__hr {
    height: 0.5px;
    background: rgba($base-dark-bg, .18);
  }
}
</style>
