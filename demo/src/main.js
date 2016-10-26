import Vue from 'vue'
import App from './App.vue'

import VueGmaps from 'vue-gmaps'

Vue.use(VueGmaps, {
  key: 'AIzaSyCpr35b_ZSoP8nbz0VnBjVz6ABb7iurRCU',
  libraries: ['places']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
