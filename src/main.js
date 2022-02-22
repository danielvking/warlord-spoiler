import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import './plugins/vue-select'
import App from './App.vue'
import './scss/bootstrapConfig.scss'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store: store,
  beforeCreate() { this.$store.commit('initialize'); }
}).$mount('#app')
