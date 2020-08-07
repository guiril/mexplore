<template>
  <main
    class="u-bg-second-light"
    :class="{
      'u-pb-lg': $store.state.playquee.playerStatus !== 'stop'
    }"
  >
    <keep-alive include="SearchDefault">
      <router-view />
    </keep-alive>
  </main>
</template>

<script>

export default {
  name: 'Search',
};
</script>
