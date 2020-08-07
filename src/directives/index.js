import Vue from 'vue';

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});

Vue.directive('scroll', {
  inserted(el, binding) {
    const f = (evt) => {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };
    // if (binding.value(evt, el)) {
    //   window.removeEventListener('scroll', f)
    // }
    window.addEventListener('scroll', f);
  },
});
