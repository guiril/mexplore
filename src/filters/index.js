import Vue from 'vue';

Vue.filter('formatArtist', (ary) => {
  // artists 是由歌手物件組成的陣列
  // 將每個歌手物件的 name 值組成新陣列，並轉成字串
  const artistsName = [];
  ary.forEach((el) => {
    artistsName.push(el.name);
  });
  const str = artistsName.join(', ');
  return str;
});
