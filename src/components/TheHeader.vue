<template>
  <header class="header">
    <div class="logo">
      <h1>MExplore</h1>
    </div>
    <TheAuthBtn />
  </header>
</template>

<script>
import TheAuthBtn from '@/components/TheAuthBtn.vue';

export default {
  name: 'TheHeader',
  components: {
    TheAuthBtn,
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100vw * (48 / 320);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  // padding: 100% * (10 / 320) 15px;
  background-color: $base-dark-bg;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
}

.logo {
  color: #f8f8f8;
}
</style>
