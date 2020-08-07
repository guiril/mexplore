<template>
  <div id="app">
    <router-view />
    <ThePlayerBar />
    <TheNavbar />
    <AlertMessage />
    <Backdrop v-if="$store.state.isModalShow" />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import ThePlayerBar from '@/components/ThePlayerBar.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import Backdrop from '@/components/Backdrop.vue';

export default {
  name: 'Home',
  components: {
    TheNavbar,
    ThePlayerBar,
    AlertMessage,
    Backdrop,
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  position: relative;
}
</style>
