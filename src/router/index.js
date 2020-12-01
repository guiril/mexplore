import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '@/store';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '*',
  //   redirect: '/',
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue'),
    children: [
      {
        path: '',
        name: 'Search',
        component: () => import('../views/Search/SearchDefault.vue'),
      },
      {
        path: ':q/:type',
        name: 'SearchType',
        component: () => import('../views/Search/SearchType.vue'),
      },
    ],
  },
  {
    path: '/my-music',
    name: 'MyMusic',
    component: () => import('../views/MyMusic.vue'),
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('../views/Playlist.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'navbarMenu__item--active',
});

export default router;
