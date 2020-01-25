import Vue from 'vue'
import Router from 'vue-router'

import CardSpoiler from '@/components/CardSpoiler.vue'
import CardDetail from '@/components/CardDetail.vue'
import PageNotFound from '@/components/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CardSpoiler,
      children: [
        {
          path: '/',
          name: 'searchPage'
        },
        {
          path: 'card-detail',
          component: CardDetail,
          props: (route) => ({ card: route.query.card })
        },
        {
          path: '*',
          component: PageNotFound
        }
      ]
    }
  ]
})
