import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import './plugins/vue-select'
import App from './App.vue'
import router from './router'
import store from './store'

import { formatCardProperty } from './scripts/cardFormatter'

Vue.config.productionTip = false

// Register card filters
Vue.filter('cardFormatter', function(value, prop, cardData) {
  return formatCardProperty(prop, value, cardData)
})


new Vue({
  router,
  render: h => h(App),
  store: store,
  beforeCreate() { this.$store.commit('initialize'); }
}).$mount('#app')
