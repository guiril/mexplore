(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e834c98"],{"126f":function(t,a,s){"use strict";var e=s("23f0"),i=s.n(e);i.a},"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},1925:function(t,a,s){"use strict";var e=s("c1fb");a["a"]={search:function(t,a,s,i){return e["a"].instance.get("search",{params:{q:t,type:a,offset:s,limit:i}})}}},"23f0":function(t,a,s){},"5c43":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"u-pb"},[s("div",{staticClass:"searchTopbar"},[s("button",{staticClass:"searchTopbar__btn u-d-block u-w-100",on:{click:t.gobackSearch}},[s("span",{staticClass:"searchTopbar__icon u-pl-15"},[t._v(">")]),s("span",{staticClass:"searchTopbar__text"},[t._v("在"+t._s(t.type)+"中搜尋「"+t._s(t.q)+"」")])])]),s("ul",{staticClass:"list list--striped"},["tracks"===t.dataType?t._l(t.items,(function(a,e){return s("li",{key:a.id,staticClass:"list__item u-px-15"},[s("a",{staticClass:"list__link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.playtracks(e)}}},[s("img",{staticClass:"list__img",attrs:{src:a.album.images[0].url,alt:a.name}}),s("div",{staticClass:"list__body"},[s("span",{staticClass:"list__title u-text-ellipsis"},[t._v(t._s(a.name))])])]),s("button",{staticClass:"list__btn",on:{click:function(s){return s.preventDefault(),t.openTrackModal(a)}}},[t._v(" ... ")])])})):t._l(t.items,(function(a){return s("li",{key:a.id,staticClass:"list__item u-px-15"},[s("a",{staticClass:"list__link",attrs:{href:"javascript:void(0)"}},[s("img",{staticClass:"list__img",class:{"list__img--border-circle":"artists"===t.dataType},attrs:{src:a.images[0].url,alt:a.name}}),s("div",{staticClass:"list__body"},[s("span",{staticClass:"list__title u-text-ellipsis"},[t._v(t._s(a.name))])]),s("span",{staticClass:"list__btn"},[t._v(" > ")])])])}))],2),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animate__animated animate__fadeInUp animate__fast","leave-active-class":"animate__animated animate__fadeOutDown animate__fast"}},[t.isModalTrackOpen?s("ModalTrack",{attrs:{track:t.track},on:{closeModal:t.closeTrackModal}}):t._e()],1),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animate__animated animate__fadeInUp animate__fast","leave-active-class":"animate__animated animate__fadeOutDown animate__fast"}},[t.isModalTrackAddtoOpen?s("ModalTrackAddto",{on:{closeTrackAddto:function(a){t.isModalTrackAddtoOpen=!1}}}):t._e()],1)],1)},i=[],n=(s("ac1f"),s("841c"),s("1925")),c=s("8ae1"),r=s("e7b1"),l={name:"SearchType",components:{ModalTrack:c["a"],ModalTrackAddto:r["a"]},data:function(){return{q:null,type:null,dataType:null,items:[],track:{},isModalTrackOpen:!1,isModalTrackAddtoOpen:!1}},watch:{isModalTrackOpen:function(t){this.$store.dispatch("setModalStatus",t)},isModalTrackAddtoOpen:function(t){this.$store.dispatch("setModalStatus",t)}},mounted:function(){var t=this.$route.params.type;switch(t){case"artist":this.type="歌手",this.dataType="artists";break;case"playlist":this.type="播放清單",this.dataType="playlists";break;case"album":this.type="專輯",this.dataType="albums";break;case"track":this.type="歌曲",this.dataType="tracks";break;default:break}this.q=this.$route.params.q,this.getSearch()},methods:{gobackSearch:function(){this.$router.go(-1)},getSearch:function(){var t=this;n["a"].search(this.q,this.$route.params.type,0,10).then((function(a){console.log(a.data[t.dataType].items),t.items=a.data[t.dataType].items}))},playtracks:function(t){this.items[t].preview_url?(this.$store.dispatch("playquee/setPlayquee",this.items),this.$store.dispatch("playquee/setNowplaying",t),this.$store.dispatch("playquee/setPlayerStatus","playing")):console.log("無法試聽")},openTrackModal:function(t){this.track=t,this.isModalTrackOpen=!0},closeTrackModal:function(t){this.isModalTrackAddtoOpen=t,this.isModalTrackOpen=!1}}},o=l,d=(s("126f"),s("2877")),u=Object(d["a"])(o,e,i,!1,null,"82db05ec",null);a["default"]=u.exports},"841c":function(t,a,s){"use strict";var e=s("d784"),i=s("825a"),n=s("1d80"),c=s("129f"),r=s("14c3");e("search",1,(function(t,a,s){return[function(a){var s=n(this),e=void 0==a?void 0:a[t];return void 0!==e?e.call(a,s):new RegExp(a)[t](String(s))},function(t){var e=s(a,t,this);if(e.done)return e.value;var n=i(t),l=String(this),o=n.lastIndex;c(o,0)||(n.lastIndex=0);var d=r(n,l);return c(n.lastIndex,o)||(n.lastIndex=o),null===d?-1:d.index}]}))}}]);
//# sourceMappingURL=chunk-8e834c98.1487250c.js.map