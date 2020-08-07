<template>
  <transition
    name="custom-classes-transition"
    leave-active-class="animate__animated animate__fadeOut animate__fast"
  >
    <div
      v-if="message"
      class="alertMessage"
    >
      <div class="alertMessage__dialog">
        <div class="alertMessage__content">
          {{ message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertMessage',
  data() {
    return {
      message: '',
    };
  },
  created() {
    const vm = this;

    this.$bus.$on('alertMessage', (msg) => {
      vm.updateMessage(msg);
    });
  },
  methods: {
    updateMessage(msg) {
      this.message = msg;
      this.removeMessage();
    },
    removeMessage() {
      setTimeout(() => {
        this.message = '';
      }, 2500);
    },
  },
};
</script>

<style lang="scss" scoped>
.alertMessage {
  width: 100%;
  position: fixed;
  top: calc((100% - 41px) / 2);
  left: 0;
  &__dialog {
    width: 270px;
    padding: 13px 0;
    margin: 0 auto;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33;
    text-align: center;
    letter-spacing: 0.02px;
    color: $light-text;
    background-color: rgba($base-dark-bg, .94);
    border-radius: 6px;
  }
}

</style>
