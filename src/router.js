import Vue from 'vue'
import Router from 'vue-router'

import PrintDeck from '@/components/PrintDeck.vue'
import CardSpoiler from '@/components/CardSpoiler.vue'
import CardDetail from '@/components/CardDetail.vue'
import PageNotFound from '@/components/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/print-deck',
      name: 'printDeck',
      component: PrintDeck
    },
    {
      path: '*',
      component: PageNotFound
    },
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
          name: 'cardDetailPage',
          component: CardDetail,
          props: (route) => ({ card: route.query.card })
        }
      ]
    }
  ]
})
