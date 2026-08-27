import { createApp } from 'vue'
import bootstrapVueNext from './plugins/bootstrap-vue'
import fontawesome from './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(bootstrapVueNext)
app.use(fontawesome)

store.commit('initialize')

app.mount('#app')
