<template>
  <button
    class="authBtn"
    @click.prevent="connectWithSpotify"
  >
    <img
      src="../assets/images/spotify-logo.svg"
      alt="Spotify logo"
      class="authBtn__img"
    >
    <span class="authBtn__text">
      Connect Spotify
    </span>
  </button>
</template>

<script>
import auth from '@/api/auth';
// import qs from 'qs';
// import Cookies from 'js-cookie';

export default {
  name: 'TheAuthBtn',
  data() {
    return {
      authUri: '',
      // uri: process.env.VUE_APP_AUTH_URI,
      // client_id: process.env.VUE_APP_CLIENT_ID,
      // response_type: 'code',
      // redirect_uri: process.env.VUE_APP_REDIRECT_URI,
      // state: '',
      // scope: 'user-read-recently-played playlist-read-private
      // user-library-read user-library-modify user-follow-read
      // playlist-modify-public playlist-modify-private user-follow-modify',
      // show_dialog: false,
    };
  },
  computed: {
    // getAuthUri() {
    //   return `${this.uri}?${qs.stringify({
    //     client_id: this.client_id,
    //     response_type: this.response_type,
    //     redirect_uri: this.redirect_uri,
    //     state: this.state,
    //     scope: this.scope,
    //     show_dialog: this.show_dialog,
    //   })}`;
    // },
  },
  mounted() {
    this.getAuthUri();
    // this.generateRandomString(16);
  },
  methods: {
    async getAuthUri() {
      const { data } = await auth.getAuthUri();
      this.authUri = data.authUri;
    },
    connectWithSpotify() {
      // const stateKey = 'spotify_auth_state';
      // Cookies.set(stateKey, this.state);
      window.location = this.authUri;
    },
    // generateRandomString(length) {
    //   let text = '';
    //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //   for (let i = 0; i < length; i += 1) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length));
    //   }

    //   this.state = text;
    // },
  },
};
</script>

<style lang="scss" scoped>
.authBtn {
  width: 100% * (131 / 320);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding-top: 7px;
  // padding-bottom: 7px;
  font-size: 12px;
  font-family: 'Cabin', sans-serif;
  font-weight: 500;
  letter-spacing: -0.24px;
  border-radius: 20px;
  background-color: rgba($second-light-bg, 0.96);
  &__img {
    height: 100% * (16 / 28);
    // width: 16px;
    // width: 100% * (16 / 131);
    // margin-right: 3px;
    margin-right: 100% * (3 / 131);
  }
}
</style>
