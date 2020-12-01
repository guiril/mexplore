<template>
  <div />
</template>

<script>
// import Cookies from 'js-cookie';
// import auth from '../api/auth';

export default {
  data() {
    return {
      code: '',
    };
  },
  created() {
    console.log(this.$route);
    const { accessToken, expiresIn, refreshToken } = this.$route.query;
    this.$store.dispatch('auth/setAuthToken', { accessToken, expiresIn, refreshToken });
    this.$router.push('/');
    // const code = this.$route.query.code || null;
    // const state = this.$route.query.state || null;
    // const storedState = Cookies.get() ? Cookies.get('spotify_auth_state') : null;
    // if (state === null || state !== storedState) {
    //   console.log('未知的行為');
    // } else {
    //   Cookies.remove('spotify_auth_state');
    //   this.getAuthToken(code);
    //   // this.$router.push('/');
    //   console.log('login');
    // }
  },
  methods: {
    // async getAuthToken(code) {
    //   try {
    //     const { data } = await auth.getAuthToken(code);
    //     this.$store.dispatch('auth/setAuthToken', data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
};
</script>
