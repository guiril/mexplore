<template>
  <div />
</template>

<script>
import Cookies from 'js-cookie';
import auth from '../api/auth';

export default {
  data() {
    return {
      code: '',
    };
  },
  created() {
    const code = this.$route.query.code || null;
    const state = this.$route.query.state || null;
    const storedState = Cookies.get() ? Cookies.get('spotify_auth_state') : null;

    if (state === null || state !== storedState) {
      console.log('未知的行為');
    } else {
      Cookies.remove('spotify_auth_state');
      // this.$store.dispatch('auth/setAccessToken', {
      //   type: 'Authorization ',
      //   code,
      // });
      this.getAuthToken(code);
    }
  },
  methods: {
    async getAuthToken(code) {
      try {
        const { data } = await auth.getAuthToken(code);
        this.$store.dispatch('auth/setAuthToken', data);
        console.log(data);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
