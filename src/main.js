import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vue-select'
import App from './App.vue'
import './scss/bootstrapConfig.scss'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusSquare, faPlusSquare, faPrint, faFolderOpen, faSave, faCheck, faEye, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusSquare)
library.add(faPlusSquare)
library.add(faPrint)
library.add(faFolderOpen)
library.add(faSave)
library.add(faCheck)
library.add(faEye)
library.add(faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store: store,
  beforeCreate() { this.$store.commit('initialize'); }
}).$mount('#app')
